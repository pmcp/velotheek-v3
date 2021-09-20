// TEST: netlify functions:invoke get-sheet --payload {'sheet':'reservations'}
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { isEqual } = require('date-fns');

exports.handler = async function(event, context) {
  const data = JSON.parse(event.body)
  console.log('here', data)

  const sheet = await sheetAPI.getSheet('reservations')
  const rows = await sheetAPI.getRows(sheet)

  // find rows of which date to be send reminders is today
  const todayReminders = rows.filter(r => isEqual(r.reminderSend, new Date(),))
  console.log(todayReminders)
  if(todayReminders.length > 0) {
  //  1. send reminder mail
  //  2. update sheet to indicate has been send
  }

}
