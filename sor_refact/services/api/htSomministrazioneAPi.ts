import { buildBaseUrl } from "../htBuildUrl";
import { FarmaciItem } from "../../types/htFarmaci";

export async function fetchListaSomministrazione(
  ip: string,
  porta: string,
  url: string,
  nureri: number | string,
): Promise<FarmaciItem[]> {
  const indirizzo = buildBaseUrl(ip, porta, url);
  const param = JSON.stringify({ nureri });
  const response = await fetch(`${indirizzo}/lista_farmaci_paziente?${param}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

type AzioneSomministrazione = "fatto" | "nosomministrazione" | "varia" | "annulla";

type InvioParams = {
  azione: AzioneSomministrazione;
  itemSelezionato: FarmaciItem;
  listaFarmaci: FarmaciItem[];
  opecod: string;
  valueNoSom?: string;
  motivazioneNoSom?: string;
  qtaVaria?: string;
  motivoVaria?: string;
};

type InvioResult = { result: string; errmsg?: string };

/*
  invioSomministrazione
  ---------------------
  Costruisce il payload JSON per il backend e invia l'azione
  di somministrazione (fatto, no somministrazione, varia, annulla).
*/
export async function invioSomministrazione(
  ip: string,
  porta: string,
  url: string,
  params: InvioParams,
): Promise<InvioResult> {
  const {
    azione, itemSelezionato, listaFarmaci, opecod,
    valueNoSom = "", motivazioneNoSom = "",
    qtaVaria = "", motivoVaria = "",
  } = params;

  let tipmov = "";
  let radionosom = "";
  let motivazione = "";
  let qtaSom: number | string = itemSelezionato.qtasom;

  switch (azione) {
    case "fatto":
      tipmov = "F";
      break;
    case "nosomministrazione":
      tipmov = "N";
      radionosom = valueNoSom;
      motivazione = motivazioneNoSom;
      break;
    case "varia":
      tipmov = "V";
      qtaSom = qtaVaria;
      motivazione = motivoVaria;
      break;
    case "annulla":
      tipmov = "X";
      break;
  }

  // Filtra i farmaci dello stesso gruppo (stesso nurevt + orasom)
  const gruppo = listaFarmaci.filter(
    (f) => f.nurevt === itemSelezionato.nurevt && f.orasom === itemSelezionato.orasom,
  );

  // Costruisce l'array di oggetti per il backend
  const payload = gruppo.map((f) => ({
    tipmov,
    opecod,
    testsomm: f.testsomm ?? "",
    farpaz: f.farpaz ?? "",
    nureri: f.nureri ?? "",
    nurevt: f.nurevt ?? "",
    numrig: f.numrig ?? "",
    nurevs: f.nurevs ?? "",
    nuremm: f.nuremm,
    nurkap: f.nurkap ?? "",
    codpre: f.codpre ?? "",
    coddep: f.coddep ?? "",
    codart: f.codart ?? "",
    desart: f.desart ?? "",
    datsom: f.datsom ?? "",
    orasom: f.orasom ?? "",
    qtasom: qtaSom ?? "",
    datlot: f.datlot ?? "",
    annlot: f.annlot ?? "",
    meslot: f.meslot ?? "",
    numlot: f.numlot ?? "",
    nummat: f.nummat ?? "",
    rifiuto: radionosom,
    desnote: motivazione,
  }));

  const indirizzo = buildBaseUrl(ip, porta, url);
  const paramStr = encodeURIComponent(`?${JSON.stringify(payload)}`);
  const response = await fetch(`${indirizzo}/somministra_terapia_farmaci${paramStr}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
