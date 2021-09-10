if (!process.env.NETLIFY) {
	// get local env vars if not in CI
	// if in CI i expect its already set via the Netlify UI
	require('dotenv').config()
}

const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const {format} = require('date-fns');

exports.handler = async function(event, context) {
	const data = JSON.parse(event.body)
	const settings = data.settings
	const moments = settings.moments
	console.log(moments)
	const sheet = await sheetAPI.getSheet(data.sheet)

	// change date to readable format
	const updatedBookings = data.bookings.map(b => {
		// Make date readable in Google Sheet
		const date = format(new Date(b.date), 'yyyy/MM/dd')
		// Convert Moment to reaadable moment
		const momentReadable = moments[b.moment].name.fr
		const time = moments[b.moment].descr.fr
		const created = format(new Date(), 'yyyy/MM/dd, HH:mm')

		return {...b , date, momentReadable, time, created}
	})



	await sheetAPI.addRows(sheet, updatedBookings)

	return {
		  statusCode: 200,
		  body: JSON.stringify('done')		
	  }
}