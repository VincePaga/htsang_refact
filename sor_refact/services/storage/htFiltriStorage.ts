import AsyncStorage from "@react-native-async-storage/async-storage";

export type ModalitaCard = "breve" | "dettagliata";

export type FiltriOperatore = {
  piano: string;
  camera: string;
  data_ricovero: string;
  dettagli: ModalitaCard;
};

type DatiStorage = {
  opecod: string;
  [opecod: string]: string | FiltriOperatore;
};

/*
  leggiFiltriOperatore
  --------------------
  Legge da AsyncStorage la chiave "dati" e restituisce
  l'opecod e i filtri associati all'operatore.
*/
export async function leggiFiltriOperatore(): Promise<{
  opecod: string;
  filtri: FiltriOperatore | null;
}> {
  try {
    const raw = await AsyncStorage.getItem("dati");
    if (!raw) return { opecod: "", filtri: null };

    const dati: DatiStorage = JSON.parse(raw);
    const opecod = dati.opecod ?? "";
    const filtri = opecod && dati[opecod]
      ? (dati[opecod] as FiltriOperatore)
      : null;

    return { opecod, filtri };
  } catch {
    return { opecod: "", filtri: null };
  }
}

/*
  memorizzaFiltri
  ---------------
  Salva i filtri correnti in AsyncStorage nella chiave "dati",
  associandoli all'operatore (opecod).
*/
export async function memorizzaFiltri(
  opecod: string,
  filtri: FiltriOperatore,
): Promise<void> {
  try {
    const json = JSON.stringify({
      opecod,
      [opecod]: filtri,
    });
    await AsyncStorage.mergeItem("dati", json);
  } catch {
    // errore silenzioso: i filtri non vengono persistiti ma l'app continua
  }
}
