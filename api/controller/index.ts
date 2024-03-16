import { start } from '../messages'
import type { BotType } from '../type'
import { clear_tracked } from '../messages/index'

export function controller(bot: BotType) {
  return {
    start: start.bind(bot),
    clear_tracked: clear_tracked.bind(bot),
  }
}
