import { Modal, View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../../../styles/presentiStyles";
import { _formato_data } from "../../../utils";

type DataPickerModalProps = {
  datapicker: Date;
  showAndroid: boolean;
  showIos: boolean;
  onChange: (event: any, date?: Date) => void;
  onConfermaIos: () => void;
  onAnnullaIos: () => void;
};

export default function DataPickerModal({
  datapicker,
  showAndroid,
  showIos,
  onChange,
  onConfermaIos,
  onAnnullaIos,
}: DataPickerModalProps) {
  const oggi = _formato_data("");

  return (
    <>
      {Platform.OS === "android" && showAndroid && (
        <DateTimePicker
          testID="dateTimePicker"
          value={datapicker}
          mode="date"
          maximumDate={oggi}
          display="spinner"
          onChange={onChange}
        />
      )}

      {Platform.OS === "ios" && showIos && (
        <Modal
          transparent
          animationType="fade"
          visible={showIos}
          onRequestClose={onAnnullaIos}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.iosDateModalCard}>
              <View style={styles.iosDateHeader}>
                <TouchableOpacity
                  onPress={onAnnullaIos}
                  testID="canceldateios"
                >
                  <Text style={styles.iosDateCancel}>ANNULLA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onConfermaIos}
                  testID="confermadateios"
                >
                  <Text style={styles.iosDateConfirm}>CONFERMA</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                testID="dateTimePickerIos"
                value={datapicker}
                mode="date"
                locale="it-IT"
                maximumDate={oggi}
                display="spinner"
                onChange={onChange}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
