# Data (Database, API osv.)
* [Database](#Databasen)
* [API](#API)
* [Databehandling og UU](#Tanker-om-databehandling-og-UU)

## Databasen
### Datamodell
![Datamodell](../dokumentasjon/datamodell.png)

### Bruker:
| Navn | Datatype | PK | FK | Unik | Not NULL |
|------|------|------|------|------|------|
| id |   int: auto-inc   |   X   |      |   X   |   X   |
| mail |   text   |      |      |   X   |   X   |
| fornavn |   text   |      |      |      |   X   |
| etternavn |   text   |      |      |      |   X   |
| mobil |   text   |      |      |      |      |
| passord |   text   |      |      |      |   X   |

**Kommentarer**:
Passord må krypteres/hashes, jeg har ikke undersøkt hvordan jeg vil gjøre dette enda. Mail vil brukes til å logge inn, mobil er derfor ikke obligatorisk, og tanken er at begge skal kunne brukes til å sende varslinger. Mailadresse kan være en sekundærnøkkel, men pga. at denne kan endres tok jeg i bruk en id. 

### Adresse:
| Navn | Datatype | PK | FK | Unik | Not NULL |
|------|------|------|------|------|------|
| id |   int: auto-inc   |   X   |   X   |   X   |   X   |
| adresse |   text   |      |      |      |   X   |
| lengdegrad |   int   |      |      |      |   X   |
| breddegrad |   int   |      |      |      |   X   |

**Kommentarer**:
Fordi gatenavn kan gå igjen, var jeg nødt til å finne en annen måte å sikre at jeg har riktig adresse på. Jeg valgte å bruke lengdegrad/breddegrad fordi dette er data som kartverket leveret gjennom api-et sitt, og vil alltid komme tilbake til samme adresse gjennom api-et. Jeg valgte å ta i bruk en id slik at dataen i adresse_bruker blir så enkel så mulig å forholde seg til. 

### Adresse_bruker:
| Navn | Datatype | PK | FK | Unik | Not NULL |
|------|------|------|------|------|------|
| id |   int: auto-inc   |   X   |      |   X   |   X   |
| brukerid |   int   |      |      |      |   X   |
| adresseid |   int   |      |      |      |   X   |


**Kommentarer**:
Dette er hvordan brukeres lagrede adresser skal lagres i databasen. I utgangspunktet får hver lagrede "favoritt" en egen id, og brukerid og adresseid legges ved som parameter. 

### Relasjoner:
Adresse_bruker kobler sammen tabellene Bruker og Adresse. I stedet for en mange-til-mange relasjon mellom Bruker og Adresse er Adresse_bruker mange-til-en i fht. både Adresse og Bruker. 

## API
### Kartverket
For å hente koordinater til å bruke til regning og framstilling av kart valgte jeg å bruke kartverket sitt api. Jeg valgte dette pga. nøyaktighet* ift. norske adresser, samt at dette er gratis. 

*Det er mulig å få opp feil koordinater pga. like adressenavn, men api- lar det skrive f. eks. 'Bergen' på slutten av søket slik at man får riktig plass. 

Rute: 'https://ws.geonorge.no/adresser/v1/sok?sok=' 

### Openstreetmap med Leaflet
For å vise kart ville jeg å ta i bruk Openstreetmap fordi dette er et gratis verktøy med mye nøyaktig informasjon. 

Jeg kom fram til at for akkurat kart-delen finnes det et gratis js-bibliotek kalt Leaflet, som gjør det mulig å opprette kart ut fra koordinater og såkalte "tiles" som brukes til å tegne kart. Jeg bruker tiles fra openstreetmap. 

[Lenke](https://leafletjs.com)
## Tanker om databehandling og UU
Jeg har i dette prosjektet åpenbart ikke fulgt loven til punkt og prikke angående databehandling. Det er f.eks. foreløpig ikke mulig for en bruker å slette brukeren sin eller hente ut alle dataene sine. Tanken er at dette skal komme på "profil"-siden som ligger i navigasjonsbaren. Likevel har jeg begrenses hvilke data som lagres, og de som lagres har en hensikt. 

I fht. UU er det tatt i bruk semantiske elementer i HTML, og en enkel og oversiktiglig stil på nettsiden, med alt-text på bilder. En svakhet er at tab ikke kan brukes til å navigere navigasjonsbaren. 
