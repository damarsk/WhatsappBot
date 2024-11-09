async function testing(socket, chat) {
    await socket.sendMessage(chat.key.remoteJid, { text: 'Perintah Berhasil Diaktifkan!' } , { quoted: chat } );
    return;
};

module.exports = testing;