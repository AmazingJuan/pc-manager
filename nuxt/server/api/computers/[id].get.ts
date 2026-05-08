import { createError } from 'h3'
import { getComputerById } from '../../utils/computers'

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id)

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Computer id must be a number',
    })
  }

  const computer = getComputerById(id)

  if (!computer) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Computer not found',
    })
  }

  return computer
})
