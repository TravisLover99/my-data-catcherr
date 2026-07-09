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
app.get('/data/:payload', (req, res) => {

    try {

        const payload = decodeURIComponent(req.params.payload);

        const data = JSON.parse(
            Buffer.from(payload, 'base64').toString('utf8')
        );

        console.log('--- GOT IT! ---');
        console.log(data);

        res.status(200).json({
            success: true,
            received: data
        });

    } catch (err) {

        console.error(err);

        res.status(400).json({
            success: false,
            error: 'Ungültige Daten'
        });

    }

});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server läuft');
});
