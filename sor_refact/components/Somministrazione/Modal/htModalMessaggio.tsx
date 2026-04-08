import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "../../../styles/somministrazioneStyles";

type ModalMessaggioProps = {
  visible: boolean;
  titolo: string;
  messaggio: string;
  onChiudi: () => void;
};

export function ModalMessaggio({ visible, titolo, messaggio, onChiudi }: ModalMessaggioProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onChiudi}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, styles.messageModalCard]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitleCentered}>{titolo}</Text>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.messageText}>{messaggio}</Text>

            <TouchableOpacity
              style={styles.modalPrimaryButton}
              activeOpacity={0.85}
              onPress={onChiudi}
            >
              <Text style={styles.modalPrimaryButtonText}>CHIUDI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
