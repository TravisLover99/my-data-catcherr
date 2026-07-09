const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// POST-Endpunkt
app.post('/data', (req, res) => {

    console.log('--- GOT IT! ---');

    console.log(req.body);

    res.status(200).json({
        success: true,
        received: req.body
    });

});

// Optional: Test im Browser
app.get('/', (req, res) => {
    res.send('Server läuft');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server läuft');
});
