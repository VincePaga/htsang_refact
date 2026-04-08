import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FarmaciItem } from "../../../types/htFarmaci";
import { styles } from "../../../styles/somministrazioneStyles";

type ModalVariaProps = {
  item: FarmaciItem;
  qtaVaria: string;
  motivoVaria: string;
  onChangeQta: (text: string) => void;
  onChangeMotivo: (text: string) => void;
  onConferma: () => void;
  onAnnulla: () => void;
  mostraMessaggio: (titolo: string, testo: string) => void;
};

const SCORCIATOIE = [
  { label: "X2", divisore: 0.5 },
  { label: "1/2", divisore: 2 },
  { label: "1/3", divisore: 3 },
  { label: "1/4", divisore: 4 },
  { label: "1/5", divisore: 5 },
];

export function ModalVaria({
  item, qtaVaria, motivoVaria,
  onChangeQta, onChangeMotivo, onConferma, onAnnulla, mostraMessaggio,
}: ModalVariaProps) {
  const handleConferma = () => {
    if (qtaVaria === "" || motivoVaria === "") {
      mostraMessaggio(
        "ERRORE",
        "La quantita' somministrata e la motivazione della variazione sono obbligatori quindi devono essere compilati.",
      );
      return;
    }
    onConferma();
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalCard, styles.largeModalCard]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle} numberOfLines={2}>
            {item.desart}
          </Text>
          <Text style={styles.modalSubtitle}>Ore: {item.orasom}</Text>
        </View>

        <View style={styles.modalBody}>
          <View style={styles.formRow}>
            <View style={styles.formFieldSmall}>
              <Text style={styles.fieldLabel}>Qta prescritta</Text>
              <TextInput
                style={styles.formInput}
                editable={false}
                value={String(item.qtasom ?? "")}
              />
            </View>

            <View style={styles.formFieldMedium}>
              <Text style={styles.fieldLabel}>Tipo</Text>
              <TextInput
                style={styles.formInput}
                editable={false}
                value={String(item.tipsom ?? "")}
              />
            </View>
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Qta somministrata</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Inserisci quantita"
              placeholderTextColor="#8a99a8"
              value={qtaVaria}
              onChangeText={onChangeQta}
            />
          </View>

          <View style={styles.quickActionsWrap}>
            {SCORCIATOIE.map(({ label, divisore }) => (
              <TouchableOpacity
                key={label}
                style={styles.quickActionBtn}
                activeOpacity={0.85}
                onPress={() => {
                  const val = divisore === 0.5
                    ? (item.qtasom * 2).toFixed(2)
                    : (item.qtasom / divisore).toFixed(2);
                  onChangeQta(val);
                }}
              >
                <Text style={styles.quickActionBtnText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Nota prescrizione</Text>
            <TextInput
              style={[
                styles.formInput,
                styles.multilineInput,
                item.note ? styles.warningInput : null,
              ]}
              editable={false}
              multiline={true}
              value={String(item.desnot ?? "")}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Motivo della variazione</Text>
            <TextInput
              style={[styles.formInput, styles.multilineInput]}
              placeholder="Inserisci il motivo della variazione"
              placeholderTextColor="#8a99a8"
              multiline={true}
              value={motivoVaria}
              onChangeText={onChangeMotivo}
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
