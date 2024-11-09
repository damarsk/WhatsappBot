async function say(socket, chat, pesan){
    const hapusCmd = pesan.replace('.say', '').trim();
    await socket.sendMessage(chat.key.remoteJid, { text: hapusCmd }, { quoted: chat });
};

module.exports = say