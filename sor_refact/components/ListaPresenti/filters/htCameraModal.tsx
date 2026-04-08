import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { styles } from "../../../styles/presentiStyles";

type CameraModalProps = {
  visible: boolean;
  camere: Array<string | number>;
  selectedCamera: string;
  cameraManuale: string;
  onChangeCameraManuale: (text: string) => void;
  onSelect: (camera: string) => void;
  onClose: () => void;
};

export default function CameraModal({
  visible,
  camere,
  selectedCamera,
  cameraManuale,
  onChangeCameraManuale,
  onSelect,
  onClose,
}: CameraModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.filterModalCardLarge}>
          <Text style={styles.filterModalTitle}>Seleziona camera</Text>

          <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles.filterModalList}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onSelect("*")}
            >
              <View style={styles.filterOptionRow}>
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedCamera === "*" && styles.filterOptionTextActive,
                  ]}
                >
                  Tutte
                </Text>
              </View>
            </TouchableOpacity>

            {camere.map((item) =>
              item != null && item !== 0 ? (
                <TouchableOpacity
                  key={String(item)}
                  activeOpacity={0.5}
                  accessible
                  accessibilityLabel={String(item)}
                  onPress={() => onSelect(String(item))}
                >
                  <View style={styles.filterOptionRow}>
                    <Text
                      style={[
                        styles.filterOptionText,
                        String(selectedCamera) === String(item) &&
                          styles.filterOptionTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null,
            )}
          </ScrollView>

          <View style={styles.manualSection}>
            <Text style={styles.manualSectionTitle}>
              Oppure inserisci la camera manualmente
            </Text>
            <TextInput
              value={cameraManuale}
              onChangeText={onChangeCameraManuale}
              placeholder="Numero camera"
              placeholderTextColor="#8a99a8"
              keyboardType="numeric"
              maxLength={3}
              style={styles.manualInput}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.modalPrimaryButton}
              onPress={() => {
                const trimmed = cameraManuale.trim();
                if (trimmed) onSelect(trimmed);
              }}
            >
              <Text style={styles.modalPrimaryButtonText}>CONFERMA CAMERA</Text>
            </TouchableOpacity>
          </View>

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
