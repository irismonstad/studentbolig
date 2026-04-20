const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/lagAdresse', (req, res) => {
    try {
        let {adresse, breddegrad, lengdegrad} = req.body;
        adresse = adresse.toString().trim();
        breddegrad = breddegrad.toString().trim();
        lengdegrad = lengdegrad.toString().trim();

        console.log(`Opprettet adresse ${adresse} ved ${breddegrad}, ${lengdegrad}`)

        db.prepare('INSERT INTO adresse (adresse, breddegrad, lengdegrad) VALUES (?, ?, ?)').run(adresse, breddegrad, lengdegrad);
        return res.sendStatus(201);
    }
    catch(err) {
        console.error('Feil ved opprettelse av adresse');
        return res.status(500).json({error: 'Kunne ikke opprette adresse'});
    }
});




router.get('/hentAdresser', (req, res) => {
    const rows = db.prepare(`
        SELECT adresse, breddegrad, lengdegrad FROM adresse`).all();

    res.json(rows);

});

module.exports = router;