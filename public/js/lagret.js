async function hentAdresser() {
    const res = await fetch('/api/hentAdresser');
    const lagret = document.querySelector("#lagret")

    if (res.ok) {
        const adresser = await res.json();
        if (adresser.length === 0) {
            return;
        }

        lagret.innerHTML ="";

        for (const adresse of adresser) {
            let element = document.createElement('div');
            element.classList.add('adresse');
            element.innerHTML = `<h2>${adresse.adresse}</h1><hr><p>Lengdegrader: ${adresse.lengdegrad}</p><p>Breddegrader: ${adresse.breddegrad}</p>`
            lagret.appendChild(element);
        }
    }
    else {
        console.error("Kunne ikke hente adresser")
    }
}

document.addEventListener("DOMContentLoaded", hentAdresser);