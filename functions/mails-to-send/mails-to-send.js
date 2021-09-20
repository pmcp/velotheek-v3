// TEST: netlify functions:invoke get-sheet --payload {'sheet':'reservations'}
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { isEqual, format } = require('date-fns')
const { emailFn } = require('../send-mail/send-mail')

exports.handler = async function (event, context) {
  const data = JSON.parse(event.body)
  console.log('here', data)

  const sheet = await sheetAPI.getSheet('reservations')
  const rows = await sheetAPI.getRows(sheet)

  // find rows of which date to be send reminders is today
  const todayReminders = rows.filter((r) => isEqual(r.reminderSend, new Date()) && !r.reminderSend)

  if (todayReminders.length > 0) {
    const unresolved = todayReminders.map(async (b) => {
      const copy = {
        nl: `Herinnering voor je reservatie: ${b.date}, ${b.momentReadable}`,
        fr: `Rappel pour votre réservation: ${b.date}, ${b.momentReadable}`,
      }
      const subject = {
        nl: `Herinnering: Velotheek reservatie: ${b.date}, ${b.momentReadable}`,
        fr: `Herinnering: Vélotek reservation: ${b.date}, ${b.momentReadable}`,
      }

      try {
        const email = await emailFn.sendEmail({
          copy: copy[b.language],
          to: b.mail,
          replyTo: 'info@velotheek.be',
          subject: subject[b.language],
        })

        const updatedRow = { ...b, reminderSend: true, reminderDate: format(new Date(), 'yyyy/MM/dd') }
        await sheetAPI.updateRow(sheet, updatedRow)
      } catch (error) {
        console.error('there was an error', error)
        const updatedRow = { ...b, confirmationSend: 'error' }
        process.exit(1)
      }
      return
    })

    await Promise.all(unresolved)

  }

  return {
    statusCode: 200,
    body: JSON.stringify('done'),
  }

}
