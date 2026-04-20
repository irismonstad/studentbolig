const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/lagBruker', (req, res) => {
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

router.post('/login', (req, res) => {
    const {mail, passord} = req.body;

    const bruker = db.prepare('SELECT * from bruker WHERE mail = ?').get(mail);

    if (bruker && bruker.passord === passord) {
        req.session.brukerId = bruker.id;
        req.session.fornavn = bruker.fornavn;

        return res.status(200).json({fornavn: bruker.fornavn});
    }
    
    else {
        return res.status(401).json({ error: "Feil e-post eller passord" });
    }
})

// Ruten sjekker om brukeren er logget inn ved å undersøke om det finnes et 
router.get('api/sjekklogin', (req, res) => {
    if (req.session.brukerId) {
        res.json({innlogget: true, fornavn: req.session.fornavn});
    }
    else {
        res.json({innlogget: false});
    }
});

module.exports = router;