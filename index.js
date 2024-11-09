// Impor modul-modul yang diperlukan
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const route = require('./route');

// Tetapkan fungsi asinkron untuk menghubungkan ke WhatsApp
async function KonekKeWhatsapp() {

    // Gunakan fungsi 'useMultiFileAuthState' untuk mengelola status autentikasi
    const auth = await useMultiFileAuthState("session");

    // Buat socket WhatsApp baru menggunakan fungsi 'makeWASocket'
    const socket = makeWASocket({
        printQRInTerminal: true, // Cetak kode QR di terminal untuk pemindaian
        browser: ["DAMAR BOT", "", ""], // Tetapkan informasi browser
        auth: auth.state, // Gunakan status autentikasi
        logger: pino({ level: "silent" }), // Tetapkan logger dengan level silent
    });

    // Dengarkan acara 'creds.update' dan simpan kredensial
    socket.ev.on("creds.update", auth.saveCreds);

    // Dengarkan acara 'connection.update' dan tangani perubahan koneksi
    socket.ev.on("connection.update", async ({ connection }) => {
        if(connection === "open") {
            console.log("BOT WHATSAPP SUDAH MENYALA ✅ -- DAMAR BOT");
        } else if(connection === "close") {
            console.log("Menyambungkan Ulang");
            await KonekKeWhatsapp(); // Hubungkan ulang jika koneksi terputus
        }
    });

    // Dengarkan acara 'messages.upsert' dan tangani pesan masuk
    socket.ev.on("messages.upsert", async ({ messages, type }) => {
        const chat = messages[0];
        const pesan = (chat.message?.extendedTextMessage?.text?? chat.message?.ephemeralMessage?.message?.extendedTextMessage?.text?? chat.message?.conversation) || "";
        console.log(`Pesan Masuk : ${pesan}`);
        await route(socket, chat, pesan); // Arahkan pesan ke penangan yang sesuai
    });
}

// Panggil fungsi 'KonekKeWhatsapp' untuk memulai koneksi
KonekKeWhatsapp();