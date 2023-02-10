import { hashSync, genSaltSync, compareSync } from 'bcrypt'

export function hashPassword(password: string) {
  return hashSync(password, genSaltSync())
}

export function comparePassword(password: string, actualPassword: string) {
  return compareSync(password, actualPassword)
}