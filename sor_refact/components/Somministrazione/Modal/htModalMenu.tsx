import { View, Text, TouchableOpacity } from "react-native";
import { FarmaciItem } from "../../../types/htFarmaci";
import { styles } from "../../../styles/somministrazioneStyles";

type ModalMenuProps = {
  item: FarmaciItem;
  onFatto: () => void;
  onNoSomministrazione: () => void;
  onVaria: () => void;
  onAnnulla: () => void;
  onChiudi: () => void;
};

export function ModalMenu({
  item, onFatto, onNoSomministrazione, onVaria, onAnnulla, onChiudi,
}: ModalMenuProps) {
  return (
    <View style={styles.modalOverlay}>
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1}
        onPress={onChiudi}
      />

      <View style={[styles.modalCard, styles.actionMenuCard]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle} numberOfLines={2}>
            {item.desart ?? ""}
          </Text>
          <Text style={styles.modalSubtitle}>Ore: {item.orasom ?? ""}</Text>
        </View>

        <View style={styles.modalBody}>
          <TouchableOpacity
            style={styles.modalPrimaryButton}
            activeOpacity={0.85}
            onPress={onFatto}
          >
            <Text style={styles.modalPrimaryButtonText}>FATTO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalPrimaryButton}
            activeOpacity={0.85}
            onPress={onNoSomministrazione}
          >
            <Text style={styles.modalPrimaryButtonText}>NO SOMMINISTRAZIONE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalPrimaryButton}
            activeOpacity={0.85}
            onPress={onVaria}
          >
            <Text style={styles.modalPrimaryButtonText}>VARIA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalPrimaryButton}
            activeOpacity={0.85}
            onPress={onAnnulla}
          >
            <Text style={styles.modalPrimaryButtonText}>ANNULLA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalDangerButton}
            activeOpacity={0.85}
            onPress={onChiudi}
          >
            <Text style={styles.modalDangerButtonText}>CHIUDI MENU</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
