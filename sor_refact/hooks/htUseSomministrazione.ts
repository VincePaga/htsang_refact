import { useState, useCallback } from "react";
import { FarmaciItem } from "../types/htFarmaci";
import { fetchListaSomministrazione, invioSomministrazione } from "../services/api/htSomministrazioneAPi";
import { getServerConfig } from "../services/storage/htAuthStorage";
import { leggiFiltriOperatore } from "../services/storage/htFiltriStorage";
import { _ora } from "../utils/htDateTimeUtils";

type Turno = "*" | "1T" | "2T" | "3T";

type TurnoInfo = {
  codice: Turno;
  label: string;
};

/*
  turnoAutomatico
  ---------------
  In base all'ora corrente restituisce il turno:
  07:00 - 13:59 → Mattina
  14:00 - 20:59 → Pomeriggio
  21:00 - 06:59 → Notte
*/
function turnoAutomatico(orario: string): TurnoInfo {
  if (orario >= "07:00" && orario <= "13:59") return { codice: "1T", label: "Mattina" };
  if (orario >= "14:00" && orario <= "20:59") return { codice: "2T", label: "Pomeriggio" };
  if (orario >= "21:00" || orario <= "06:59") return { codice: "3T", label: "Notte" };
  return { codice: "*", label: "Tutti" };
}

/*
  filtraPerTurno
  --------------
  Filtra la lista farmaci in base al turno selezionato.
*/
function filtraPerTurno(lista: FarmaciItem[], turno: Turno): FarmaciItem[] {
  if (turno === "*") return lista;

  return lista.filter((x) => {
    const ora = x.orasom;
    if (!ora || ora.trim() === "") return true; // senza orario: sempre visibile

    switch (turno) {
      case "1T": return ora >= "07:00" && ora <= "13:59";
      case "2T": return ora >= "14:00" && ora <= "20:59";
      case "3T": return ora >= "21:00" || ora <= "06:59";
      default: return true;
    }
  });
}

