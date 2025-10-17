import { randomUUID } from 'crypto'

export default defineEventHandler(() => {
    const id = randomUUID().slice(0, 8)
    return { id }
})