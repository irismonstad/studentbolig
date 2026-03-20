const express = require('express');
const app = express();
app.use(express.static('public'));

const PORT = 3000;

const cors = require('cors');
app.use(cors());

const Database = require('better-sqlite3');
const db = new Database('studentbolig.db');

// Gjør index.html til "hjemmesiden" -> den som vises på localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Serveren kjører på http://localhost:${PORT}`);
});