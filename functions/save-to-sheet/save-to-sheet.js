if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}

const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { emailFn } = require('../send-mail/send-mail')
const { format, add, isEqual } = require('date-fns')

exports.handler = async function (event, context) {
  const data = JSON.parse(event.body)
  const settings = data.settings
  const moments = settings.moments

  const sheet = await sheetAPI.getSheet(data.sheet)

  // change date to readable format
  const updatedBookings = data.bookings.map((b) => {
    // Make date readable in Google Sheet
    const date = format(new Date(b.date), 'yyyy/MM/dd')
    // Convert Moment to reaadable moment
    const momentReadable = moments[b.moment].name.fr
    const time = moments[b.moment].descr.fr
    const created = format(new Date(), 'yyyy/MM/dd, HH:mm')
    const confirmationSend = false
    const confirmationDate = format(new Date(), 'yyyy/MM/dd')

		const reminderDate = add(new Date(b.date), { days: 2 })

    // If booking date (b.date) === day after today, don't set reminder -> Set reminderSend as true
    let reminderSend = false
    if(isEqual(add(new Date(b.date), { days: 2 }), new Date())) reminderSend = true

    return { ...b, date, momentReadable, time, created, confirmationSend, confirmationDate, reminderSend, reminderDate }
  })

  const rows = await sheetAPI.addRows(sheet, updatedBookings)

  // Send email when added
  const unresolved = rows.map(async (b) => {
		console.log('row', b)
    const copy = {
      nl: `Je maakte een nieuwe reservatie aan: ${b.date}, ${b.momentReadable}`,
      fr: `Vous avez effectué une nouvelle réservation: ${b.date}, ${b.momentReadable}`,
    }
    const subject = {
      nl: `Velotheek reservatie: ${b.date}, ${b.momentReadable}`,
      fr: `Vélotek reservation: ${b.date}, ${b.momentReadable}`,
    }

    try {
      const email = await emailFn.sendEmail({
        copy: copy[b.language],
        to: b.email,
        replyTo: 'info@velotheek.be',
        subject: subject[b.language],
      })

      //	Set sheet as "send"
			const updatedRow = { ...b, confirmationSend: true}
			await sheetAPI.updateRow(sheet, updatedRow)
    } catch (error) {
      console.error('there was an error', error)
			// const updatedRow = { ...b, confirmationSend: 'error'}
      process.exit(1)
    }
    return
  })

  await Promise.all(unresolved)

  return {
    statusCode: 200,
    body: JSON.stringify('done'),
  }
}
