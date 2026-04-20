const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/lagreAdresse', (req, res) => {
    if (!req.session.brukerId) return res.status(401).send("Ikke innlogget");

    const brukerId = req.session.brukerId;

    try {
        let {adresse, breddegrad, lengdegrad} = req.body;
        adresse = adresse.toString().trim();
        breddegrad = breddegrad.toString().trim();
        lengdegrad = lengdegrad.toString().trim();

        // INSERT OR IGNORE INTO legger raden inn i databasen kun hvis den ikke finnes enda. 
        db.prepare('INSERT OR IGNORE INTO adresse (adresse, breddegrad, lengdegrad) VALUES (?, ?, ?)').run(adresse, breddegrad, lengdegrad);

        // Akkurat denne burde endres slik at adresser med samme navn skilles fra hverandre.
        const adresseId = db.prepare('SELECT id FROM adresse WHERE adresse = ?').get(adresse).id;
        
        db.prepare('INSERT OR IGNORE INTO adresse_bruker (bruker_id, adresse_id) VALUES (?,?)').run(brukerId, adresseId);

        console.log(`Lagret adresse ${adresse} ved ${breddegrad}, ${lengdegrad} brukerId ${brukerId}`);
        return res.sendStatus(201);
    }
    catch(err) {
        console.error('Feil ved lagring av adresse');
        return res.status(500).json({error: 'Kunne ikke opprette adresse'});
    }
});

router.get('/hentAdresser', (req, res) => {
    if (!req.session.brukerId) {
        return res.status(401).json({error: "Logg inn for å se lagrede adresser."});
    }

    const brukerId = req.session.brukerId;

    try {
        const rows = db.prepare(`
            SELECT a.adresse, a.breddegrad, a.lengdegrad
            FROM adresse a
            JOIN adresse_bruker ab ON a.id = ab.adresse_id
            WHERE ab.bruker_id = ?
        `).all(brukerId);

        res.json(rows);
    }
    catch(err) {
        console.error("Feil ved henting av adresser:", err);
        res.status(500).json({error:"Kunne ikke hente adresser"});
    }

});

module.exports = router;