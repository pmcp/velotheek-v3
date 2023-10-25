// TEST: netlify functions:invoke get-sheet --payload {'sheet':'reservations'}
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { isSameDay, format } = require('date-fns')
const { emailFn } = require('../send-mail/send-mail')
const { schedule } = require('@netlify/functions')

const handler = async function (event, context) {
  // const data = JSON.parse(event.body)
  // console.log('here', data)

  const sheet = await sheetAPI.getSheet('reservations')
  const rows = await sheetAPI.getRows(sheet)

  // REMINDER MAILS
  // find rows of which date to be send reminders is today
  const todayReminders = rows.filter((r) => {
    return isSameDay(new Date(r.reminderDate), new Date()) && r.reminderSend == 'FALSE'
  })

  if (todayReminders.length > 0) {
    const unresolved = todayReminders.map(async (b) => {
      try {
        await emailFn.sendEmail(emailFn.getContent(b, 'reminder'))
        const updatedRow = { ...b, reminderSend: true }
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

  // RETOUR MAILS
  // TODO: optimize, because this is the same function as above
  // find rows of which the booking date = one day ago
  const todayRetour = rows.filter((r) => {
    return isSameDay(new Date(r.retourMailDate), new Date()) && r.retourMailSend == 'FALSE'
  })

  if (todayRetour.length > 0) {
    const unresolved = todayRetour.map(async (b) => {
      try {
        await emailFn.sendEmail(emailFn.getContent(b, 'retour'))
        const updatedRow = { ...b, retourMailSend: true }
        await sheetAPI.updateRow(sheet, updatedRow)
      } catch (error) {
        console.error('there was an error', error)
        const updatedRow = { ...b, retourMailSend: 'error' }
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

// Netlify Scheduled function: https://www.netlify.com/blog/quirrel-joins-netlify-and-scheduled-functions-launches-in-beta
// Timing is UTC, so 8 instead of 9.
// module.exports.handler = schedule("0 8 * * *", handler);
module.exports.handler = schedule("20 10 * * *", handler);