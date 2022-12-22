import { db } from './db'
import bcrypt from 'bcrypt'
import { jwtVerify, SignJWT } from 'jose'
import { User } from '@prisma/client'

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const comparePasswords = (
  plainPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainPassword, hashedPassword)

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 100)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({
    payload: {
      id: user.id,
      email: user.email,
    },
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

// validate JWT token
export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  )

  return payload.payload as any
}

// getUserFromCookie
export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(process.env.COOKIE_NAME)

  const { id } = await validateJWT(jwt.value)

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  })

  return user
}
