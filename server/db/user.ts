import connection from './connection'

export function getAllUsers(db = connection) {
  return db('users').select(
    'id',
    'authID',
    'firstName',
    'lastName',
    'userName',
    'image'
  )
}

interface SubEventUser {
  id: number
  name: string
  category: string
  endDate: Date
  isLastDate: boolean
  scheduleDate: string
  price: number
  website: string
  frequency: string
  userAuthId: string
  firstName: string
  lastName: string
  email: string
  isEmailSent: boolean
  eventId:number
}
export function getSubsEventsUsers(db = connection): Promise<SubEventUser[]> {
  return db('subscriptions')
    .join('calendarEvents', 'subscriptions.id', 'calendarEvents.subscriptionId')
    .join('users', 'subscriptions.userAuthId', 'users.authID')
    .select(
      'subscriptions.id as id',
      'subscriptions.name as name',
      'subscriptions.category as category',
      'subscriptions.endDate as endDate',
      'calendarEvents.id as eventId',
      'calendarEvents.isEmailSent as isEmailSent',
      'calendarEvents.isLastDate as isLastDate',
      'calendarEvents.scheduleDate as scheduleDate',
      'subscriptions.price as price',
      'subscriptions.website as website',
      'subscriptions.frequency as frequency',
      'subscriptions.userAuthId as userAuthId',
      'users.firstName as firstName',
      'users.lastName as lastName',
      'users.email as email'
    )
}
