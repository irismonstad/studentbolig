# Beskrivelse av ruter og kommunikasjon mellom frontend/backend
Jeg har tatt i bruk egne filer for ruter, der en inneholder endepunkter for adresser, og en for brukerhåndtering

## Adresse
`/lagreAdresse`

Sjekker først om bruker er innlogget, og lagrer i såfall brukerId hentet fra session i en variabel. Sjekker om adresse ligger i adresse-tabell fra før av, oppretter om ikke, og henter adresseId fra adresse-tabell.

Sender inn brukerId og adresseId til tabell Adresse_bruker om den ikke allerede finnes. 

**Bruk**: Brukes på boligsøk-siden, der en innlogget bruker kan trykke på lagre-knappen. Denne sendforsøker å sende den lagrede dataen fra forrige søk inn til databasen via ruten. 

`/hentAdresser`

Sjekker først om bruker er innlogget, lagrer i såfall brukerId hentet fra session i en variabel. Sender en spørring til databasen som henter ut informasjon om adressen kun ved adressene brukeren har lagret. Disse sendes til frontend som et JSON-objekt. 

**Bruk**: Brukes i oversikten over lagrede adresser. Her bruker frontend resultatene for å opprette ett element med tilhørende informasjon for hver adresse.

## Bruker
`/lagBruker`

Prøver å opprette bruker ved å sende inn parametre til databasen. Denne sjekker ikke om en bruker allerede ligger i databasen, men fordi mail må være unik vil en feil oppstå om det forsøkes.

**Bruk**: Brukes på brukeropprettelsessiden. Bruker fyller ut et skjema med personalia og passord og trykker submit for å sende disse inn. 

`/login`

Henter passord for mailadressen sendt inn, og sjekker om dette stemmer med passordet sendt inn. Om det stemmer opprettes en session med brukerId og fornavn lagret.

**Bruk**: Brukes på login siden. Brukeren fyller ut et skjema og trykker på submit for å sende inn data fra mail- og passordfelt.

`/sjekkLogin`

Sjekker om det finnes en session, og sender tilbake true om det gjør det, eller false hvis det ikke gjør. 

**Bruk**: Denne brukes på hjemsiden for å kunne vise en personlig melding til brukeren