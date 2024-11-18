import { BotType } from '../type'

export function start(this: BotType) {
  this.command('start', async (ctx) => await ctx.reply('Hello, World!'))
}

export function clear_tracked(this: BotType) {
  this.on('message:entities:url', async (ctx) => {
    const links = ctx.entities('url')
    let message = ctx.message.text,
      isTracked = false

    for (const { text } of links) {
      if (
        !text.includes('b23.tv') &&
        !text.includes('bilibili.com') &&
        !text.includes('xhslink.com')
      )
        continue
      isTracked = true
      let source = text
      if (text.includes('b23.tv') || text.includes('xhslink.com')) {
        const res = await fetch(text, { redirect: 'manual' })
        source = res.headers.get('location') ?? 'undefined'
      }

      const sourceURL = new URL(source)
      // handle xhs link
      const xsecToken = sourceURL.searchParams.get('xsec_token')
      sourceURL.search = xsecToken ? `?xsec_token=${xsecToken}` : ''

      message = message.replace(text, sourceURL.toString()) // replace url
    }
    try {
      // 没有跟踪链接就直接返回
      if (!isTracked) return
      await ctx.reply(message, {
        reply_to_message_id: ctx.message.message_id,
      })
      await ctx.deleteMessage()
    } catch (e) {
      console.error(e)
    }
  })
}
