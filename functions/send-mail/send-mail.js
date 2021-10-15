const emails = require('../data/mails.json')
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}

if (!process.env.MAILGUN_API) throw new Error('no MAILGUN_API env var set')

if (!process.env.MAILGUN_DOMAIN) throw new Error('no MAILGUN_DOMAIN env var set')

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API,
  domain: process.env.MAILGUN_DOMAIN,
  // domain: 'velotheek.friendlyinter.net'
})

const { format } = require('date-fns')

// TODO: When moving moments to admin, change this to
const moments = [
  {
    name: { nl: 'Voormiddag', fr: 'Matin' },
    descr: { nl: 'Van 8u30 tot 12u30', fr: 'de 8h30 a 12h30' },
    available: true,
  },
  {
    name: { nl: 'Namiddag', fr: 'Après midi' },
    descr: { nl: 'Van 12u30 tot 16u30', fr: 'de 12h30 a 16h30' },
    available: true,
  },
  {
    name: { nl: 'Hele dag', fr: 'Toute la journée' },
    descr: { nl: 'Van 8u30 tot 16u30', fr: 'de 8h30 a 16h30' },
    available: true,
  },
]

const emailFn = {}

emailFn.getContent = (b, type) => {
  const moment = `${moments[b.moment * 1]['name'][b.language]}, ${moments[b.moment * 1]['descr'][b.language]}`
  const date = format(new Date(b.date), 'dd/MM/yyyy')
  const address = emails[`${b.location}.${b.language}`].address
  const contentFromDb = emails[`${b.location}.${b.language}`].mails[type]

  const bookingDetails = {
    nl: `Datum: ${date},
Tijdslot: ${moment}
Graad: ${b.grade}
Locatie: ${b.location}
${address.street}
${address.zip} ${address.city}
`,
    fr: `Date: ${date},
Moment: ${moment}
Niveau: ${b.grade}
Location: ${b.location}
${address.street}
${address.zip} ${address.city}
`,
  }

  const salutation = {
    nl: `Beste ${b.name}`,
    fr: `Cher ${b.name}`,
  }

  const replacements = {'%NAME%': b.name,'%BOOKING%': bookingDetails[b.language]}

  const copy = contentFromDb.body.replace(/%\w+%/g, function(all) {
    return replacements[all] || all;
  });

  return {
    copy: copy,
    to: b.email,
    replyTo: contentFromDb.from,
    subject: `${contentFromDb.subject} (${date})`,
  }
}

emailFn.sendEmail = ({ copy: copy, to: to, replyTo: replyTo, subject: subject }) => {
  return new Promise((resolve) => {
    const data = {
      from: replyTo,
      subject: subject,
      text: copy,
      // html: `HTML template`,
      'h:Reply-To': replyTo,
      to: to,
    }
    if (to) {
      // console.dir(mailgun.messages())
      mailgun.messages().send(data, (error, body) => {
        // return
        console.log(error)
        // if(error) console.log(error)
        resolve(body)
      })
    }
  })
}

exports.emailFn = emailFn
