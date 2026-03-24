skjema = document.querySelector("#skjema");
skjema.addEventListener("submit", lagBruker);

const mailEl = document.querySelector("#mail");
const mobilEl = document.querySelector("#mobil");
const fornavnEl = document.querySelector("#fornavn");
const etternavnEl = document.querySelector("#etternavn");
const passordEl = document.querySelector("#passord");


async function lagBruker(e) {
    e.preventDefault();

    const mail = mailEl.value.trim();
    const mobil = mobilEl.value.trim();
    const fornavn = fornavnEl.value.trim();
    const etternavn = etternavnEl.value.trim();
    const passord = passordEl.value.trim();

    const res = await fetch('/lagBruker', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({mail, mobil, fornavn, etternavn, passord})
    });

    const feedback = document.createElement('p')
    document.body.appendChild(feedback);
    feedback.innerHTML = `<p>${mail} lagt til i databasen`

};