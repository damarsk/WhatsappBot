const axios = require('axios');

async function jokes(socket, chat){
    const respon = await axios.get('https://candaan-api.vercel.app/api/text/random')
    const { data } = respon.data;
    await socket.sendMessage(chat.key.remoteJid, { text: `${data}` }, { quoted: chat })
}

module.exports = jokes;