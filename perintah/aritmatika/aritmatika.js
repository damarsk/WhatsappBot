async function tambah(socket, chat, pesan) {
    // Memeriksa apakah input ada dan terdiri dari minimal 2 angka
    const angka = pesan.replace('.tambah', '').trim();
    if (!angka || angka.split(" ").filter(num => !isNaN(num)).length < 2) {
        await socket.sendMessage(
            chat.key.remoteJid, 
            { text: "Mohon masukkan minimal 2 angka yang valid.\nContoh : .tambah <angka pertama> <angka kedua>" }, 
            { quoted: chat });
        return;
    };

    const numbers = angka.split(" ").map(Number);
    const hasil = numbers.reduce((total, num) => total + num, 0);
    await socket.sendMessage(chat.key.remoteJid, { text: `Hasil penjumlahan adalah : ${hasil}` });    
};


async function kurang(socket, chat, pesan) {
    const angka = pesan.replace('.kurang', '').trim();
    if (!angka || angka.split(" ").filter(num => !isNaN(num)).length < 2) {
        await socket.sendMessage(
            chat.key.remoteJid, 
            { text: "Mohon masukkan minimal 2 angka yang valid.\nContoh : .kurang <angka pertama> <angka kedua>" }, 
            { quoted: chat });
        return;
    };

    const numbers = angka.split(" ").map(Number);
    const hasil = numbers.reduce((total, num) => total - num);
    await socket.sendMessage(
        chat.key.remoteJid, { text: `Hasil pengurangan adalah : ${hasil}` });
};


async function kali(socket, chat, pesan) {
    const angka = pesan.replace('.kali', '').trim();
    if (!angka || angka.split(" ").filter(num => !isNaN(num)).length < 2) {
        await socket.sendMessage(
            chat.key.remoteJid, 
            { text: "Mohon masukkan minimal 2 angka yang valid.\nContoh : .kali <angka pertama> <angka kedua>" }, 
            { quoted: chat });
        return;
    }

    const numbers = angka.split(" ").map(Number);
    const hasil = numbers.reduce((total, num) => total * num, 0);
    await socket.sendMessage(chat.key.remoteJid, { text: `Hasil perkalian adalah : ${hasil}` });
};


async function bagi(socket, chat, pesan) {
    const angka = pesan.replace('.bagi', '').trim();
    if (!angka || angka.split(" ").filter(num => !isNaN(num)).length < 2) {
        await socket.sendMessage(
            chat.key.remoteJid, 
            { text: "Mohon masukkan minimal 2 angka yang valid.\nContoh : .bagi <angka pertama> <angka kedua>" }, 
            { quoted: chat });
        return;
    }

    const numbers = angka.split(" ").map(Number);
    if (numbers.some(num => num === 0)) {
        await socket.sendMessage(chat.key.remoteJid, { text: "Infinity / Tidak Terdefinisi" }, { quoted: chat });
        return;
    }

    const hasil = numbers.reduce((total, num, index) => {
        if (index === 1) return total / num;
        return total / num;
    });

    await socket.sendMessage(chat.key.remoteJid, { text: `Hasil pembagian adalah : ${hasil}` }, { quoted: chat });
};

async function akar(socket, chat, pesan) {
    const angka = pesan.replace('.akar', '').trim();
    if (!angka || isNaN(angka)) {
        await socket.sendMessage(
            chat.key.remoteJid, 
            { text: "Mohon masukkan angka yang valid.\nContoh : .akar <angka>" }, 
            { quoted: chat });
        return;
    }

    const hasil = Math.sqrt(Number(angka));
    await socket.sendMessage(chat.key.remoteJid, { text: `Hasil akar adalah : ${hasil}` });
}

async function pangkat(socket, chat, pesan) {
    const angka = pesan.replace('.pangkat', '').trim();
    if (!angka || angka.split(" ").filter(num => !isNaN(num)).length < 2) {
        await socket.sendMessage(
            chat.key.remoteJid, 
            { text: "Mohon masukkan minimal 2 angka yang valid.\nContoh : .pangkat <angka> <pangkat>" }, 
            { quoted: chat });
        return;
    }

    const numbers = angka.split(" ").map(Number);
    const hasil = Math.pow(numbers[0], numbers[1]);
    await socket.sendMessage(chat.key.remoteJid, { text: `Hasil pangkat adalah : ${hasil}` });
}

module.exports = { tambah, kurang, kali, bagi, akar, pangkat };