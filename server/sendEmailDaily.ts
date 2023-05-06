import cron from 'node-cron'
import { getSubsEventsUsers } from './db/user'
import { updateEmailStatus } from './db/events'
import sendReminderEmail from './lib'

cron.schedule('5 * * * *', async () => {
  try {
    
    console.log('i ran once')
    const data = await getSubsEventsUsers()

    for (const event of data) {
      if (event.isEmailSent == false) {
        sendReminderEmail(event.email, event.scheduleDate, event.name)
        const emailStatus = true
        console.log('i have sent an loop')
        const newEvent = await updateEmailStatus(event.id, emailStatus)
        await updateEmailStatus(event.eventId, emailStatus)
        console.log(newEvent)
      }
    }
    console.log('i ran after loop')
  } catch (error) {
    console.error('An error occurred while running the cron job:', error)
  }
})
