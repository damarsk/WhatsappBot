async function date(socket, chat) {
    // Atur zona waktu ke WIB (UTC+7)
	const options = { timeZone: 'Asia/Jakarta' };
	const waktuSekarang = new Date();
	const date = waktuSekarang.toLocaleDateString('id-ID', options);
	const jam = waktuSekarang.toLocaleTimeString('id-ID', options);
	// Dapatkan label hari dalam seminggu
	const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][new Date().getDay()];
    await socket.sendMessage(chat.key.remoteJid, { text: `*Waktu & Tanggal Hari Ini*\n\n - Hari : ${day}\n - Tanggal : ${date}\n - Jam : ${jam} (WIB)`},{quoted: chat});
};

module.exports = date