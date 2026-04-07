skjema = document.querySelector("#sok");
skjema.addEventListener("submit", sokAdresse);

const adresseEl = document.querySelector("#adresse");
async function sokAdresse(e) {
    e.preventDefault();
    adresse = adresseEl.value.trim();
    const resultat = await fetch(`https://ws.geonorge.no/adresser/v1/sok?sok=${adresse}`);
    const data = await resultat.json();

    console.log(data.adresser[0]);
}

