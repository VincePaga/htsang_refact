import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { Intestazione } from "./htIntestazioneScreen";
import { useSomministrazione } from "../hooks/htUseSomministrazione";
import { ModalMenu } from "../components/Somministrazione/Modal/htModalMenu";
import { ModalNoSomministrazione } from "../components/Somministrazione/Modal/htModalSomministrazione";
import { ModalVaria } from "../components/Somministrazione/Modal/htModalVaria";
import { ModalAnnulla } from "../components/Somministrazione/Modal/htModalAnnulla";
import { ModalMessaggio } from "../components/Somministrazione/Modal/htModalMessaggio";
import { _Scritta_Piano, _formato_data, _anni } from "../utils";
import { styles } from "../styles/somministrazioneStyles";
import { FarmaciItem } from "../types/htFarmaci";

type SomministrazioneScreenProps = {
  navigation: any;
  route: any;
};

const COLONNE_HEADER = [
  { label: "DESCRIZIONE", width: "47%" },
  { label: "UM", width: "7%" },
  { label: "MOD", width: "10%" },
  { label: "ORE", width: "7%" },
  { label: "QTA", width: "7%" },
  { label: "AB", width: "5%" },
  { label: "OK", width: "10%" },
  { label: "SOM", width: "7%" },
] as const;

const TURNI = [
  { codice: "*" as const, label: "Tutti" },
  { codice: "1T" as const, label: "Mattina" },
  { codice: "2T" as const, label: "Pomeriggio" },
  { codice: "3T" as const, label: "Notte" },
];

