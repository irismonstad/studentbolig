skjema = document.querySelector("#sok");
skjema.addEventListener("submit", sokAdresse);

lagre = document.querySelector("#lagre");
lagre.addEventListener("click", lagreAdresse);

const adresseEl = document.querySelector("#adresse");

// Variabler for å lagre data om adresse
let adresse = "";
let breddegrad = 0;
let lengdegrad = 0;

// Initialiserer kart med leaflet, setter default view til Oslo. 
const map = L.map('map').setView([59.91, 10.75], 13);
// Tilelayer "tegner" kart tiles, slik at man kan se kartet. Står fritt til å velge hvilken provider, jeg bruker openstreetmap sine (gratis) tiles.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function sokAdresse(e) {
    e.preventDefault();
    const adresseSok = adresseEl.value.trim();
    const resultat = await fetch(`https://ws.geonorge.no/adresser/v1/sok?sok=${adresseSok}`);
    const data = await resultat.json();

    // Oppdaterer dataverdiene for adressen
    adresse = data.adresser[0].adressetekst;
    breddegrad = data.adresser[0].representasjonspunkt.lat;
    lengdegrad = data.adresser[0].representasjonspunkt.lon;

    // Flytter mapview til den nye adressen
    map.setView([breddegrad,lengdegrad],17);

    console.log(data.adresser[0]);
}

async function lagreAdresse() {
    // Legger adresser fra søk i databasen
    const res = await fetch('/api/lagreAdresse', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({adresse, breddegrad, lengdegrad})
    });
}