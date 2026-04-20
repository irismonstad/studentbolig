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

module.exports = router;