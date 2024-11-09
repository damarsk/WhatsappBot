async function hack(socket, chat) {
    // Kirim pesan pertama
    const sentMessage = await socket.sendMessage(chat.key.remoteJid, { text: 'Hacking Seseorang' });
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Hacking Seseorang.',
            edit: sentMessage.key,
        });
    }, 150);
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Hacking Seseorang..',
            edit: sentMessage.key,
        });
    }, 300);
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Hacking Seseorang...',
            edit: sentMessage.key,
        });
    }, 450);

    let waktu1 = 2000; // 2 detik
    let waktu2 = 6000; // 6 detik
    let waktu3 = 9000; // 9 detik
    let waktu4 = 15000; // 15 detik
    let waktu5 = 21000; // 21 detik
    let waktu6 = 28000; // 28 detik
    let waktu7 = 31000; // 31 detik
    let waktu8 = 38000; // 38 detik
    let waktu9 = 40000; // 40 detik

    // 2
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Mencari Email dan Kata Sandi....',
            edit: sentMessage.key,
        });
    }, waktu1);
    // 3
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'E-Mail: blablabla@gmail.com \nKata Sandi: ********',
            edit: sentMessage.key,
        });
    }, waktu2);
    // 4
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Mencari Akun Lain.....',
            edit: sentMessage.key,
        });
    }, waktu3);
    // 5
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Mengatur Akun Epic Games.....',
            edit: sentMessage.key,
        });
    }, waktu4);
    // 6
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Meretas Akun Epic Games......',
            edit: sentMessage.key,
        });
    }, waktu5);
    // 7
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Akun Epic Games berhasil diretas!!',
            edit: sentMessage.key,
        });
    }, waktu6);
    // 8
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Mengumpulkan Informasi.....',
            edit: sentMessage.key,
        });
    }, waktu7);
    // 9
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Data dijual ke Pihak Berwajib....',
            edit: sentMessage.key,
        });
    }, waktu8);
    // 10
    setTimeout(async () => {
        await socket.sendMessage(chat.key.remoteJid, {
            text: 'Selesai Meretas Seseorang',
            edit: sentMessage.key,
        });
    }, waktu9);
}

module.exports = hack;