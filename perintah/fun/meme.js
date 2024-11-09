const axios = require('axios');

async function meme(socket, chat){
    const response = await axios.get('https://candaan-api.vercel.app/api/image/random');
    const { url } = response.data.data;
    await socket.sendMessage(chat.key.remoteJid, { image: { url } }, { quoted: chat });
}
        
module.exports = meme;