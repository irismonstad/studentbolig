const express = require('express');
const app = express();
app.use(express.static('public'));

const PORT = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended : false}));
app.use(express.json());

// Importerer rutene fra rutenfilene
const brukerRuter = require('./routes/bruker');
const adresseRuter = require('./routes/adresse');

// Bruker rutene fra rutefilene, alle ruter for adresser faller under /api/rute.., mens alle ruter for brukere faller under /rute..
app.use('/', brukerRuter);
app.use('/api', adresseRuter);

// Gjør index.html til "hjemmesiden" -> den som vises på localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Serveren kjører på http://localhost:${PORT}`);
});