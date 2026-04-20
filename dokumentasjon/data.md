# Data (Database, API osv.)

## Databasen

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
Passord må krypteres/hashes, jeg har ikke undersøkt hvordan jeg vil gjøre dette enda. Mail vil brukes til å logge inn, mobil er derfor ikke obligatorisk, og tanken er at begge skal kunne brukes til å sende varslinger. 

### Adresse:
| Navn | Datatype | PK | FK | Unik | Not NULL |
|------|------|------|------|------|------|
| adresse |   text   |   X   |      |      |   X   |
| postnummer |   text   |   X   |   X   |      |   X   |

**Kommentarer**:
Fordi gatenavn kan gå igjen, kan det være nødvendig å også ha postnummer for å finne fram til riktig plass. Jeg vil forsøke å lage søkemotoren på et vis som gjør at bruker slipper å finne postnummer selv. Et annet alternativ er å lage en unik id for hver adresse. Postnummer er en FK, men ligger ikke som en FK i databasen, det er fordi jeg ikke hadde en entitet å referere til. 

### Adresse_bruker:
| Navn | Datatype | PK | FK | Unik | Not NULL |
|------|------|------|------|------|------|
| id |   int: auto-inc   |   X   |      |   X   |   X   |
| brukerid |   int   |      |   X   |      |   X   |
| adresse |   text   |      |   X   |      |   X   |
| postnummer |   text   |      |   X   |      |   X   |

**Kommentarer**:
Jeg ser for meg at denne entiteten må endres senere, men er enkelt forklart hvordan en brukers lagrede adresser skal ligge i databasen. Jeg må ha både adresse og postnummer på grunn av den sammensatte primærnøkkelen i adresse-entiteten. 

## API
### Kartverket
For å hente koordinater til å bruke til regning og framstilling av kart valgte jeg å bruke kartverket sitt api. Jeg valgte dette pga. nøyaktighet* ift. norske adresser, samt at dette er gratis. 

*Det er mulig å få opp feil koordinater pga. like adressenavn, men api- lar det skrive f. eks. 'Bergen' på slutten av søket slik at man får riktig plass. 

Rute: 'https://ws.geonorge.no/adresser/v1/sok?sok=' 

### Openstreetmap med Leaflet

## Ruter
