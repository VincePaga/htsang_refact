import { useState, useCallback } from "react";
import { Keyboard, Platform } from "react-native";
import { PazienteItem } from "../types/htPaziente";
import { _formato_data, _Scritta_Piano } from "../utils";
import {
  FiltriOperatore,
  ModalitaCard,
  memorizzaFiltri,
} from "../services/storage/htFiltriStorage";

function toDate(valore: string): Date | null {
  if (!valore || valore === "Data Ricovero") return null;
  if (valore.includes("/")) {
    const [g, m, a] = valore.split("/");
    return new Date(`${a}-${m}-${g}`);
  }
  if (valore.includes("-")) return new Date(valore);
  return null;
}

function applicaFiltri(
  lista: PazienteItem[],
  piano: string,
  dataRicovero: string,
  camera: string,
): PazienteItem[] {
  const dataCercata = toDate(dataRicovero);

  const risultato = lista.filter((item) => {
    const pianoOk = piano === "*" || item.repcam === piano;
    const dataOk =
      dataRicovero === "Data Ricovero" ||
      dataCercata === null ||
      (toDate(item.datric) ?? new Date(0)) >= dataCercata;
    const cameraOk =
      camera === "*" || String(item.codcam) === String(camera);
    return pianoOk && dataOk && cameraOk;
  });

  return risultato.sort(
    (a, b) => (toDate(a.datric) ?? new Date(0)).getTime() -
              (toDate(b.datric) ?? new Date(0)).getTime(),
  );
}

type UseFiltriParams = {
  datiIniziali: PazienteItem[];
  opecod: string;
  onFiltrati: (lista: PazienteItem[]) => void;
};

