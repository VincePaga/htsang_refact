import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../../../styles/presentiStyles";
import { _Scritta_Piano } from "../../../utils";

type PianoModalProps = {
  visible: boolean;
  piani: string[];
  selectedPiano: string;
  onSelect: (piano: string, label: string) => void;
  onClose: () => void;
};

export default function PianoModal({
  visible,
  piani,
  selectedPiano,
  onSelect,
  onClose,
}: PianoModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.filterModalCard}>
          <Text style={styles.filterModalTitle}>Seleziona piano</Text>

          <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles.filterModalList}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onSelect("*", "Tutti i Piani")}
            >
              <View style={styles.filterOptionRow}>
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedPiano === "*" && styles.filterOptionTextActive,
                  ]}
                >
                  Tutti i Piani
                </Text>
              </View>
            </TouchableOpacity>

            {piani.map((item) =>
              item != null && item !== "0" ? (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.5}
                  accessible
                  accessibilityLabel={item}
                  onPress={() => onSelect(item, _Scritta_Piano(item))}
                >
                  <View style={styles.filterOptionRow}>
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedPiano === item && styles.filterOptionTextActive,
                      ]}
                    >
                      {_Scritta_Piano(item)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null,
            )}
          </ScrollView>

          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={styles.modalSecondaryButton}
          >
            <Text style={styles.modalSecondaryButtonText}>ANNULLA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
