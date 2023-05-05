import cron from 'node-cron'
import { getSubsEventsUsers } from './db/user'
import { updateEmailStatus } from './db/events'
import sendReminderEmail from './lib'

cron.schedule('0 9 * * *', async () => {
  try {
    // Your code for the reminder goes here
    const data = await getSubsEventsUsers()
    for (const event of data) {
      if (event.isEmailSent === false) {
        sendReminderEmail(event.email, event.scheduleDate, event.name)
        const emailStatus = true
        await updateEmailStatus(event.id, emailStatus)
      }
    }
  } catch (error) {
    console.error('An error occurred while running the cron job:', error)
  }
})
