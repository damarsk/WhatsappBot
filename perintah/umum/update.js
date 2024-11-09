async function update(socket, chat) {
    await socket.sendMessage(
        chat.key.remoteJid, 
        { text: '*LATEST UPDATE LIST V2.2*\n04/20/2024\n> .tableflip\n> .unflip\n> .hack\n> .update\n> .akar\n> .pangkat\n> .cuaca\n> .lirik [BETA]\n> .news\n> .provinsi\n> .translate\n> New Theme\n> Improve Performance\n> Fix Bugs' }, 
        { quoted: chat });
}

module.exports = update