skjema = document.querySelector("#sok");
skjema.addEventListener("submit", sokAdresse);

const adresseEl = document.querySelector("#adresse");
async function sokAdresse(e) {
    e.preventDefault();
    const adresseSok = adresseEl.value.trim();
    const resultat = await fetch(`https://ws.geonorge.no/adresser/v1/sok?sok=${adresseSok}`);
    const data = await resultat.json();

    const adresse = data.adresser[0].adressetekst;
    const breddegrad = data.adresser[0].representasjonspunkt.lat;
    const lengdegrad = data.adresser[0].representasjonspunkt.lon;

    const res = await fetch('/lagAdresse', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({adresse, breddegrad, lengdegrad})
    });

    console.log(data.adresser[0]);
}

