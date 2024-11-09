async function menu(socket, chat) {
    const commands1 = [
        { name: "`PERINTAH BASIC`", description: "" },
        { name: "> .menu", description: "- Menampilkan list perintah / commands" },
        { name: "> .sticker", description: "- Membuat Gambar yang dikirimkan menjadi Sticker" },
        { name: "> .about", description: "- Tentang Bot Ini" }, 
        { name: "> .update", description: "- Fitur baru dari update terbaru" }, 
        { name: "", description: "" },
        { name: "`PERINTAH HIBURAN`", description: "" },
        { name: "> .say", description: "- Mengulangi apa yang diketik" },
        { name: "> .meme", description: "- Kumpulan Mim Random" },
        { name: "> .jokes", description: "- Jokes Bapak Bapak (Text)" },
        { name: "> .quotes", description: "- Kutipan Kutipan Penyemangat" },
        { name: "> .dadu", description: "- Melempar Dadu" },
        { name: "> .tableflip", description: "- (╯°□°）╯︵ ┻━┻" },
        { name: "> .unflip", description: "- ┬─┬ ノ( ゜-゜ノ)" },
        { name: "> .hack", description: "- Meretas Akun Seseorang (FUN ONLY)" },
        { name: "", description: "" },
        { name: "`PERINTAH ARITMATIKA`", description: "" },
        { name: "> .tambah", description: "- Melakukan penjumlahan" },
        { name: "> .kurang", description: "- Melakukan pengurangan" },
        { name: "> .kali", description: "- Melakukan perkalian" },
        { name: "> .bagi", description: "- Melakukan pembagian" },
        { name: "> .pangkat", description: "- Melakukan per-akaran" },
        { name: "> .akar", description: "- Melakukan perpangkatan" },
        // Tambahkan perintah lainnya sesuai kebutuhan
    ];
    
    const commands2 = [
        { name: "`INFORMASI`", description: "" },
        { name: "> .date", description: "- Tanggal & Waktu Sekarang"},
        { name: "> .news", description: "- Berita CNN Terbaru" },
        { name: "> .provinsi", description: "- Provinsi di Indonesia" },
        { name: "> .cuaca", description: "- Informasi cuaca di setiap Provinsi" },
        { name: "> .lirik", description: "- Mencari Lirik Lagu berdasarkan Judul [BETA]" },
        { name: "> .translate", description: "- Menerjemahkan Kalimat sesuai bahasa yang ditentukan" },
    ];

    let menuText1 = "*Berikut ini daftar perintah yang tersedia :*\n\n";
    let menuText2 = "*PAGES 2*\n\n";
    commands1.forEach(command => {
        menuText1 += `${command.name} ${command.description}\n`;
    });
    commands2.forEach(command => {
        menuText2 += `${command.name} ${command.description}\n`;
    });

    await socket.sendMessage(chat.key.remoteJid, { text: menuText1 }, { quoted: chat });
    await socket.sendMessage(chat.key.remoteJid, { text: menuText2 });
}

module.exports = menu;