if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}

if (!process.env.MAILGUN_API)
  throw new Error('no MAILGUN_API env var set')

if (!process.env.MAILGUN_DOMAIN)
  throw new Error('no MAILGUN_DOMAIN env var set')

//TODO: Change domain
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API,
  domain: process.env.MAILGUN_DOMAIN
})


const emailFn = {}


emailFn.sendEmail = function ({ copy: copy, to: to, replyTo: replyTo, subject: subject }) {
  return new Promise(resolve => {
    const data = {
      from: replyTo,
      subject: subject,
      text: copy,
      // html: `HTML template`,
      'h:Reply-To': replyTo,
      to: to
    }
    if (to) {
      // console.dir(mailgun.messages())
      mailgun.messages().send(data, (error, body) => {        // return
        if(error) reject(error)
        resolve(body)
      })
    }
  })
}

exports.emailFn = emailFn;