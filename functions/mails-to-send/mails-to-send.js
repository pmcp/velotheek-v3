// TEST: netlify functions:invoke get-sheet --payload {'sheet':'reservations'}
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { isSameDay, format } = require('date-fns')
const { emailFn } = require('../send-mail/send-mail')
const mailContent = require('../helpers/mail-content')


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
      try {
        await emailFn.sendEmail(emailFn.getContent(b, 'reminder'))
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
