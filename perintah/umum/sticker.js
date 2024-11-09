const { downloadContentFromMessage } = require('@whiskeysockets/baileys')
const { createSticker, StickerTypes } = require('wa-sticker-formatter');

async function stickerMaker(socket, chat){
    const getMedia = async (msg) => {
        const messageType = Object.keys(msg?.message)[0]
        const stream = await downloadContentFromMessage(msg.message[messageType], messageType.replace('Message', ''))
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }
    const mediaData = await getMedia(chat)
    const stickerOption = {
        pack: "Sticker Bot",
        author: "Damar",
        type: StickerTypes.FULL,
        quality: 50
    }

    const generateSticker = await createSticker(mediaData, stickerOption);
    await socket.sendMessage(chat.key.remoteJid, { sticker: generateSticker},{ quoted: chat } )
}

module.exports = stickerMaker