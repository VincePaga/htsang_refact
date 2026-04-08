import { View, Text, TouchableOpacity } from "react-native";
import { FarmaciItem } from "../../../types/htFarmaci";
import { styles } from "../../../styles/somministrazioneStyles";

type ModalAnnullaProps = {
  item: FarmaciItem;
  onConferma: () => void;
  onAnnulla: () => void;
};

export function ModalAnnulla({ item, onConferma, onAnnulla }: ModalAnnullaProps) {
  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalCard, styles.messageModalCard]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle} numberOfLines={2}>
            {item.desart}
          </Text>
          <Text style={styles.modalSubtitle}>Ore: {item.orasom}</Text>
        </View>

        <View style={styles.modalBody}>
          <Text style={styles.confirmationText}>
            Vuoi Cancellare la Somministrazione?
          </Text>

          <View style={styles.modalActionsRow}>
            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalHalfButton]}
              activeOpacity={0.85}
              onPress={onConferma}
            >
              <Text style={styles.modalPrimaryButtonText}>SI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalSecondaryButton, styles.modalHalfButton]}
              activeOpacity={0.85}
              onPress={onAnnulla}
            >
              <Text style={styles.modalSecondaryButtonText}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
