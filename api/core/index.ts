import { Bot } from 'grammy'

const token = process.env.BOT_TOKEN
if (!token) throw new Error('BOT_TOKEN is unset')

export const bot = new Bot(token)
