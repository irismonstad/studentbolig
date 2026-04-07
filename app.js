const express = require('express');
const app = express();
app.use(express.static('public'));

const PORT = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended : false}));
app.use(express.json());

const Database = require('better-sqlite3');
const db = new Database('studentbolig.db');

// Gjør index.html til "hjemmesiden" -> den som vises på localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Serveren kjører på http://localhost:${PORT}`);
});

app.post('/lagBruker', (req, res) => {
    try {
        let {mail, mobil, fornavn, etternavn, passord} = req.body;
        mail = mail.toString().trim();
        mobil = mobil.toString().trim();
        fornavn = fornavn.toString().trim();
        etternavn = etternavn.toString().trim();
        passord = passord.toString().trim();

        console.log('Laget bruker ', fornavn, etternavn);

        db.prepare('INSERT INTO bruker (mail, mobil, fornavn, etternavn, passord) VALUES (?, ?, ?, ?, ?)').run(mail, mobil, fornavn, etternavn, passord);

        return res.sendStatus(201);
    }

    catch (err) {
        console.error('Feil ved opprettelse av bruker');
        return res.status(500).json({error: 'Kunne ikke lage bruker'});
    }
});

app.post('/lagAdresse', (req, res) => {
    try {
        let {adresse, breddegrad, lengdegrad} = req.body;
        adresse = adresse.toString().trim();
        breddegrad = breddegrad.toString().trim();
        lengdegrad = lengdegrad.toString.trim();

        console.log(`Opprettet adresse ${adresse} ved ${breddegrad}, ${lengdegrad}`)

        db.prepare('INSERT INTO adresse (adresse, breddegrad, lengdegrad) VALUES (?, ?, ?)').run(adresse, breddegrad, lengdegrad);
        return res.sendStatus(201);
    }
    catch(err) {
        console.error('Feil ved opprettelse av adresse');
        return res.status(500).json({error: 'Kunne ikke opprette adresse'});
    }
})

