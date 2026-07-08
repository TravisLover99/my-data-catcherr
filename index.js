const express = require('express');
const app = express();
app.use(express.json());
app.post('/', (req, res) => {
    console.log('--- GOT IT! ---', req.body);
    res.sendStatus(200);
});
app.listen(process.env.PORT || 3000);
