const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.post('/', (req, res) => {

    console.log('--- GOT IT! ---');

    console.log(req.body);

    res.sendStatus(200);

});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server läuft');
});
