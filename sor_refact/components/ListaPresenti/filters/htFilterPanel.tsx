import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../../../styles/presentiStyles";
import { PazienteItem } from "../../../types/htPaziente";
import PianoModal from "./htPianoModal";
import CameraModal from "./htCameraModal";
import DataPickerModal from "./htDataPickerModal";

type FilterPanelProps = {
  datiIniziali: PazienteItem[];
  selectedPianoLabel: string;
  selectedPiano: string;
  selectedCamera: string;
  dataRicovero: string;
  datapicker: Date;
  showpiano: boolean;
  showcamera: boolean;
  showdataandroid: boolean;
  showdataios: boolean;
  cameraManuale: string;
  onOpenPiano: () => void;
  onOpenCamera: () => void;
  onOpenDate: () => void;
  onResetData: () => void;
  onSelectPiano: (piano: string, label: string) => void;
  onSelectCamera: (camera: string) => void;
  onClosePiano: () => void;
  onCloseCamera: () => void;
  onChangeCameraManuale: (text: string) => void;
  onChangeDatepicker: (event: any, date?: Date) => void;
  onConfermaIos: () => void;
  onAnnullaIos: () => void;
};

export default function FilterPanel({
  datiIniziali,
  selectedPianoLabel,
  selectedPiano,
  selectedCamera,
  dataRicovero,
  datapicker,
  showpiano,
  showcamera,
  showdataandroid,
  showdataios,
  cameraManuale,
  onOpenPiano,
  onOpenCamera,
  onOpenDate,
  onResetData,
  onSelectPiano,
  onSelectCamera,
  onClosePiano,
  onCloseCamera,
  onChangeCameraManuale,
  onChangeDatepicker,
  onConfermaIos,
  onAnnullaIos,
}: FilterPanelProps) {
  const piani = [
    ...new Set(datiIniziali.map((item) => item.repcam)),
  ].sort();

  const camere = [
    ...new Set(datiIniziali.map((item) => item.codcam)),
  ].sort();

  return (
    <View style={styles.filtersWrapper}>
      <View style={styles.filtersWrapperRow}>
        {/* Piano */}
        <TouchableOpacity
          style={styles.filterCard}
          activeOpacity={0.85}
          onPress={onOpenPiano}
        >
          <View style={styles.filterIconBox}>
            <Image
              style={styles.filterIcon}
              source={require("../../../../img/piano.png")}
            />
          </View>
          <View style={styles.filterTextBox}>
            <Text style={styles.filterLabel}>PIANO</Text>
            <Text style={styles.filterValue} numberOfLines={1}>
              {selectedPianoLabel || "Tutti i Piani"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Camera */}
        <TouchableOpacity
          style={styles.filterCard}
          activeOpacity={0.85}
          onPress={onOpenCamera}
        >
          <View style={styles.filterIconBox}>
            <Image
              style={styles.filterIcon}
              source={require("../../../../img/camera.png")}
            />
          </View>
          <View style={styles.filterTextBox}>
            <Text style={styles.filterLabel}>CAMERA</Text>
            <Text style={styles.filterValue} numberOfLines={1}>
              {selectedCamera === "*" ? "Seleziona Camera" : selectedCamera}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Data */}
        <TouchableOpacity
          style={styles.filterCard}
          activeOpacity={0.85}
          onPress={onOpenDate}
        >
          <View style={styles.filterIconBox}>
            <Image
              style={styles.filterIcon}
              source={require("../../../../img/date.png")}
            />
          </View>
          <View style={styles.filterTextBox}>
            <Text style={styles.filterLabel}>DATA RICOVERO</Text>
            <Text style={styles.filterValue} numberOfLines={1}>
              {dataRicovero}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Reset data */}
        <TouchableOpacity
          style={styles.resetDateButton}
          activeOpacity={0.85}
          onPress={onResetData}
        >
          <Text style={styles.resetDateButtonText}>RESET</Text>
        </TouchableOpacity>
      </View>

      <PianoModal
        visible={showpiano}
        piani={piani}
        selectedPiano={selectedPiano}
        onSelect={onSelectPiano}
        onClose={onClosePiano}
      />

      <CameraModal
        visible={showcamera}
        camere={camere}
        selectedCamera={selectedCamera}
        cameraManuale={cameraManuale}
        onChangeCameraManuale={onChangeCameraManuale}
        onSelect={onSelectCamera}
        onClose={onCloseCamera}
      />

      <DataPickerModal
        datapicker={datapicker}
        showAndroid={showdataandroid}
        showIos={showdataios}
        onChange={onChangeDatepicker}
        onConfermaIos={onConfermaIos}
        onAnnullaIos={onAnnullaIos}
      />
    </View>
  );
}
