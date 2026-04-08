import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { styles } from "../../../styles/presentiStyles";
import { PazienteItem } from "../../../types/htPaziente";
import { _anni, _formato_data } from "../../../utils";

type CardDettagliataProps = {
  item: PazienteItem;
  navigation: any;
};

export const CardDettagliata = React.memo(
  ({ item, navigation }: CardDettagliataProps) => (
    <View style={styles.cardBody}>
      <View style={styles.patientRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View style={styles.patientMainInfo}>
          <Text style={styles.patientName} numberOfLines={1}>
            {item.cogn} {item.nome}
          </Text>
          <Text style={styles.patientCode} numberOfLines={1}>
            Codice: {item.codice}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={[styles.infoGrid, { flex: 1 }]}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>ETÀ</Text>
            <Text style={styles.infoValue}>{_anni(item.dnasc)} anni</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>DATA NASCITA</Text>
            <Text style={styles.infoValue}>
              {_formato_data(item.dnasc, "yyyy-mm-dd", "dd/mm/yyyy", "s")}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>NUMERO SDO</Text>
            <Text style={styles.infoValue}>
              {item.numsdo}/{item.annsdo}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>DATA RICOVERO</Text>
            <Text style={styles.infoValue}>
              {item.datric
                ? _formato_data(item.datric, "yyyy-mm-dd", "dd/mm/yyyy", "s")
                : ""}
            </Text>
          </View>
        </View>

        <View style={styles.cardDettagliataButtons}>
          <TouchableHighlight
            style={[styles.openButton, styles.openButtonMargin]}
            underlayColor="#36a4eb"
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate("htrepsom", { singoloitem: item });
            }}
          >
            <Text style={styles.textStyle}>Somministrazione</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.openButton, styles.openButtonMargin]}
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
  ),
  (prev, next) => prev.item === next.item,
);
