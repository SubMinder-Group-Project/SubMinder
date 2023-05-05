import checkJwt, { JwtRequest } from '../auth0'
import { addUserOrReturnNull } from '../db/logIn'
import { Response } from 'express'

const express = require('express')
const router = express.Router()

router.post('/', checkJwt, async (req: JwtRequest, res: Response) => {
  try {
    const auth0Id = req.auth?.sub
    if (auth0Id) {
      const { firstName, lastName, userName, image, email } = req.body
      const newUser = await addUserOrReturnNull(
        {
          firstName,
          lastName,
          userName,
          image,
          email,
        },
        auth0Id
      )
      if (newUser) {
        return res.json(newUser)
      } else {
        return res.json({ message: 'User already exists' })
      }
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
})
export default router
