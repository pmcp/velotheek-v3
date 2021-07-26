if (!process.env.NETLIFY) {
	// get local env vars if not in CI
	// if in CI i expect its already set via the Netlify UI
	require('dotenv').config()
}
// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
	throw new Error('no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set')
if (!process.env.GOOGLE_PRIVATE_KEY)
	throw new Error('no GOOGLE_PRIVATE_KEY env var set')
if (!process.env.GOOGLE_SHEET)
   throw new Error('no GOOGLE_SHEET env var set')
   
const sheetAPI = require('../google-spreadsheet/google-spreadsheet')

exports.handler = async function(event, context) {
	const data = JSON.parse(event.body)
	
	const sheet = await sheetAPI.getSheet(data.sheet)
	const addedRows = await sheetAPI.addRows(sheet, data.bookings)
	
	return {
		  statusCode: 200,
		  body: JSON.stringify('done')		
	  }
}