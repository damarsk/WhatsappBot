const axios = require('axios');

async function lirik(socket, chat, pesan) {
    try {
        const rCmd = pesan.replace('.lirik', '').trim();
        if (rCmd === '') {
            return socket.sendMessage(chat.key.remoteJid, { text: 'Tolong isi dengan benar, contoh : .lirik alone alan walker' }, { quoted: chat });
        } else {
            const searchSong = await socket.sendMessage(chat.key.remoteJid, { text: 'Sedang mencari lirik lagu...' });
            const response = await axios.get(`https://lyrist.vercel.app/api/${rCmd}`);
            const { title, artist, lyrics } = response.data;
            if (!title || !artist || !lyrics) {
                setTimeout(async () => {
                    await socket.sendMessage(chat.key.remoteJid, {
                        text: 'Lagu tidak ditemukan!',
                        edit: searchSong.key,
                    });
                }, 2000);
                return;
            }
            setTimeout(async () => {
                await socket.sendMessage(chat.key.remoteJid, {
                    text: 'Lagu ditemukan!',
                    edit: searchSong.key,
                });
            }, 2000);
            setTimeout(async () => {
            await socket.sendMessage(chat.key.remoteJid, {
                text: `*${title}*\nOleh *${artist}*\n\n${lyrics}`,
                edit: searchSong.key,
            });
            }, 4000);
            return;
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        await socket.sendMessage(chat.key.remoteJid, { text: 'Terjadi kesalahan saat mengambil lirik lagu.' });
    }
}

module.exports = lirik;