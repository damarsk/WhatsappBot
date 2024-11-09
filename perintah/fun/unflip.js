async function unflip(socket, chat) {
    await socket.sendMessage(chat.key.remoteJid, { text: '┬─┬ ノ( ゜-゜ノ)' });
}

module.exports = unflip;