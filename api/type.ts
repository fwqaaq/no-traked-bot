import type { Bot, Context, Api, RawApi } from 'grammy'

export type BotType = Bot<Context, Api<RawApi>>
