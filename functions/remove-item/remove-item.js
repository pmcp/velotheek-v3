if (!process.env.NETLIFY) {
	  // get local env vars if not in CI
	  // if in CI i expect its already set via the Netlify UI
	  require('dotenv').config()
	}

	const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
	
	exports.handler = async function(event, context) {
	  const data = JSON.parse(event.body)
	  const sheet = await sheetAPI.getSheet(data.sheet)
	  await sheetAPI.deleteRow(sheet, data.id)

	  return {
		statusCode: 200,
		body: JSON.stringify(`removed item with id ${data.id}`)
	  }
	}
