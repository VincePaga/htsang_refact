import { View, Text, TouchableHighlight, TouchableOpacity, Image, InteractionManager } from "react-native";
import { styles } from "../../../styles/presentiStyles";
import { ModalitaCard } from "../../../services/storage/htFiltriStorage";

type TopBarProps = {
  showfilter: boolean;
  conteggiopazienti: number;
  modalitaCard: ModalitaCard;
  onToggleFilter: () => void;
  onCambiaModalita: (modalita: ModalitaCard) => void;
  onIsChangingMode: (val: boolean) => void;
};

export default function TopBar({
  showfilter,
  conteggiopazienti,
  modalitaCard,
  onToggleFilter,
  onCambiaModalita,
  onIsChangingMode,
}: TopBarProps) {
  function cambiaModalitaConDelay(modalita: ModalitaCard) {
    onIsChangingMode(true);
    InteractionManager.runAfterInteractions({
      name: "cambiaModalita",
      gen: () =>
        new Promise<void>((resolve) => {
          onCambiaModalita(modalita);
          onIsChangingMode(false);
          resolve();
        }),
    });
  }

  return (
    <View style={styles.topBar}>
      <TouchableHighlight
        style={styles.filterToggleButton}
        underlayColor="transparent"
        onPress={onToggleFilter}
      >
        <View style={styles.filterToggleInner}>
          <Image
            style={styles.filterToggleIcon}
            source={
              showfilter
                ? require("../../../../img/filtro_show_on.png")
                : require("../../../../img/filtro_show_off.png")
            }
          />
          <View style={styles.filterToggleLabelBox}>
            <Text allowFontScaling style={styles.filterToggleLabel}>
              Filtri
            </Text>
          </View>
        </View>
      </TouchableHighlight>

      <View style={styles.patientCountWrapper}>
        <Text style={styles.patientCountText}>
          N° Pazienti: {conteggiopazienti}
        </Text>
      </View>

      <View style={styles.viewModeWrapper}>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            modalitaCard === "breve" && styles.viewModeButtonActive,
          ]}
          onPress={() => cambiaModalitaConDelay("breve")}
        >
          <Text style={styles.viewModeButtonText}>Breve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.viewModeButton,
            modalitaCard === "dettagliata" && styles.viewModeButtonActive,
          ]}
          onPress={() => cambiaModalitaConDelay("dettagliata")}
        >
          <Text style={styles.viewModeButtonText}>Dettagliata</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
