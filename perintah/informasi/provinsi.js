const provinsiIndo = [
    {
        "id": "Aceh",
    },
    {
        "id": "Bali",
    },
    {
        "id": "Bangka Belitung",
    },
    {
        "id": "Banten",
    },
    {
        "id": "Bengkulu",
    },
    {
        "id": "DI Yogyakarta",
    },
    {
        "id": "DKI Jakarta",
    },
    {
        "id": "Gorontalo",
    },
    {
        "id": "Jambi",
    },
    {
        "id": "Jawa Barat",
    },
    {
        "id": "Jawa Tengah",
    },
    {
        "id": "Jawa Timur",
    },
    {
        "id": "Kalimantan Barat",
    },
    {
        "id": "Kalimantan Selatan",
    },
    {
        "id": "Kalimantan Tengah",
    },
    {
        "id": "Kalimantan Timur",
    },
    {
        "id": "Kalimantan Utara",
    },
    {
        "id": "Kepulauan Riau",
    },
    {
        "id": "Lampung",
    },
    {
        "id": "Maluku",
    },
    {
        "id": "Maluku Utara",
    },
    {
        "id": "Nusa Tenggara Barat",
    },
    {
        "id": "Nusa Tenggara Timur",
    },
    {
        "id": "Papua",
    },
    {
        "id": "Papua Barat",
    },
    {
        "id": "Riau",
    },
    {
        "id": "Sulawesi Barat",
    },
    {
        "id": "Sulawesi Selatan",
    },
    {
        "id": "Sulawesi Tengah",
    },
    {
        "id": "Sulawesi Tenggara",
    },
    {
        "id": "Sulawesi Utara",
    },
    {
        "id": "Sumatera Barat",
    },
    {
        "id": "Sumatera Selatan",
    },
    {
        "id": "Sumatera Utara",
    }
];

async function provinsi(socket, chat){
    let prov = '*List Provinsi di Indonesia :*\n\n';
    let no = 1;
    for (let i = 0; i < provinsiIndo.length; i++) {
        prov += `${no}. ${provinsiIndo[i].id}\n`;
        no++;
    }
    await socket.sendMessage(chat.key.remoteJid, { text: prov }, { quoted: chat });
}

module.exports = provinsi;