export function useSomministrazione() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [datiIniziali, setDatiIniziali] = useState<FarmaciItem[]>([]);
  const [somministrazione, setSomministrazione] = useState<FarmaciItem[]>([]);

  const [modalmenu, setModalmenu] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const [itemSelezionato, setItemSelezionato] = useState<FarmaciItem | null>(null);

  const [modalNoSom, setModalNoSom] = useState(false);
  const [valueNoSom, setValueNoSom] = useState("");
  const [valueIndexNoSom, setValueIndexNoSom] = useState(-1);
  const [motivazioneNoSom, setMotivazioneNoSom] = useState("");

  const [modalVaria, setModalVaria] = useState(false);
  const [qtaVaria, setQtaVaria] = useState("");
  const [motivoVaria, setMotivoVaria] = useState("");

  const [modalAnnulla, setModalAnnulla] = useState(false);

  const [opecod, setOpecod] = useState("");

  const [selectedTurno, setSelectedTurno] = useState<Turno>("*");
  const [selectedTurnoLabel, setSelectedTurnoLabel] = useState("Seleziona un Turno");
  const [showTurno, setShowTurno] = useState(false);

  const [modalMessaggio, setModalMessaggio] = useState(false);
  const [titoloMessaggio, setTitoloMessaggio] = useState("");
  const [messaggio, setMessaggio] = useState("");

  // ip/porta/url servono per inviaSomministrazione, li teniamo in ref-like state
  const [serverIp, setServerIp] = useState("");
  const [serverPorta, setServerPorta] = useState("");
  const [serverUrl, setServerUrl] = useState("");

  const mostraMessaggio = useCallback((titolo: string, testo: string) => {
    setTitoloMessaggio(titolo);
    setMessaggio(testo);
    setModalMessaggio(true);
  }, []);

  /*
    cambiaTurno
    -----------
    Aggiorna il turno selezionato e filtra i dati.
  */
  const cambiaTurno = useCallback((turno: Turno, label: string, dati?: FarmaciItem[]) => {
    setSelectedTurno(turno);
    setSelectedTurnoLabel(label);
    setShowTurno(false);
    const lista = dati ?? datiIniziali;
    setSomministrazione(filtraPerTurno(lista, turno));
  }, [datiIniziali]);

  /*
    caricaDati
    ----------
    Chiama il backend per ottenere i farmaci del paziente.
    Ordina per orasom e applica il turno automatico al primo caricamento.
  */
  const caricaDati = useCallback(async (
    ipVal: string, portaVal: string, urlVal: string, nureri: number | string,
  ) => {
    try {
      const lista = await fetchListaSomministrazione(ipVal, portaVal, urlVal, nureri);
      lista.sort((a, b) => String(a.orasom).localeCompare(String(b.orasom)));
      setDatiIniziali(lista);

      // Primo caricamento: seleziona turno automatico
      if (selectedTurnoLabel === "Seleziona un Turno") {
        const ora = _ora();
        const { codice, label } = turnoAutomatico(ora);
        setSelectedTurno(codice);
        setSelectedTurnoLabel(label);
        setSomministrazione(filtraPerTurno(lista, codice));
      } else {
        setSomministrazione(filtraPerTurno(lista, selectedTurno));
      }
    } catch {
      setDatiIniziali([]);
      setSomministrazione([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedTurno, selectedTurnoLabel]);

  /*
    inizializza
    -----------
    Legge la config server e l'opecod, poi carica i farmaci.
  */
  const inizializza = useCallback(async (nureri: number | string) => {
    const server = await getServerConfig();
    setServerIp(server.ip);
    setServerPorta(server.porta);
    setServerUrl(server.url);

    const { opecod: cod } = await leggiFiltriOperatore();
    setOpecod(cod);

    await caricaDati(server.ip, server.porta, server.url, nureri);
  }, [caricaDati]);

  /*
    refresh
    -------
    Pull-to-refresh: ricarica i farmaci dal server.
  */
  const refresh = useCallback(async (nureri: number | string) => {
    setIsRefreshing(true);
    const server = await getServerConfig();
    await caricaDati(server.ip, server.porta, server.url, nureri);
  }, [caricaDati]);

  /*
    inviaSomministrazione
    ---------------------
    Valida l'azione e la invia al backend.
    In caso di successo ricarica i dati; in caso di errore mostra messaggio.
  */
  const inviaSomministrazione = useCallback(async (
    azione: "fatto" | "nosomministrazione" | "varia" | "annulla",
    nureri: number | string,
  ) => {
    if (!itemSelezionato) return;

    try {
      const result = await invioSomministrazione(serverIp, serverPorta, serverUrl, {
        azione,
        itemSelezionato,
        listaFarmaci: somministrazione,
        opecod,
        valueNoSom,
        motivazioneNoSom,
        qtaVaria,
        motivoVaria,
      });

      if (result.result === "KO") {
        mostraMessaggio("ERRORE", result.errmsg ?? "Errore sconosciuto");
      } else {
        setIsRefreshing(true);
        await refresh(nureri);
      }
    } catch (error) {
      mostraMessaggio("ERRORE", String(error));
    }
  }, [
    itemSelezionato, somministrazione, opecod,
    valueNoSom, motivazioneNoSom, qtaVaria, motivoVaria,
    serverIp, serverPorta, serverUrl, mostraMessaggio, refresh,
  ]);

  /*
    Helpers per le modali: controllano numrig prima di aprire
  */
  const apriNoSomministrazione = useCallback(() => {
    if (!itemSelezionato) return;
    if (itemSelezionato.numrig !== 0) {
      mostraMessaggio("ATTENZIONE", "Premere No Somministrazione sulla riga del farmaco principale");
      setModalmenu(false);
      return;
    }
    setModalmenu(false);
    setModalNoSom(true);
    setValueNoSom("");
    setValueIndexNoSom(-1);
    setMotivazioneNoSom("");
  }, [itemSelezionato, mostraMessaggio]);

  const apriFatto = useCallback(() => {
    if (!itemSelezionato) return;
    if (itemSelezionato.numrig !== 0) {
      mostraMessaggio("ATTENZIONE", "Premere Fatto sulla riga del farmaco principale");
      setModalmenu(false);
      return;
    }
    setModalmenu(false);
    return "fatto" as const;
  }, [itemSelezionato, mostraMessaggio]);

  const apriVaria = useCallback(() => {
    if (!itemSelezionato) return;
    if (itemSelezionato.numrig !== 0) {
      mostraMessaggio("ATTENZIONE", "Premere Varia sulla riga del farmaco principale");
      setModalmenu(false);
      return;
    }
    setModalmenu(false);
    setModalVaria(true);
    setQtaVaria("");
    setMotivoVaria("");
  }, [itemSelezionato, mostraMessaggio]);

  const apriAnnulla = useCallback(() => {
    if (!itemSelezionato) return;
    if (itemSelezionato.nurevs === 0) {
      mostraMessaggio("ATTENZIONE", "Non ci sono dati da cancellare");
      setModalmenu(false);
      return;
    }
    setModalmenu(false);
    setModalAnnulla(true);
  }, [itemSelezionato, mostraMessaggio]);

  return {
    // stato lista
    isLoading,
    isRefreshing,
    somministrazione,
    datiIniziali,

    // item selezionato
    itemSelezionato,
    setItemSelezionato,
    modalmenu,
    setModalmenu,
    menuTop,
    setMenuTop,

    // modale no somministrazione
    modalNoSom,
    setModalNoSom,
    valueNoSom,
    setValueNoSom,
    valueIndexNoSom,
    setValueIndexNoSom,
    motivazioneNoSom,
    setMotivazioneNoSom,

    // modale varia
    modalVaria,
    setModalVaria,
    qtaVaria,
    setQtaVaria,
    motivoVaria,
    setMotivoVaria,

    // modale annulla
    modalAnnulla,
    setModalAnnulla,

    // turno
    selectedTurno,
    selectedTurnoLabel,
    showTurno,
    setShowTurno,
    cambiaTurno,

    // messaggi
    modalMessaggio,
    setModalMessaggio,
    titoloMessaggio,
    messaggio,
    mostraMessaggio,

    // azioni
    inizializza,
    refresh,
    inviaSomministrazione,
    apriFatto,
    apriNoSomministrazione,
    apriVaria,
    apriAnnulla,
  };
}
