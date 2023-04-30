import connection from './connection'
import { Subscription, SubscriptionUpdate } from '../../models/subscription'

export function getAllSubs(db = connection) {
  return db('subscriptions').select()
}

export function getSubsWithDate(db = connection): Promise<Subscription[]> {
  return db('subscriptions')
    .join('calendarEvents', 'subscriptions.id', 'calendarEvents.subscriptionId')
    .select(
      'subscriptions.id as id',
      'subscriptions.name as name',
      'subscriptions.category as category',
      'subscriptions.endDate as endDate',
      'calendarEvents.isLastDate as isLastDate',
      'calendarEvents.scheduleDate as scheduleDate',
      'subscriptions.price as price',
      'subscriptions.website as website',
      'subscriptions.frequency as frequency',
      'subscriptions.userAuthId as userAuthId'
    )
}

export function getSubsList(
  user: string,
  db = connection
): Promise<Subscription[]> {
  return db('calendarEvents')
    .leftJoin(
      'subscriptions',
      'calendarEvents.subscriptionId',
      '=',
      'subscriptions.id'
    )
    .where('calendarEvents.auth0Id', '=', user)
    .select(
      'subscriptions.id as id',
      'subscriptions.name as name',
      'subscriptions.category as category',
      'subscriptions.endDate as endDate',
      'subscriptions.price as price',
      'subscriptions.website as website',
      'subscriptions.frequency as frequency',
      'subscriptions.userAuthId as userAuthId',
      db.raw('MAX(calendarEvents.scheduleDate) as scheduleDate'),
      db.raw('MAX(calendarEvents.isLastDate) as isLastDate')
    )
    .from('calendarEvents')
    .groupBy(
      'subscriptions.id',
      'subscriptions.name',
      'subscriptions.category',
      'subscriptions.endDate',
      'subscriptions.price',
      'subscriptions.website',
      'subscriptions.frequency',
      'subscriptions.userAuthId'
    )
    .then((rows) =>
      rows.map((row) => ({
        id: row.id,
        name: row.name,
        category: row.category,
        endDate: row.endDate,
        price: row.price,
        website: row.website,
        frequency: row.frequency,
        userAuthId: row.userAuthId,
        isLastDate: row.isLastDate,
        scheduleDate: row.scheduleDate,
      }))
    )
}

export function deleteSubsAndCalendarEvents(subId: number, db = connection) {
  return db('calendarEvents')
    .where('subscriptionId', subId)
    .delete()
    .then(() => {
      return db('subscriptions').where('subscriptions.id', subId).delete()
    })
}

export function editSub(
  id: number,
  update: SubscriptionUpdate,
  db = connection
) {
  return db('subscriptions')
    .update({
      name: update.name,
      category: update.category,
      website: update.website,
      price: update.price,
    })
    .where('id', update.id)
    .returning('id')
}
