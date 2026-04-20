// HTML for en navigasjonsbar som skal vises på toppen av alle sidene
const navHTML = 
`<nav class="globalnav">
    <ul class="lenker">
        <li><a href="/">Hjem</a></li>
        <li><a href="/html/boligsok.html">Søk</a></li>
        <li><a href="/html/profil.html">Profil</a></li>
        <li><a href="/html/lagret.html">Lagret</a></li>
        <li><a href="/html/login.html">Logg inn</a></li>
        <li><a href="/html/signup.html">Sign up</a></li>
    </ul>
</nav>`;

// Legger til HTML-en aller først i body-elementet
document.body.insertAdjacentHTML('afterbegin', navHTML);

