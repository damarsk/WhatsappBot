async function tableflip(socket, chat) {
    await socket.sendMessage(chat.key.remoteJid, { text: '(╯°□°）╯︵ ┻━┻' });
}

module.exports = tableflip;