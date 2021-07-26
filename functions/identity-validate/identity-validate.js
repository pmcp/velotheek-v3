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

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;

	console.log(user)
	
	// Check role in google sheet
	const sheet = await sheetAPI.getSheet('users')
    const rows = await sheetAPI.getRows(sheet)
	
	// filter out this user
	console.log(rows)
	const filteredUsers = rows.filter(r => r.email === user.user_metadata.email)
	
	// If user exists, add roles
	// If user doesn't exist, add this user to the spreadsheet with role "visitor"
	console.log(filteredUsers)
	

	
	
	


	const role = await 
	
	  const responseBody = {
		app_metadata: {
		  // TODO: maybe not hardcoded?
		  roles: role,
		},
		user_metadata: {
		  ...user.user_metadata, // append current user metadata
		}
	  };
	  callback(null, {
		statusCode: 200,
		body: JSON.stringify(responseBody)
	  });
	};
	