import cron from 'node-cron'
import { getSubsEventsUsers } from './db/user'
import { updateEmailStatus } from './db/events'
import sendReminderEmail from './lib'

cron.schedule('45 15 * * *', async () => {
  try {
    // Your code for the reminder goes here
    console.log('i ran once')
    const data = await getSubsEventsUsers()
    console.log(data)
    for (const event of data) {
      if (event.isEmailSent == false) {
        sendReminderEmail(event.email, event.scheduleDate, event.name)
        const emailStatus = true
        console.log('i have sent an loop')
        await updateEmailStatus(event.id, emailStatus)
      }
    }
    console.log('i ran after loop')
  } catch (error) {
    console.error('An error occurred while running the cron job:', error)
  }
})
