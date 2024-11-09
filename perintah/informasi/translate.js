const axios = require('axios');

const supportedLanguages = {
    "af": "Afrikaans",
    "sq": "Albanian",
    "am": "Amharic",
    "ar": "Arabic",
    "hy": "Armenian",
    "as": "Assamese",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "bm": "Bambara",
    "eu": "Basque",
    "be": "Belarusian",
    "bn": "Bengali",
    "bho": "Bhojpuri",
    "bs": "Bosnian",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    "co": "Corsican",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "dv": "Dhivehi",
    "doi": "Dogri",
    "nl": "Dutch",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "ee": "Ewe",
    "fil": "Filipino (Tagalog)",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Frisian",
    "gl": "Galician",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek",
    "gn": "Guarani",
    "gu": "Gujarati",
    "ht": "Haitian Creole",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "he": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "ig": "Igbo",
    "ilo": "Ilocano",
    "id": "Indonesian",
    "ga": "Irish",
    "it": "Italian",
    "ja": "Japanese",
    "jv": "Javanese",
    "kn": "Kannada",
    "kk": "Kazakh",
    "km": "Khmer",
    "rw": "Kinyarwanda",
    "gom": "Konkani",
    "ko": "Korean",
    "kri": "Krio",
    "ku": "Kurdish",
    "ckb": "Kurdish (Sorani)",
    "ky": "Kyrgyz",
    "lo": "Lao",
    "la": "Latin",
    "lv": "Latvian",
    "ln": "Lingala",
    "lt": "Lithuanian",
    "lg": "Luganda",
    "lb": "Luxembourgish",
    "mk": "Macedonian",
    "mai": "Maithili",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mi": "Maori",
    "mr": "Marathi",
    "mni-Mtei": "Meiteilon (Manipuri)",
    "lus": "Mizo",
    "mn": "Mongolian",
    "my": "Myanmar (Burmese)",
    "ne": "Nepali",
    "no": "Norwegian",
    "ny": "Nyanja (Chichewa)",
    "or": "Odia (Oriya)",
    "om": "Oromo",
    "ps": "Pashto",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese (Portugal, Brazil)",
    "pa": "Punjabi",
    "qu": "Quechua",
    "ro": "Romanian",
    "ru": "Russian",
    "sm": "Samoan",
    "sa": "Sanskrit",
    "gd": "Scots Gaelic",
    "nso": "Sepedi",
    "sr": "Serbian",
    "st": "Sesotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "si": "Sinhala (Sinhalese)",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "es": "Spanish",
    "su": "Sundanese",
    "sw": "Swahili",
    "sv": "Swedish",
    "tl": "Tagalog (Filipino)",
    "tg": "Tajik",
    "ta": "Tamil",
    "tt": "Tatar",
    "te": "Telugu",
    "th": "Thai",
    "ti": "Tigrinya",
    "ts": "Tsonga",
    "tr": "Turkish",
    "tk": "Turkmen",
    "ak": "Twi (Akan)",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "ug": "Uyghur",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "cy": "Welsh",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zulu"
};

async function translate(socket, chat, pesan) {
    // Periksa apakah pesan adalah perintah untuk menampilkan daftar bahasa yang didukung
    if (pesan == '.translate bahasa') {
        const supportedLanguagesList = Object.entries(supportedLanguages).map(([code, language]) => `${code}: ${language}`).join('\n');
        return await socket.sendMessage(chat.key.remoteJid, { text: `*Bahasa yang didukung :*\n${supportedLanguagesList}` }, { quoted: chat });
    }
    // Periksa apakah pesan mengandung kalimat dan bahasa target
    const rCmd = pesan.replace('.translate', '').trim();
    const regex = /(.+) to:(.+)/;
    const matches = rCmd.match(regex);

    // Periksa apakah ada kata dan bahasa target yang ditentukan
    if (!matches || matches.length < 3) {
        return await socket.sendMessage(chat.key.remoteJid, { text: 'Format: .translate <kalimat> to:<kode bahasa target>\nContoh : `.translate selamat datang to:en` (en = English)\n\nCek bahasa yang disupport : `.translate bahasa`' }, { quoted: chat });
    }


    const kalimat = matches[1].trim();
    const bahasa = matches[2].trim();

    //  Periksa apakah bahasa target didukung
    if (!supportedLanguages.hasOwnProperty(bahasa)) {
        return await socket.sendMessage(chat.key.remoteJid, { text: 'Bahasa target tidak didukung.' }, { quoted: chat });
    }

    // Bentuk URL untuk permintaan terjemahan
    const url = `https://api-translate.azharimm.dev/translate?engine=google&text=${kalimat}&to=${bahasa}`;

    try {
        // Ambil data dari API terjemahan
        const response = await axios.get(url);

        // Ambil data terjemahan dari respons
        const { origin, result } = response.data.data;

        // Kirim pesan hasil terjemahan
        await socket.sendMessage(chat.key.remoteJid, { text: `Translate: ${kalimat} (${origin}) -> ${result} (${bahasa})` }, { quoted: chat });
    } catch (error) {
        // Tangani kesalahan jika ada
        console.error(error);
        await socket.sendMessage(chat.key.remoteJid, { text: 'Terjadi kesalahan saat melakukan terjemahan.' }, { quoted: chat });
    }
}

module.exports = translate;