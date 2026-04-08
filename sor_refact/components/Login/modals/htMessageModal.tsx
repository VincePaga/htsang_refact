import React from "react";
import { Modal, View, Text, TouchableHighlight } from "react-native";
import { styles } from "../../../styles/loginStyles";

type MessageModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export default function MessageModal({
  visible,
  title,
  message,
  onClose,
}: MessageModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.ModalView}>
        <View style={[styles.popup, { height: 300, width: 300 }]}>
          <View style={styles.messageContainer}>
            <View style={styles.messageTitleWrapper}>
              <View>
                <Text style={styles.messageTitle}>{title}</Text>
              </View>
            </View>

            <View>
              <Text>{message}</Text>
            </View>

            <View style={styles.messageButtonWrapper}>
              <TouchableHighlight
                style={styles.loginBtn}
                underlayColor="#36a4eb"
                onPress={onClose}
              >
                <Text style={styles.loginText}>CHIUDI</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}