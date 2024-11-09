const axios = require('axios');

async function cuaca(socket, chat, pesan) {
  const rCmd = pesan.replace('.cuaca', '').trim();
  const provinsi = rCmd.replace(/\s/g, '');
  
  // Check if the province parameter is not empty
  if (provinsi === '') {
    return socket.sendMessage(chat.key.remoteJid, { text: 'Tolong isi dengan benar, contoh : `.cuaca <provinsi>`' }, { quoted: chat });
  } else {
      try {
      // Fetch data from the API
      const response = await axios.get(`https://weather-api-tau-six.vercel.app/weather/${provinsi}`);
  
      const areaData = response.data.data.forecast.area;
      const wilayahData = areaData.find(area => area.description[0]);
      const humidityData = wilayahData.parameter.find(param => param.description === "Humidity");
      
      // Inisialisasi variabel untuk menyimpan total dan jumlah entri
      let totalHumidity = 0;
      const numEntries = humidityData.timerange.length;
      
      // Loop melalui semua entri dalam timerange
      humidityData.timerange.forEach(entry => {
          // Ambil nilai kelembapan dan tambahkan ke total
          const humidityValue = parseInt(entry.value[0].text); // Pastikan untuk mengonversi ke integer
          totalHumidity += humidityValue;
      });
      
      // Hitung rata-rata
      let averageHumidity = totalHumidity / numEntries;
      averageHumidity = averageHumidity.toFixed(2);
  
      const maxTempData = wilayahData.parameter.find(param => param.description === "Max temperature");
  
      // Inisialisasi variabel untuk menyimpan total suhu maksimum dan jumlah entri
      let totalMaxTempCelsius = 0;
      const numTempEntries = maxTempData.timerange.length;
      
      // Loop melalui semua entri dalam timerange
      maxTempData.timerange.forEach(entry => {
          // Ambil nilai suhu maksimum dalam Celsius dan tambahkan ke total
          const maxTempCelsius = parseFloat(entry.value.find(temp => temp.unit === "C").text); // Pastikan untuk mengonversi ke float
          totalMaxTempCelsius += maxTempCelsius;
      });
      
      // Hitung rata-rata suhu maksimum dalam Celsius
      const averageMaxTempCelsius = totalMaxTempCelsius / numTempEntries;
  
      const minTempData = wilayahData.parameter.find(param => param.description === "Min temperature");
  
      // Inisialisasi variabel untuk menyimpan total suhu minimum dan jumlah entri
      let totalMinTempCelsius = 0;
      
      // Loop melalui semua entri dalam timerange
      minTempData.timerange.forEach(entry => {
          // Ambil nilai suhu minimum dalam Celsius dan tambahkan ke total
          const minTempCelsius = parseFloat(entry.value.find(temp => temp.unit === "C").text); // Pastikan untuk mengonversi ke float
          totalMinTempCelsius += minTempCelsius;
      });
      
      // Hitung rata-rata suhu minimum dalam Celsius
      let averageMinTempCelsius = totalMinTempCelsius / numTempEntries;
      averageMinTempCelsius = averageMinTempCelsius.toFixed(2);
  
      const windSpeedData = wilayahData.parameter.find(param => param.description === "Wind speed");
  
      // Inisialisasi variabel untuk menyimpan total kecepatan angin dan jumlah entri
      let totalWindSpeed = 0;
      
      // Loop melalui semua entri dalam timerange
      windSpeedData.timerange.forEach(entry => {
          // Ambil nilai kecepatan angin dalam Knots dan tambahkan ke total
          const windSpeedKnots = parseFloat(entry.value.find(speed => speed.unit === "Kt").text); // Pastikan untuk mengonversi ke float
          totalWindSpeed += windSpeedKnots;
      });
      
      // Hitung rata-rata kecepatan angin dalam Knots
      let averageWindSpeedKnots = totalWindSpeed / windSpeedData.timerange.length;
      averageWindSpeedKnots = averageWindSpeedKnots.toFixed(2);
  
      function capitalizeEachWord(text) {
        var splitText = text.toLowerCase().split(' ');
        for (i in splitText) {
            splitText[i] = splitText[i].charAt(0).toUpperCase() + splitText[i].substring(1);     
        }
        return splitText.join(' '); 
     }
      // You can construct the result message as needed
      const result = `Cuaca di *${capitalizeEachWord(rCmd)}* :\n\nMin Temperatur : ${averageMinTempCelsius} C\nMax Temperatur : ${averageMaxTempCelsius} C\nRata - Rata Kelembapan: ${averageHumidity}% \nRata - Rata Kecepatan Angin: ${averageWindSpeedKnots} Knots`;
  
      // Send the result message
      return socket.sendMessage(chat.key.remoteJid, { text: result }, { quoted: chat });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return socket.sendMessage(chat.key.remoteJid, { text: 'Tidak dapat menemukan data cuaca ketik `.provinsi` untuk melihat list provinsi!' }, { quoted: chat });
    }
    }

}

module.exports = cuaca;