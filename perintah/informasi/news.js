const axios = require('axios');

async function news(socket, chat) {
    try {
        const response = await axios.get('https://api-berita-indonesia.vercel.app/cnn/terbaru/');
        const { data } = response.data;
        if (data && data.posts && data.posts.length > 0) {
            // Mengambil artikel secara acak
            const randomIndex = Math.floor(Math.random() * data.posts.length);
            const randomArticle = data.posts[randomIndex];
            await socket.sendMessage(chat.key.remoteJid, { image: { url: randomArticle.thumbnail }, caption: `*${randomArticle.title}*\n\n${randomArticle.description}\n\n*Source:* ${randomArticle.link}`}, { quote: chat });
        } else {
            await socket.sendMessage(chat.key.remoteJid, { text: 'Tidak ada artikel yang ditemukan.' }, { quote: chat });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        await socket.sendMessage(chat.key.remoteJid, { text: 'Terjadi kesalahan saat mengambil berita.' }, { quote: chat });
    }
}

module.exports = news;