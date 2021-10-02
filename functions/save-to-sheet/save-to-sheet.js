if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}

const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { emailFn } = require('../send-mail/send-mail')
const { format, add, isEqual } = require('date-fns')

const emails = require('../data/mails.json')

// Everything for pulling in markdown to create mails.json
const fs = require('fs');
const path = require('path')

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
    if (isEqual(add(new Date(b.date), { days: 2 }), new Date())) reminderSend = true

    return { ...b, date, momentReadable, time, created, confirmationSend, confirmationDate, reminderSend, reminderDate }
  })
  const addedRows = await sheetAPI.addRows(sheet, updatedBookings)

  // Check for mails to be send

  // First get the rows again
  const rows = await sheetAPI.getRows(sheet)
  // Filter out the one where confirmation hasn't been send
  const rowsNotConfirmed = rows.filter((r) => r.confirmationSend == 'FALSE')


  const unresolved = rowsNotConfirmed.map(async (b) => {

    // Example of b
    // {
    //   date: '2021/09/30',
    //   moment: '1',
    //   momentReadable: 'Après midi',
    //   time: 'de 12h30 a 18h30',
    //   grade: 'Première année',
    //   location: 'peterpan',
    //   name: 'Cédric Favresse',
    //   email: 'c.favresse@provelo.org',
    //   language: 'fr',
    //   created: '2021/09/29, 15:29',
    //   confirmationDate: '2021/09/29',
    //   confirmationSend: 'FALSE',
    //   reminderDate: '2021-10-02T14:32:21.174Z',
    //   reminderSend: 'FALSE',
    //   rowId: 12
    // }

    const mailsForLocationId = `${b.location}.${b.language}`
    const emailsForLocationAndLanguage = emails[mailsForLocationId]
    const confirmationMail = emailsForLocationAndLanguage['confirmation']
    const body = { nl: `Datum: ${b.date},
Tijdslot: ${b.momentReadable}, ${b.time}
Graad: ${b.grade}
Locatie: ${b.location} (voor meer info: https://schoolvelotek.be/locations/${b.location}.nl`,
      fr: `Date: ${b.date},
Moment: ${b.momentReadable}, ${b.time}
Niveau: ${b.grade}
Location: ${b.location} (plus d'info: https://schoolvelotek.be/locations/${b.location}.nl`,
      }
    const copy = {
      nl: `Beste ${b.name},
      
${confirmationMail.intro}

${body.nl}

${confirmationMail.outro}
`,


      fr: `Cher ${b.name},
      
${confirmationMail.intro}

${body.nl}

${confirmationMail.outro}
`
    }


    try {
      const email = await emailFn.sendEmail({
        copy: copy[b.language],
        to: b.email,
        replyTo: confirmationMail.from,
        subject: confirmationMail.subject,
      })

      const updatedRow = { ...b, confirmationSend: true }
      await sheetAPI.updateRow(sheet, updatedRow)
    } catch (error) {
      console.error('there was an error', error)
      const updatedRow = { ...b, confirmationSend: 'error'}
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
