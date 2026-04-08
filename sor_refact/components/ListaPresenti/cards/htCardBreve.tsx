import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { styles } from "../../../styles/presentiStyles";
import { PazienteItem } from "../../../types/htPaziente";

type CardBreveProps = {
  item: PazienteItem;
  navigation: any;
};

export const CardBreve = React.memo(
  ({ item, navigation }: CardBreveProps) => (
    <View style={styles.cardBodyCompact}>
      <View style={styles.patientRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View style={styles.patientMainInfo}>
          <Text style={styles.patientName} numberOfLines={1}>
            {item.cogn} {item.nome}
          </Text>
          <View style={styles.cardSdoRow}>
            <Text style={styles.patientCode} numberOfLines={1}>
              N° SDO: {item.numsdo}/{item.annsdo}
            </Text>
            <Text style={styles.patientCode} numberOfLines={1}>
              Codice: {item.codice}
            </Text>
          </View>
          <View style={styles.cardButtonRow}>
            <TouchableHighlight
              style={styles.openButton}
              underlayColor="#36a4eb"
              onPress={(e) => {
                e.stopPropagation();
                navigation.navigate("htrepsom", { singoloitem: item });
              }}
            >
              <Text style={styles.textStyle}>Somministrazione</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.openButton}
              underlayColor="#36a4eb"
              onPress={(e) => {
                e.stopPropagation();
                navigation.navigate("htreppv", { singoloitem: item });
              }}
            >
              <Text style={styles.textStyle}>Parametri Vitali</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  ),
  (prev, next) => prev.item === next.item,
);
