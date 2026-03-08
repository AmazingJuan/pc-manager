// Own imports
import type { ComputerInterface } from './ComputerInterface'

export interface UserInterface {
  id: number
  name: string
  username: string
  email: string
  password: string
  role: string
  createdAt: Date
  computers: ComputerInterface[] | null
}
