import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils, EVENTS } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

const PORT = process.env.PORT ?? 3008



const welcomeFlow = addKeyword<Provider, Database>(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn)=> {
        const isMessageFromGroup = !!ctx.message.extendedTextMessage
        if (isMessageFromGroup) {
            await ctxFn.provider.sendText("120363374548753532@g.us", "HOLA GRUPO")
        } else {
            await ctxFn.flowDynamic("HOLA USUARIO")
        }
    })
   

const main = async () => {
    const adapterFlow = createFlow([welcomeFlow])
    
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

 httpServer(+PORT)
}

main()
