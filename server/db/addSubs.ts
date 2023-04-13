import connection from './connection'

interface Prop {
  serviceName?: string
  image?: string
  frequency?: string
  startDate?: string
  endDate?: string
  category?: string
  website?: string
  price?: number
}

export async function addSubs(
  { serviceName,image, frequency, startDate, endDate, category, website, price }: Prop,
  userAuthId: string,
  db = connection
) {
  await db('subscriptions')
    .insert({
      serviceName,
      image,
      frequency,
      startDate,
      endDate,
      category,
      website,
      price,
      userAuthId,
    })
    .returning('*')
}
