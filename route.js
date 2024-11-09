// RUTE PARA MODULE ATAU PERINTAH
// UMUM
const testing = require("./perintah/fun/tes");
const menu = require("./perintah/umum/menu");
const stickerMaker = require("./perintah/umum/sticker");
const date = require("./perintah/informasi/date");
const about = require("./perintah/umum/about");
const update = require("./perintah/umum/update");
const ai = require("./perintah/umum/ai");
// HIBURAN
const say = require("./perintah/fun/say");
const meme = require("./perintah/fun/meme");
const jokes = require("./perintah/fun/jokes");
const quotes = require("./perintah/fun/quotes");
const dadu = require("./perintah/fun/dadu");
const tableflip = require("./perintah/fun/tableflip");
const unflip = require("./perintah/fun/unflip");
const hack = require("./perintah/fun/hack");
// ARITMATIKA
const { tambah, kurang, kali, bagi, akar, pangkat } = require("./perintah/aritmatika/aritmatika");
// INFORMASI
const news = require("./perintah/informasi/news");
const provinsi = require("./perintah/informasi/provinsi");
const cuaca = require("./perintah/informasi/cuaca");
const lirik = require("./perintah/informasi/lirik");
const translate = require("./perintah/informasi/translate");

// FUNGSI UNTUK MENGARAHKAN PERINTAH
function route(socket, chat, pesan) {
  pesan = pesan.toLowerCase();
  // PERINTAH UMUM
  if (pesan.toLowerCase().startsWith('.ai')) {
    // Panggil command AI
    return ai(socket, chat);
  }
  if (pesan == ".tes") {
    return testing(socket, chat);
  }
  if (pesan == "halo" || pesan == "p" || pesan == "hi" || pesan == "hai" || pesan == "hello" || pesan == "helo") {
    socket.sendMessage(
      chat.key.remoteJid,
      { text: "Halo, Apabila ingin mengetahui perintah lainnya ketik '.menu'" },
      { quoted: chat }
    );
    return;
  }
  if (pesan == ".menu" || pesan == ".help" || pesan == ".bantuan" || pesan == ".perintah") {
    return menu(socket, chat);
  }
  if (pesan == ".sticker" && !chat.message?.imageMessage) {
    socket.sendMessage(chat.key.remoteJid, { text: 'Sertakan gambar juga yang akan dijadikan sebagai sticker!' }, { quoted: chat });
    return;
  } else if (chat.message?.imageMessage?.caption == ".sticker" && chat.message?.imageMessage) {
    return stickerMaker(socket, chat);
  } 
  if (pesan == ".date") {
    return date(socket, chat);
  }
  if (pesan == ".about") {
    return about(socket, chat);
  }
  if (pesan == ".update") {
    return update(socket, chat);
  }

  // HIBURAN COMMAND
  if (pesan.startsWith(".say ")) {
    return say(socket, chat, pesan);
  }
  if (pesan == ".meme") {
    return meme(socket, chat);
  }
  if (pesan == ".jokes") {
    return jokes(socket, chat);
  }
  if (pesan == ".quotes") {
    return quotes(socket, chat);
  }
  if (pesan == ".dadu") {
    return dadu(socket, chat);
  }
  if (pesan == ".tableflip") {
    return tableflip(socket, chat);
  }
  if (pesan == ".unflip") {
    return unflip(socket, chat);
  }
  if (pesan == ".hack") {
    return hack(socket, chat);
  }

  // ARITMATIKA
  if (pesan.startsWith(".tambah")) {
    return tambah(socket, chat, pesan);
  }
  if (pesan.startsWith(".kurang")) {
    return kurang(socket, chat, pesan);
  }
  if (pesan.startsWith(".kali")) {
    return kali(socket, chat, pesan);
  }
  if (pesan.startsWith(".bagi")) {
    return bagi(socket, chat, pesan);
  }
  if (pesan.startsWith(".akar")) {
    return akar(socket, chat, pesan);
  }
  if (pesan.startsWith(".pangkat")) {
    return pangkat(socket, chat, pesan);
  }
  // INFORMASI
  if (pesan == ".news") {
    
    return news(socket, chat);
  }
  if (pesan == ".provinsi") {
    return provinsi(socket, chat);
  }
  if (pesan.startsWith(".cuaca")) {
    return cuaca(socket, chat, pesan);
  }
  if (pesan.startsWith(".lirik")) {
    return lirik(socket, chat, pesan);
  }
  if (pesan.startsWith(".translate")) {
    return translate(socket, chat, pesan);
  }
}

module.exports = route;