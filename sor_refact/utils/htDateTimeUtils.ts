type DateInputFormat = '' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'yyyy-m-d';
type DateOutputFormat = '' | 'dd/mm/yyyy' | 'yyyy-mm-dd';
type DateInputKind = '' | 's';

/*
  _formato_data

  Serve per:
  - ottenere la data corrente
  - convertire una stringa data in oggetto Date
  - convertire una data tra diversi formati
*/

export function _formato_data(data: string | Date, formatoin: DateInputFormat, formatoout: 'dd/mm/yyyy' | 'yyyy-mm-dd', tipo?: DateInputKind): string;
export function _formato_data(data: string | Date, formatoin?: DateInputFormat, formatoout?: '', tipo?: DateInputKind): Date;
export function _formato_data(
  data: string | Date,
  formatoin: DateInputFormat = '',
  formatoout: DateOutputFormat = '',
  tipo: DateInputKind = '',
): Date | string {
  let valore: Date;

  // Se non viene passata una data usa la data corrente.
  if (data === '') {
    valore = new Date();
  } else if (tipo === 's' && typeof data === 'string') {
    let giorno = 1;
    let mese = 1;
    let anno = 1970;

    // Parsing formato italiano
    // es: 15/03/2026
    if (formatoin === 'dd/mm/yyyy') {
      giorno = Number(data.slice(0, 2));
      mese = Number(data.slice(3, 5));
      anno = Number(data.slice(6, 10));
    }

    // Parsing formato ISO
    // es: 2026-03-15
    if (formatoin === 'yyyy-mm-dd') {
      anno = Number(data.slice(0, 4));
      mese = Number(data.slice(5, 7));
      giorno = Number(data.slice(8, 10));
    }

    // Parsing formato ISO senza zeri
    // es: 2026-3-5
    if (formatoin === 'yyyy-m-d') {
      const [annoRaw, meseRaw, giornoRaw] = data.split('-');
      anno = Number(annoRaw);
      mese = Number(meseRaw);
      giorno = Number(giornoRaw);
    }

    valore = new Date(anno, mese - 1, giorno);
  } else {
    // Se non è stringa, assume che sia già un oggetto Date.
    valore = data instanceof Date ? data : new Date(data);
  }

  /*
    Se non viene richiesto un formato di output,
    restituisce direttamente l'oggetto Date
  */
  if (formatoout === '') {
    return valore;
  }

  // Estraggo giorno, mese e anno
  const gg = `0${valore.getDate()}`;
  const mm = `0${valore.getMonth() + 1}`;
  const yyyy = valore.getFullYear();

  /*
    Conversione in formato italiano
    es: 15/03/2026
  */
  if (formatoout === 'dd/mm/yyyy') {
    return `${gg.slice(-2)}/${mm.slice(-2)}/${yyyy}`;
  }

  /*
    Conversione in formato ISO
    es: 2026-03-15
  */
  return `${yyyy}-${mm.slice(-2)}-${gg.slice(-2)}`;
}

/*
  _ora
  ----
  Restituisce l'ora corrente nel formato HH:mm
*/

export function _ora(): string {
  const valore = new Date();

  // Ore
  const hh = `0${valore.getHours()}`;

  // Minuti
  const mm = `0${valore.getMinutes()}`;

  return `${hh.slice(-2)}:${mm.slice(-2)}`;
}

/*
  _anni
  -----
  Calcola l'età di una persona a partire dalla data di nascita.
*/

export function _anni(valore: string): number {
  // Data corrente
  const oggi = _formato_data('', '', '') as Date;

  // Data di nascita convertita in oggetto Date
  const nascita = _formato_data(valore, 'yyyy-mm-dd', '', 's') as Date;

  // Differenza iniziale tra anni
  let eta = oggi.getFullYear() - nascita.getFullYear();

  /*
    Controllo se il compleanno è già passato quest'anno
    Se non è ancora passato, sottraggo 1 anno
  */
  if (
    oggi.getMonth() < nascita.getMonth() ||
    (oggi.getMonth() === nascita.getMonth() &&
      oggi.getDate() < nascita.getDate())
  ) {
    eta--;
  }

  return eta;
}

