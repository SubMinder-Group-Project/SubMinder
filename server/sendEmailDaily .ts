import { MailService } from '@sendgrid/mail'
require('dotenv').config()

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default function sendReminderEmail(
  to: string,
  sub: string,
  date: string
) {
  if (!to) {
    console.error('Recipient email is required')
    return
  }
  const msg = {
    to: to,
    from: 'bob400690@gmail.com',
    subject: `Reminder: You have a payment due soon for ${sub}`,
    text: 'You have a payment due today. Please make sure you check Your subscription, and make sure you want to commit to the payment.',
    html: '<p>You have a payment due soon. Please make sure you check Your subscription, and make sure you want to commit to the payment.</p>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log(`'Email sent' ${sub}, this is for ${date}`)
    })
    .catch((error: MailService) => {
      console.error(error)
    })
}
