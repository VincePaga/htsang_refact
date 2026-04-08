import { Modal, View, Text, TouchableHighlight, Alert } from "react-native";
import { styles } from "../../../styles/presentiStyles";
import { PazienteItem } from "../../../types/htPaziente";
import { _formato_data } from "../../../utils";

type PazienteDetailModalProps = {
  visible: boolean;
  paziente: PazienteItem | null;
  onClose: () => void;
};

export default function PazienteDetailModal({
  visible,
  paziente,
  onClose,
}: PazienteDetailModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => Alert.alert("Modal has been closed.")}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.filterModalCard}>
          <View style={styles.detailModalContent}>
            <Text>
              Data ricovero:{" "}
              {paziente?.datric
                ? _formato_data(paziente.datric, "yyyy-mm-dd", "dd/mm/yyyy")
                : ""}{" "}
              nomser: {paziente?.nomser ?? ""}
            </Text>
            <Text>
              Piano: {paziente?.repcam} N° Camera: {paziente?.codcam} N° letto:{" "}
              {paziente?.numlet}
            </Text>
          </View>

          <TouchableHighlight style={styles.openButton} onPress={onClose}>
            <Text style={styles.textStyle}>CHIUDI</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}