export function useFiltri({ datiIniziali, opecod, onFiltrati }: UseFiltriParams) {
  const [selectedPiano, setSelectedPiano] = useState("*");
  const [selectedPianoLabel, setSelectedPianoLabel] = useState("Seleziona un Piano");
  const [selectedCamera, setSelectedCamera] = useState("*");
  const [dataRicovero, setDataRicovero] = useState("Data Ricovero");
  const [datapicker, setDatepicker] = useState<Date>(new Date());
  const [modalitaCard, setModalitaCard] = useState<ModalitaCard>("breve");

  const [showpiano, setShowpiano] = useState(false);
  const [showcamera, setShowcamera] = useState(false);
  const [showdataandroid, setShowdataandroid] = useState(false);
  const [showdataios, setShowdataios] = useState(false);
  const [cameraManuale, setCameraManuale] = useState("");

  const filtraEPersisti = useCallback(
    (piano: string, data: string, camera: string, modalita: ModalitaCard) => {
      const lista = applicaFiltri(datiIniziali, piano, data, camera);
      onFiltrati(lista);

      const dataPerStorage =
        data !== "Data Ricovero"
          ? _formato_data(data, "yyyy-mm-dd", "dd/mm/yyyy")
          : "Data Ricovero";

      memorizzaFiltri(opecod, {
        piano,
        camera,
        data_ricovero: dataPerStorage,
        dettagli: modalita,
      });
    },
    [datiIniziali, opecod, onFiltrati],
  );

  /*
    ripristinaFiltri
    ----------------
    Riceve i dati già caricati direttamente invece di leggerli
    dallo state (che sarebbe ancora vuoto al momento della chiamata).
  */
  const ripristinaFiltri = useCallback(
    (filtri: FiltriOperatore, dati: PazienteItem[]) => {
      const piano = filtri.piano || "*";
      const camera = filtri.camera || "*";
      const data = filtri.data_ricovero || "Data Ricovero";
      const modalita = filtri.dettagli === "dettagliata" ? "dettagliata" : "breve";

      setSelectedPiano(piano);
      setSelectedCamera(camera);
      setDataRicovero(data);
      setModalitaCard(modalita);
      setSelectedPianoLabel(
        piano === "*" || !piano ? "Tutti" : _Scritta_Piano(piano),
      );

      const dataISO =
        data !== "Data Ricovero"
          ? _formato_data(data, "dd/mm/yyyy", "yyyy-mm-dd")
          : "Data Ricovero";

      onFiltrati(applicaFiltri(dati, piano, dataISO, camera));
    },
    [onFiltrati],
  );

  const cambiaPiano = useCallback(
    (piano: string, label: string) => {
      setSelectedPiano(piano);
      setSelectedPianoLabel(label);
      setShowpiano(false);

      const dataISO =
        dataRicovero !== "Data Ricovero"
          ? _formato_data(dataRicovero, "dd/mm/yyyy", "yyyy-mm-dd")
          : "Data Ricovero";

      filtraEPersisti(piano, dataISO, selectedCamera, modalitaCard);
    },
    [dataRicovero, selectedCamera, modalitaCard, filtraEPersisti],
  );

  const cambiaCamera = useCallback(
    (camera: string) => {
      setSelectedCamera(camera);
      setShowcamera(false);
      setCameraManuale("");

      const dataISO =
        dataRicovero !== "Data Ricovero"
          ? _formato_data(dataRicovero, "dd/mm/yyyy", "yyyy-mm-dd")
          : "Data Ricovero";

      filtraEPersisti(selectedPiano, dataISO, camera, modalitaCard);
    },
    [dataRicovero, selectedPiano, modalitaCard, filtraEPersisti],
  );

  const confermaData = useCallback(
    (data: Date) => {
      const dataFormattata = _formato_data(data, "", "dd/mm/yyyy");
      const dataISO = _formato_data(data, "", "yyyy-mm-dd");
      setDataRicovero(dataFormattata);
      filtraEPersisti(selectedPiano, dataISO, selectedCamera, modalitaCard);
    },
    [selectedPiano, selectedCamera, modalitaCard, filtraEPersisti],
  );

  const resetData = useCallback(() => {
    setDataRicovero("Data Ricovero");
    filtraEPersisti(selectedPiano, "Data Ricovero", selectedCamera, modalitaCard);
  }, [selectedPiano, selectedCamera, modalitaCard, filtraEPersisti]);

  const apriDatepicker = useCallback(() => {
    Keyboard.dismiss();
    const datainiziale =
      dataRicovero && dataRicovero !== "Data Ricovero"
        ? _formato_data(dataRicovero, "dd/mm/yyyy", "", "s")
        : new Date();
    setDatepicker(datainiziale);
    if (Platform.OS === "android") setShowdataandroid(true);
    if (Platform.OS === "ios") setShowdataios(true);
  }, [dataRicovero]);

  const onChangeDatepicker = useCallback(
    (event: any, selectedDate?: Date) => {
      if (Platform.OS === "android") {
        setShowdataandroid(false);
        if (event.type === "set" && selectedDate) confermaData(selectedDate);
      }
      if (Platform.OS === "ios" && selectedDate) setDatepicker(selectedDate);
    },
    [confermaData],
  );

  const confermaDataIos = useCallback(() => {
    setShowdataios(false);
    confermaData(datapicker);
  }, [datapicker, confermaData]);

  const cambiaModalita = useCallback(
    (modalita: ModalitaCard) => {
      setModalitaCard(modalita);
      memorizzaFiltri(opecod, {
        piano: selectedPiano,
        camera: selectedCamera,
        data_ricovero:
          dataRicovero !== "Data Ricovero" ? dataRicovero : "Data Ricovero",
        dettagli: modalita,
      });
    },
    [dataRicovero, selectedPiano, selectedCamera, opecod],
  );

  return {
    selectedPiano,
    selectedPianoLabel,
    selectedCamera,
    dataRicovero,
    datapicker,
    modalitaCard,
    showpiano, setShowpiano,
    showcamera, setShowcamera,
    showdataandroid,
    showdataios, setShowdataios,
    cameraManuale, setCameraManuale,
    cambiaPiano,
    cambiaCamera,
    resetData,
    apriDatepicker,
    onChangeDatepicker,
    confermaDataIos,
    cambiaModalita,
    ripristinaFiltri,
  };
}
