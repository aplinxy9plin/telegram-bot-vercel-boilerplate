import { Markup, Telegraf } from 'telegraf';

import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const WEBAPP_LINK = process.env.WEBAPP_LINK || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('about', about());
bot.command('start', async (ctx) => {
  ctx.reply(
    'Launch miniapp ;)',
    Markup.inlineKeyboard([Markup.button.webApp('Launch', WEBAPP_LINK)]),
  );
});
bot.on('message', greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
