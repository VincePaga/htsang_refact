import { View, Text, TextInput, TouchableOpacity } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { FarmaciItem } from "../../../types/htFarmaci";
import { radionosom } from "../../../consts/noSomministrazione";
import { styles } from "../../../styles/somministrazioneStyles";

type ModalNoSomProps = {
  item: FarmaciItem;
  valueNoSom: string;
  valueIndexNoSom: number;
  motivazioneNoSom: string;
  onChangeRadio: (value: string, index: number) => void;
  onChangeMotivazione: (text: string) => void;
  onConferma: () => void;
  onAnnulla: () => void;
  mostraMessaggio: (titolo: string, testo: string) => void;
};

export function ModalNoSomministrazione({
  item, valueNoSom, valueIndexNoSom, motivazioneNoSom,
  onChangeRadio, onChangeMotivazione, onConferma, onAnnulla, mostraMessaggio,
}: ModalNoSomProps) {
  const handleConferma = () => {
    if (valueNoSom === "" || motivazioneNoSom === "") {
      mostraMessaggio(
        "ERRORE",
        "Tutti i campi sono obbligatori quindi devono essere compilati.",
      );
      return;
    }
    onConferma();
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalCard, styles.mediumModalCard]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle} numberOfLines={2}>
            {item.desart}
          </Text>
          <Text style={styles.modalSubtitle}>Ore: {item.orasom}</Text>
        </View>

        <View style={styles.modalBody}>
          <View style={styles.radioSection}>
            <RadioForm
              radio_props={radionosom}
              initial={valueIndexNoSom}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor="#2981ba"
              labelColor="#0f1b2d"
              animation={true}
              onPress={(value: string, index: number) => onChangeRadio(value, index)}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Motivazione</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Inserisci motivazione..."
              placeholderTextColor="#8a99a8"
              value={motivazioneNoSom}
              onChangeText={onChangeMotivazione}
            />
          </View>

          <View style={styles.modalActionsRow}>
            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalHalfButton]}
              activeOpacity={0.85}
              onPress={handleConferma}
            >
              <Text style={styles.modalPrimaryButtonText}>CONFERMA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalSecondaryButton, styles.modalHalfButton]}
              activeOpacity={0.85}
              onPress={onAnnulla}
            >
              <Text style={styles.modalSecondaryButtonText}>ANNULLA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
