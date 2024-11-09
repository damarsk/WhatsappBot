const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Simpan konteks percakapan yang berkelanjutan
let conversationContext = {};

async function ai(socket, chat) {
    const messageContent = chat.message.conversation || chat.message.extendedTextMessage?.text;
    
    let prompt = '';
    // Cek apakah ada pesan yang di-reply
    if (chat.message.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quotedMsgKey = chat.message.extendedTextMessage.contextInfo.stanzaId;
        
        // Jika konteks ada di percakapan sebelumnya
        if (conversationContext[quotedMsgKey]) {
            prompt = conversationContext[quotedMsgKey] + " " + messageContent.trim();
        } else {
            await socket.sendMessage(chat.key.remoteJid, { text: 'Maaf, tidak ada konteks yang ditemukan.' }, { quoted: chat });
            return;
        }
    } else {
        // Ambil prompt setelah ".ai"
        prompt = messageContent.slice(4).trim();
    }

    if (prompt.length > 0) {
        try {
            // Kirim pesan "Typing..."
            const typingMessage = await socket.sendMessage(chat.key.remoteJid, { text: '*Bot is typing...*' }, { quoted: chat });

            // Panggil Gemini AI untuk menghasilkan teks
            const genAI = new GoogleGenerativeAI(process.env.API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(`'Anda adalah Robot-Damar, sebuah AI yang dikembangkan oleh Damar dari kelas XII RPL 2 di Sekolah SMK Angkasa 1 Margahayu. Tugas Anda adalah memberikan informasi dan menjawab pertanyaan dengan cara yang jelas, informatif, dan mudah dimengerti dalam bahasa Indonesia. Gunakan bahasa yang sederhana dan hindari jargon teknis yang sulit dipahami. Pastikan setiap respons Anda ramah, sehingga pengguna merasa nyaman untuk berinteraksi dengan Anda. Jika tidak mengetahui jawaban atas pertanyaan, sampaikan dengan sopan dan tawarkan untuk membantu dengan pertanyaan lain. Dan ini adalah pertanyaannya : ''${prompt}'`);
            
            // Mengambil teks respons dari hasil AI
            const responseText = result.response.text();
            
            // Hapus pesan "Bot is typing..." dan kirim balasan AI
            await socket.sendMessage(chat.key.remoteJid, { text: responseText }, { quoted: typingMessage });

            // Simpan konteks untuk percakapan berikutnya
            conversationContext[chat.key.id] = responseText;

        } catch (error) {
            console.error("Error generating content:", error);
            await socket.sendMessage(chat.key.remoteJid, { text: 'Maaf, terjadi kesalahan saat memproses permintaan AI.' }, { quoted: chat });
        }
    } else {
        await socket.sendMessage(chat.key.remoteJid, { text: 'Mohon sertakan prompt setelah perintah ".ai".' }, { quoted: chat });
    }
}

module.exports = ai;