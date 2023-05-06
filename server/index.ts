import server from './server'
import cron from 'node-cron'
import { getSubsEventsUsers } from './db/user'
import { updateEmailStatus } from './db/events'
import sendReminderEmail from './lib'
require('dotenv').config()

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT)
})

const cronSchedule = process.env.CRON_SCHEDULE

if (cronSchedule) {
  cron.schedule(cronSchedule, async () => {
    try {
      console.log('i ran once')
      const data = await getSubsEventsUsers()

      for (const event of data) {
        const currentTime = new Date().getTime()

        const paymentDate = new Date(event.scheduleDate).getTime()
        if (event.reminder) {
          if (event.isEmailSent == false) {
            const rminderTime = paymentDate - currentTime
            if (rminderTime < 1) {
              sendReminderEmail(event.email, event.scheduleDate, event.name)
              const emailStatus = true
              console.log('i have sent an loop')
              const newEvent = await updateEmailStatus(event.id, emailStatus)
              await updateEmailStatus(event.eventId, emailStatus)
              console.log(newEvent)
            }
          }
        }
      }
      console.log('i ran after loop')
    } catch (error) {
      console.error('An error occurred while running the cron job:', error)
    }
  })
} else {
  console.error('CRON_SCHEDULE is not defined')
}
