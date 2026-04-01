/*
  _Scritta_Piano
  --------------
  Converte un codice piano (es. "1P", "2P") in una descrizione leggibile
  da mostrare nell'interfaccia utente.
*/

export function _Scritta_Piano(valore: string ) {
    let piano;

    // Switch sul codice piano
    switch(valore) {

        case "1P":
            piano = "Primo Piano";
            break;

        case "2P":
            piano = "Secondo Piano";
            break;

        case "3P":
            piano = "Terzo Piano";
            break;

        case "4P":
            piano = "Quarto Piano";
            break;

        case "5P":
            piano = "Quinto Piano";
            break;

        case "6P":
            piano = "Sesto Piano";
            break;

        case "7P":
            piano = "Settimo Piano";
            break;

        case "8P":
            piano = "Ottavo Piano";
            break;

        case "9P":
            piano = "Nono Piano";
            break;

        case "10P":
            piano = "Decimo Piano";
            break;

        // Se il valore non è tra quelli previsti
        // restituisce il valore originale
        default:
            piano = valore;
            break;
    }

    return piano;
}

