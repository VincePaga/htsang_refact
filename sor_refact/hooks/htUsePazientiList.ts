import { useState, useCallback } from "react";
import { PazienteItem } from "../types/htPaziente";
import { fetchListaRicoverati } from "../services/api/htPazientiApi";
import { getServerConfig } from "../services/storage/htAuthStorage";
import { leggiFiltriOperatore, FiltriOperatore } from "../services/storage/htFiltriStorage";

function ordina(lista: PazienteItem[]): PazienteItem[] {
  return [...lista]
    .sort((a, b) => String(a.codcam).localeCompare(String(b.codcam)))
    .sort((a, b) => `${a.cogn} ${a.nome}`.localeCompare(`${b.cogn} ${b.nome}`));
}

export function usePazientiList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [datiIniziali, setDatiIniziali] = useState<PazienteItem[]>([]);
  const [ricoveratiPresenti, setRicoveratiPresenti] = useState<PazienteItem[]>([]);
  const [opecod, setOpecod] = useState("");

  const caricaDati = useCallback(
    async (ipVal: string, portaVal: string, urlVal: string): Promise<PazienteItem[]> => {
      try {
        const lista = await fetchListaRicoverati(ipVal, portaVal, urlVal);
        const ordinata = ordina(lista);
        setDatiIniziali(ordinata);
        setRicoveratiPresenti(ordinata);
        return ordinata;
      } catch {
        setDatiIniziali([]);
        setRicoveratiPresenti([]);
        return [];
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  /*
    inizializza
    -----------
    Da chiamare nel useEffect della screen.
    Restituisce i filtri salvati E i dati caricati, così
    la screen può passare entrambi a ripristinaFiltri senza
    dipendere dallo state (che sarebbe ancora vuoto al momento del .then()).
  */
  const inizializza = useCallback(async (): Promise<{
    filtri: FiltriOperatore | null;
    opecod: string;
    dati: PazienteItem[];
  }> => {
    const server = await getServerConfig();
    const { opecod: cod, filtri } = await leggiFiltriOperatore();
    setOpecod(cod);
    const dati = await caricaDati(server.ip, server.porta, server.url);
    return { filtri, opecod: cod, dati };
  }, [caricaDati]);

  /*
    refresh
    -------
    Pull-to-refresh: ricarica solo i dati dal server,
    senza toccare i filtri salvati.
  */
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    const server = await getServerConfig();
    await caricaDati(server.ip, server.porta, server.url);
  }, [caricaDati]);

  return {
    isLoading,
    isRefreshing,
    datiIniziali,
    ricoveratiPresenti,
    setRicoveratiPresenti,
    opecod,
    inizializza,
    refresh,
  };
}
