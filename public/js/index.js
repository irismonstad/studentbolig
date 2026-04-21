const velkomst = document.querySelector("#velkomstmelding")

// Sjekker om brukeren er innlogget ved å sjekke om det finnes en session (med express-session), og viser fornavnet på brukeren hvis den er innlogget
async function sjekkInnlogging() {
    const res = await fetch('/sjekklogin');
    const status = await res.json();
    
    // Sjekker om status.innlogget = true
    if (status.innlogget) {
        const navn = status.fornavn
        const storforbokstav = navn.charAt(0).toUpperCase() + navn.slice(1);
        console.log("Velkommen, " + storforbokstav);
        velkomst.innerHTML = `Velkommen ${storforbokstav}!`;

    }
    else {
        console.log("Bruker er ikke logget inn.")
    }
}

// Sjekker om brukeren er logget inn når siden lastes
window.addEventListener("DOMContentLoaded", sjekkInnlogging);

skjema = document.querySelector("#skjema");
skjema.addEventListener("submit", funksjon);

const sok = document.querySelector("#sok");