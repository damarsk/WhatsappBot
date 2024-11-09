const quotesIndo = require('quote-indo');

async function quotes(socket, chat){
    const genre = 'kehidupan';
    const data = await quotesIndo.Quotes(genre);
    await socket.sendMessage(chat.key.remoteJid, { text: data });
}

module.exports = quotes;