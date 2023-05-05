import connection from './connection'

interface Props {
  firstName?: string
  lastName?: string
  userName?: string
  image?: string
  email?:string
}

export async function addUserOrReturnNull(
  { firstName, lastName, userName, image, email }: Props,
  authID: string,
  db = connection
) {
  const oldUser = await db('users').where({ authID }).first()
  if (oldUser) {
    return null
  }

  const newUser = await db('users')
    .insert({ firstName, lastName, userName, authID, image, email })
    .returning('*')
  return newUser[0]
}
