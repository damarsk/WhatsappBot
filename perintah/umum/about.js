async function about(socket, chat) {
    const totalSeconds = process.uptime();
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
	await socket.sendMessage(
	chat.key.remoteJid, 
	{ text: `*Tentang Bot Ini*\n\nWebsite : https://s.id/Damar\nWebsite Dinamis : https://damar.rf.gd/\nDibuat Oleh : Damar\nVersi : V2.2 *[ .update ]*\nUptime : ${days} Hari, ${hours} Jam, ${minutes} Menit, ${seconds} Detik\n\n*Note : Apabila ada kritik & saran silahkan kontak 0877-3104-3392` },
	{ quoted: chat });
};

module.exports = about