import connection from './connection'
import { User } from '../../models/userProfile'

export function getUser(auth0Id: string, db = connection): Promise<User> {
  return db<User>('users')
    .where('users.authID', auth0Id)
    .select('id', 'firstName', 'lastName', 'userName', 'image')
}
