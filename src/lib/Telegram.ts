require("dotenv").config();
import { Telegraf } from "telegraf";


export default class Telegram {
    bot: any;
    constructor() {
        this.bot = new Telegraf(process.env.TELEGRAM);
    }

    async send(message: string) {
        try {
            await this.bot.telegram.sendMessage(process.env.CHAT_ID, "<code>" + message + "</code>", { parse_mode: 'HTML' });
            console.log('Mensagem enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }
}