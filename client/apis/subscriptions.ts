import request from 'superagent'
import { Subscription, SubscriptionUpdate } from '../../models/subscription'

export async function getSubscriptions(token: string): Promise<Subscription[]> {
  try {
    const response = await request
      .get('/v1/subscriptions/list')
      .set('Authorization', `Bearer ${token}`)

    const subscriptions = response.body.map((subscription: Subscription) => {
      // Format the date to 1 May
      const date = new Date(subscription.endDate)
      subscription.endDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
      })

      return subscription
    })

    return subscriptions
  } catch (error) {
    console.log(error)
    return error.message
  }
}

export async function deleteSubscription(
  subId: string,
  token: string
): Promise<number> {
  try {
    const response = await request
      .delete('/v1/subscriptions/delete/' + subId)
      .set('Authorization', `Bearer ${token}`)
    return response.statusCode
  } catch (error) {
    console.log(error)
    return error.message
  }
}

export async function editSubscription(
  id: number,
  update: SubscriptionUpdate,
  token: string
): Promise<number> {
  try {
    const response = await request
      .patch(`v1/subscriptions/update/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(update)
    return response.statusCode
  } catch (error) {
    console.log(error)
    return error.message
  }
}
