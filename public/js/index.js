const velkomst = document.querySelector("#velkomstmelding")

// Sjekker om brukeren er innlogget ved å sjekke om det finnes en session, hvis ikke skal det vises en login/signup knapp
async function sjekkInnlogging() {
    const res = await fetch('/sjekklogin');
    const status = await res.json();
    
    if (status.innlogget) {
        console.log("Velkommen, " + status.fornavn);
        velkomst.innerHTML = `Velkommen ${status.fornavn}`;

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