export default function SomministrazioneScreen({ navigation, route }: SomministrazioneScreenProps) {
  const paziente = route.params.singoloitem;
  const fromCartellaClinica = route.params?.fromCartellaClinica === true;
  const nureri = paziente.nureri;

  const som = useSomministrazione();

  useEffect(() => {
    som.inizializza(nureri);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressFarmaco = (item: FarmaciItem, pageY: number) => {
    const screenH = Dimensions.get("screen").height;
    som.setMenuTop(pageY - 30 + 470 <= screenH ? pageY - 30 : pageY - 400);
    som.setItemSelezionato(item);
    som.setModalmenu(true);
  };

  const handleFatto = () => {
    const risultato = som.apriFatto();
    if (risultato === "fatto") {
      som.inviaSomministrazione("fatto", nureri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Intestazione
        isHome={false}
        navigation={navigation}
        isSettings={false}
        showDirectListButton={fromCartellaClinica}
      />
      <View style={styles.screenWrapper}>
        <View style={styles.pageTitleWrap}>
          <Text style={styles.pageTitle}>SOMMINISTRAZIONE</Text>
        </View>

        {/* Modale menu azioni */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={som.modalmenu}
          onRequestClose={() => som.setModalmenu(false)}
        >
          {som.itemSelezionato && (
            <ModalMenu
              item={som.itemSelezionato}
              onFatto={handleFatto}
              onNoSomministrazione={som.apriNoSomministrazione}
              onVaria={som.apriVaria}
              onAnnulla={som.apriAnnulla}
              onChiudi={() => som.setModalmenu(false)}
            />
          )}
        </Modal>

        {/* Modale no somministrazione */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={som.modalNoSom}
          onRequestClose={() => som.setModalNoSom(false)}
        >
          {som.itemSelezionato && (
            <ModalNoSomministrazione
              item={som.itemSelezionato}
              valueNoSom={som.valueNoSom}
              valueIndexNoSom={som.valueIndexNoSom}
              motivazioneNoSom={som.motivazioneNoSom}
              onChangeRadio={(value, index) => {
                som.setValueNoSom(value);
                som.setValueIndexNoSom(index);
              }}
              onChangeMotivazione={som.setMotivazioneNoSom}
              onConferma={() => {
                som.setModalNoSom(false);
                som.inviaSomministrazione("nosomministrazione", nureri);
              }}
              onAnnulla={() => som.setModalNoSom(false)}
              mostraMessaggio={som.mostraMessaggio}
            />
          )}
        </Modal>

        {/* Modale varia */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={som.modalVaria}
          onRequestClose={() => som.setModalVaria(false)}
        >
          {som.itemSelezionato && (
            <ModalVaria
              item={som.itemSelezionato}
              qtaVaria={som.qtaVaria}
              motivoVaria={som.motivoVaria}
              onChangeQta={som.setQtaVaria}
              onChangeMotivo={som.setMotivoVaria}
              onConferma={() => {
                som.setModalVaria(false);
                som.inviaSomministrazione("varia", nureri);
              }}
              onAnnulla={() => som.setModalVaria(false)}
              mostraMessaggio={som.mostraMessaggio}
            />
          )}
        </Modal>

        {/* Modale annulla */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={som.modalAnnulla}
          onRequestClose={() => som.setModalAnnulla(false)}
        >
          {som.itemSelezionato && (
            <ModalAnnulla
              item={som.itemSelezionato}
              onConferma={() => {
                som.setModalAnnulla(false);
                som.inviaSomministrazione("annulla", nureri);
              }}
              onAnnulla={() => som.setModalAnnulla(false)}
            />
          )}
        </Modal>

        {/* Modale messaggi */}
        <ModalMessaggio
          visible={som.modalMessaggio}
          titolo={som.titoloMessaggio}
          messaggio={som.messaggio}
          onChiudi={() => som.setModalMessaggio(false)}
        />

        {/* Card paziente */}
        <View style={styles.patientSummaryWrap}>
          <View style={styles.patientSummaryCard}>
            <View style={styles.patientSummaryHeader}>
              <Text style={styles.patientSummaryReparto} numberOfLines={1}>
                {_Scritta_Piano(paziente.repcam)}
              </Text>
              <View style={styles.patientSummaryRoomInfo}>
                <Text style={styles.patientSummaryRoomText} numberOfLines={1}>
                  CAMERA {paziente.codcam}
                </Text>
                <Text style={styles.patientSummaryRoomText} numberOfLines={1}>
                  LETTO {paziente.numlet}
                </Text>
              </View>
            </View>

            <View style={styles.patientSummaryBody}>
              <View style={styles.patientSummaryMainRow}>
                <View style={styles.patientSummaryAvatar}>
                  <Text style={styles.patientSummaryAvatarText}>{"\uD83D\uDC64"}</Text>
                </View>
                <View style={styles.patientSummaryMainInfo}>
                  <Text style={styles.patientSummaryName} numberOfLines={1}>
                    {paziente.cogn} {paziente.nome}
                  </Text>
                  <Text style={styles.patientSummaryCode} numberOfLines={1}>
                    Codice: {paziente.codice}
                  </Text>
                </View>
              </View>

              <View style={styles.patientSummaryInfoGrid}>
                <View style={styles.patientSummaryInfoBox}>
                  <Text style={styles.patientSummaryInfoLabel}>ETA</Text>
                  <Text style={styles.patientSummaryInfoValue}>
                    {_anni(paziente.dnasc)} anni
                  </Text>
                </View>
                <View style={styles.patientSummaryInfoBox}>
                  <Text style={styles.patientSummaryInfoLabel}>DATA NASCITA</Text>
                  <Text style={styles.patientSummaryInfoValue}>
                    {_formato_data(paziente.dnasc, "yyyy-mm-dd", "dd/mm/yyyy", "s")}
                  </Text>
                </View>
                <View style={styles.patientSummaryInfoBox}>
                  <Text style={styles.patientSummaryInfoLabel}>NUMERO SDO</Text>
                  <Text style={styles.patientSummaryInfoValue}>
                    {paziente.numsdo}/{paziente.annsdo}
                  </Text>
                </View>
                <View style={styles.patientSummaryInfoBox}>
                  <Text style={styles.patientSummaryInfoLabel}>DATA RICOVERO</Text>
                  <Text style={styles.patientSummaryInfoValue}>
                    {_formato_data(paziente.datric, "yyyy-mm-dd", "dd/mm/yyyy", "s")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Filtro turno */}
        <View style={styles.filtersWrapperTurno}>
          <TouchableOpacity
            style={styles.filterCardTurno}
            activeOpacity={0.85}
            onPress={() => som.setShowTurno(true)}
          >
            <View style={styles.filterIconBox}>
              <Image
                style={styles.filterIcon}
                source={require("../../../img/clock.png")}
              />
            </View>
            <View style={styles.filterTextBox}>
              <Text style={styles.filterLabel}>TURNO</Text>
              <Text style={styles.filterValue} numberOfLines={1}>
                {som.selectedTurnoLabel}
              </Text>
            </View>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="fade"
            visible={som.showTurno}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.filterModalCard}>
                <Text style={styles.filterModalTitle}>Seleziona turno</Text>
                <ScrollView
                  keyboardShouldPersistTaps="always"
                  style={styles.filterModalList}
                >
                  {TURNI.map((t) => (
                    <TouchableOpacity
                      key={t.codice}
                      onPress={() => som.cambiaTurno(t.codice, t.label)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.filterOptionRow}>
                        <Text
                          style={[
                            styles.filterOptionText,
                            som.selectedTurno === t.codice && styles.filterOptionTextActive,
                          ]}
                        >
                          {t.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => som.setShowTurno(false)}
                  activeOpacity={0.85}
                  style={styles.modalSecondaryButton}
                >
                  <Text style={styles.modalSecondaryButtonText}>ANNULLA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Header tabella */}
        <View style={{ alignSelf: "stretch", flexDirection: "row" }}>
          {COLONNE_HEADER.map((col) => (
            <View key={col.label} style={{ width: col.width, alignSelf: "stretch" }}>
              <Text style={styles.text_intestazione}>{col.label}</Text>
            </View>
          ))}
        </View>

        {/* Lista farmaci */}
        {som.isLoading ? (
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={som.somministrazione}
            keyExtractor={(_item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={som.isRefreshing}
                onRefresh={() => som.refresh(nureri)}
              />
            }
            renderItem={({ item }) => (
              <TouchableHighlight
                style={styles.item_ricovery}
                underlayColor="aliceblue"
                onPress={(evt) => handlePressFarmaco(item, evt.nativeEvent.pageY)}
              >
                <View style={styles.farmacoRow}>
                  {/* Descrizione farmaco + note */}
                  <View style={styles.farmacoDescrizione}>
                    <Text style={styles.farmacoNome}>{item.desart}</Text>
                    {item.desnot && item.desnot.trim() !== "" && (
                      <View style={styles.farmacoNoteWrap}>
                        <Text style={styles.farmacoNoteLabel}>Note:</Text>
                        <Text style={styles.farmacoNoteText}>{item.desnot.trim()}</Text>
                      </View>
                    )}
                  </View>

                  {/* Colonne dati */}
                  {([
                    { value: item.unimis, width: "7%" },
                    { value: item.tipsom, width: "10%" },
                    { value: item.orasom, width: "7%" },
                    { value: item.qtasom, width: "7%" },
                    { value: item.ab, width: "5%" },
                    { value: item.qtacon, width: "10%", special: true },
                    { value: item.qtatot, width: "7%" },
                  ] as const).map((col, i) => (
                    <View
                      key={i}
                      style={[
                        styles.text_corpo_style,
                        { width: col.width, justifyContent: "center", alignItems: "center" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.text_corpo_carcter,
                          "special" in col && col.special && col.value === "fatto"
                            ? { backgroundColor: "#00ffff", color: "#1d5c85" }
                            : "special" in col && col.special
                              ? { backgroundColor: "white" }
                              : {},
                        ]}
                      >
                        {col.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableHighlight>
            )}
          />
        )}
      </View>
    </View>
  );
}
