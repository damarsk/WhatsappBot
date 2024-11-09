async function dadu(socket, chat) {
    const result = Math.floor(Math.random() * 6) + 1;
    await socket.sendMessage(chat.key.remoteJid, { text: `Anda Mendapatkan ${result}` });
}

module.exports = dadu;