import { webhookCallback } from 'grammy'
import { bot } from './core'
import { controller } from './controller'

const instance = controller(bot)
instance.start()
instance.clear_tracked()

export const config = { runtime: 'edge' }
export default webhookCallback(bot, 'std/http')
