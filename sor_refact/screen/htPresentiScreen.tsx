import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Intestazione } from "./htIntestazioneScreen";
import { CardBreve } from "../components/ListaPresenti/cards/htCardBreve";
import { CardDettagliata } from "../components/ListaPresenti/cards/htCardDettagliata";
import FilterPanel from "../components/ListaPresenti/filters/htFilterPanel";
import TopBar from "../components/ListaPresenti/layout/htTopBar";
import { usePazientiList } from "../hooks/htUsePazientiList";
import { useFiltri } from "../hooks/htUseFiltri";
import { useOrientamento } from "../hooks/htUseOrientamento";
import { styles } from "../styles/presentiStyles";
import { _Scritta_Piano } from "../utils";

type PresentiScreenProps = {
  navigation: any;
};

export default function PresentiScreen({ navigation }: PresentiScreenProps) {
  const orientamento = useOrientamento();
  const [isChangingMode, setIsChangingMode] = useState(false);
  const [showfilter, setShowfilter] = useState(false);

  const {
    isLoading,
    isRefreshing,
    datiIniziali,
    ricoveratiPresenti,
    setRicoveratiPresenti,
    opecod,
    inizializza,
    refresh,
  } = usePazientiList();

  const filtri = useFiltri({
    datiIniziali,
    opecod,
    onFiltrati: setRicoveratiPresenti,
  });

  // Inizializza al mount: carica dati e ripristina filtri salvati
  useEffect(() => {
    inizializza().then(({ filtri: filtriSalvati, dati }) => {
      if (filtriSalvati && dati.length > 0) {
        filtri.ripristinaFiltri(filtriSalvati, dati);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View style={styles.screenWrapper}>
        <Intestazione isHome navigation={navigation} aggiorna={inizializza} />
        <ActivityIndicator size="large" color="#3682f3" />
      </View>
    );
  }

  return (
    <View style={styles.flex1}>
      <Intestazione isHome navigation={navigation} aggiorna={inizializza} />

      <View style={styles.contentWrapper}>
        <TopBar
          showfilter={showfilter}
          conteggiopazienti={ricoveratiPresenti.length}
          modalitaCard={filtri.modalitaCard}
          onToggleFilter={() => setShowfilter((v) => !v)}
          onCambiaModalita={filtri.cambiaModalita}
          onIsChangingMode={setIsChangingMode}
        />

        {showfilter && (
          <FilterPanel
            datiIniziali={datiIniziali}
            selectedPianoLabel={filtri.selectedPianoLabel}
            selectedPiano={filtri.selectedPiano}
            selectedCamera={filtri.selectedCamera}
            dataRicovero={filtri.dataRicovero}
            datapicker={filtri.datapicker}
            showpiano={filtri.showpiano}
            showcamera={filtri.showcamera}
            showdataandroid={filtri.showdataandroid}
            showdataios={filtri.showdataios}
            cameraManuale={filtri.cameraManuale}
            onOpenPiano={() => filtri.setShowpiano(true)}
            onOpenCamera={() => { filtri.setShowcamera(true); filtri.setCameraManuale(""); }}
            onOpenDate={filtri.apriDatepicker}
            onResetData={filtri.resetData}
            onSelectPiano={filtri.cambiaPiano}
            onSelectCamera={filtri.cambiaCamera}
            onClosePiano={() => filtri.setShowpiano(false)}
            onCloseCamera={() => { filtri.setShowcamera(false); filtri.setCameraManuale(""); }}
            onChangeCameraManuale={filtri.setCameraManuale}
            onChangeDatepicker={filtri.onChangeDatepicker}
            onConfermaIos={filtri.confermaDataIos}
            onAnnullaIos={() => filtri.setShowdataios(false)}
          />
        )}

        {isChangingMode ? (
          <View style={styles.changingModeWrapper}>
            <ActivityIndicator size="large" color="#3682f3" />
            <Text style={styles.changingModeText}>Caricamento...</Text>
          </View>
        ) : (
          <FlatList
            data={ricoveratiPresenti}
            key={orientamento}
            numColumns={orientamento === "landscape" ? 3 : 2}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyExtractor={(_item, index) => index.toString()}
            initialNumToRender={8}
            maxToRenderPerBatch={4}
            windowSize={5}
            removeClippedSubviews={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
            }
            renderItem={({ item }) => (
              <TouchableHighlight
                style={[
                  styles.itemRicovery,
                  orientamento === "landscape"
                    ? { width: "33.33%" }
                    : { width: "50%" },
                ]}
                underlayColor="aliceblue"
                onPress={() => {
                  navigation.navigate("htrepcart", { singoloitem: item });
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.reparto} numberOfLines={1}>
                      {_Scritta_Piano(item.repcam)}
                    </Text>
                    <View style={styles.roomInfo}>
                      <Text style={styles.roomText} numberOfLines={1}>
                        CAMERA {item.codcam}
                      </Text>
                      <Text style={styles.roomText} numberOfLines={1}>
                        LETTO {item.numlet}
                      </Text>
                    </View>
                  </View>
                  {filtri.modalitaCard === "breve" ? (
                    <CardBreve item={item} navigation={navigation} />
                  ) : (
                    <CardDettagliata item={item} navigation={navigation} />
                  )}
                </View>
              </TouchableHighlight>
            )}
          />
        )}
      </View>
    </View>
  );
}
