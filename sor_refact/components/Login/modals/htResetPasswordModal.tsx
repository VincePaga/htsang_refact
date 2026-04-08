import React from "react";
import { Modal, View } from "react-native";
import { styles } from "../../../styles/loginStyles";
import MessageModal from "./htMessageModal";
import ResetPasswordForm from "../forms/htResetPasswordForm";

type ResetPasswordModalProps = {
  visible: boolean;
  onClose: () => void;
  resetPwd: string;
  resetPwd2: string;
  resetPincode: string;
  loading: boolean;
  onChangeResetPwd: (value: string) => void;
  onChangeResetPwd2: (value: string) => void;
  onChangeResetPincode: (value: string) => void;
  onSubmit: () => void;
  nestedMessageVisible: boolean;
  nestedMessageTitle: string;
  nestedMessageText: string;
  onCloseNestedMessage: () => void;
};

export default function ResetPasswordModal({
  visible,
  onClose,
  resetPwd,
  resetPwd2,
  resetPincode,
  loading,
  onChangeResetPwd,
  onChangeResetPwd2,
  onChangeResetPincode,
  onSubmit,
  nestedMessageVisible,
  nestedMessageTitle,
  nestedMessageText,
  onCloseNestedMessage,
}: ResetPasswordModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <MessageModal
        visible={nestedMessageVisible}
        title={nestedMessageTitle}
        message={nestedMessageText}
        onClose={onCloseNestedMessage}
      />

      <View style={styles.ModalView}>
        <ResetPasswordForm
          resetPwd={resetPwd}
          resetPwd2={resetPwd2}
          resetPincode={resetPincode}
          loading={loading}
          onChangeResetPwd={onChangeResetPwd}
          onChangeResetPwd2={onChangeResetPwd2}
          onChangeResetPincode={onChangeResetPincode}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </View>
    </Modal>
  );
}
