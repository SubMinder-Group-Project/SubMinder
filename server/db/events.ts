import { Subscription } from 'react-redux'
import connection from './connection'

export function getEvents(
  id: string,
  db = connection
): Promise<Subscription[]> {
  return db('calendarEvents')
    .join('subscriptions', 'calendarEvents.subscriptionId', 'subscriptions.id')
    .select(
      'subscriptions.name as name',
      'subscriptions.category as category',
      'subscriptions.price as price',
      'subscriptions.userAuthId as auth0Id',
      'calendarEvents.*'
    )
    .where('auth0Id', id)
}
interface Prop {
  scheduleDate?: string
  isLastDate?: boolean
}

export async function addEvent(
  subscriptionId: number,
  { scheduleDate, isLastDate }: Prop,
  auth0Id: string,
  db = connection
) {
  return db('calendarEvents')
    .insert({ subscriptionId, scheduleDate, isLastDate, auth0Id })
    .returning('*')
}
