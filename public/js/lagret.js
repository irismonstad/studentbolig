// Henter alle lagrede adresser for den innloggede brukeren
async function hentAdresser() {
    try {
        const res = await fetch('/api/hentAdresser');

        // Hvis siden får igjen et resultat, bruk funksjonen visAdresser.
        if (res.ok) {
            const adresser = await res.json();
            visAdresser(adresser);
        }
        else {
            console.error("Kunne ikke hente adresser");
        }
    }
    catch(error) {
        console.error("Det oppsto en feil ved henting av adresser:", error);
    }
}

function visAdresser(adresser) {
    const lagret = document.querySelector("#lagret")
    if (adresser.length === 0) {
        return;
    }
    
    // "tømmer" lagret for innhold slik at jeg kan fylle denne med adresseelementer
    lagret.innerHTML ="";

    for (const adresse of adresser) {
        let element = document.createElement('div');
        element.classList.add('adresse');
        element.innerHTML = `<h2>${adresse.adresse}</h1><hr><p>Lengdegrader: ${adresse.lengdegrad}</p><p>Breddegrader: ${adresse.breddegrad}</p>`
        lagret.appendChild(element);
    }
    
}

// Henter adressene så fort DOM er lastet inn
document.addEventListener("DOMContentLoaded", hentAdresser);