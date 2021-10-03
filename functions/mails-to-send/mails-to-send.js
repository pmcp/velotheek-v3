// TEST: netlify functions:invoke get-sheet --payload {'sheet':'reservations'}
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { isSameDay, format } = require('date-fns')
const { emailFn } = require('../send-mail/send-mail')

const emails = require('../data/mails.json')

exports.handler = async function (event, context) {
  // const data = JSON.parse(event.body)
  // console.log('here', data)

  const sheet = await sheetAPI.getSheet('reservations')
  const rows = await sheetAPI.getRows(sheet)

  // find rows of which date to be send reminders is today

  const todayReminders = rows.filter((r) => {
    return isSameDay(new Date(r.reminderDate), new Date()) && (r.reminderSend == 'FALSE')
  })

  if (todayReminders.length > 0) {
    const unresolved = todayReminders.map(async (b) => {

      const mailsForLocationId = `${b.location}.${b.language}`
      const emailsForLocationAndLanguage = emails[mailsForLocationId]
      const reminderEmail = emailsForLocationAndLanguage['reminder']
      const body = { nl: `Datum: ${b.date},
Tijdslot: ${b.momentReadable}, ${b.time}
Graad: ${b.grade}
Locatie: ${b.location}`,
        fr: `Date: ${b.date},
Moment: ${b.momentReadable}, ${b.time}
Niveau: ${b.grade}
Location: ${b.location}`,
      }




      const copy = {
        nl: `Beste ${b.name},
      
${reminderEmail.intro}

${body.nl}

${reminderEmail.outro}
`,


        fr: `Cher ${b.name},
      
${reminderEmail.intro}

${body.nl}

${reminderEmail.outro}
`
      }


      try {
        await emailFn.sendEmail({
          copy: copy[b.language],
          to: b.email,
          replyTo: 'bookings@schoolvelotek.be',
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
