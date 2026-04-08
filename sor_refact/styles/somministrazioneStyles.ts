import { StyleSheet } from "react-native";
import { commonStyles } from "./commonStyles";

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },

  pageTitleWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  pageTitle: {
    fontSize: 30,
    color: "#3682f3",
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  patientSummaryWrap: {
    width: "100%",
    paddingHorizontal: 60,
    marginBottom: 14,
  },

  patientSummaryCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  patientSummaryHeader: {
    backgroundColor: "#3682f3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  patientSummaryReparto: {
    flex: 1,
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
    marginRight: 8,
  },

  patientSummaryRoomInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  patientSummaryRoomText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 12,
  },

  patientSummaryBody: {
    padding: 12,
  },

  patientSummaryMainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  patientSummaryAvatar: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#eef2f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  patientSummaryAvatarText: {
    fontSize: 18,
  },

  patientSummaryMainInfo: {
    flex: 1,
    minWidth: 0,
  },

  patientSummaryName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3682f3",
  },

  patientSummaryCode: {
    fontSize: 13,
    color: "#6c7a89",
    marginTop: 2,
  },

  patientSummaryInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  patientSummaryInfoBox: {
    width: "48%",
    marginBottom: 10,
  },

  patientSummaryInfoLabel: {
    fontSize: 11,
    color: "#8a99a8",
    marginBottom: 2,
    fontWeight: "700",
  },

  patientSummaryInfoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f1b2d",
  },

  // Tabella farmaci
  item_ricovery: {
    width: "100%",
    backgroundColor: "white",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  text_intestazione: {
    fontSize: 22,
    color: "#1d5c85",
    backgroundColor: "white",
    fontWeight: "bold",
    borderWidth: 1,
    height: 34,
    textAlign: "center",
    borderColor: "rgba(41, 129, 186, .2)",
  },

  text_corpo_style: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "rgba(41, 129, 186, .2)",
    justifyContent: "center",
  },

  text_corpo_carcter: {
    fontSize: 18,
    color: "#2981ba",
    textAlign: "center",
  },

  farmacoDescrizione: {
    width: "47%",
    justifyContent: "center",
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: "rgba(41, 129, 186, .2)",
    paddingVertical: 8,
    paddingHorizontal: 6,
    gap: 4,
  },

  farmacoNome: {
    fontSize: 16,
    color: "#2981ba",
    textAlign: "center",
    fontWeight: "600",
    width: "100%",
  },

  farmacoNoteWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  farmacoNoteLabel: {
    fontSize: 13,
    color: "#2981ba",
    textAlign: "center",
    width: "100%",
  },

  farmacoNoteText: {
    fontSize: 13,
    color: "#2981ba",
    textAlign: "center",
    fontWeight: "bold",
    width: "100%",
  },

  farmacoRow: {
    width: "100%",
    flexDirection: "row",
    minHeight: 100,
    alignItems: "stretch",
  },

  // Modali
  modalOverlay: commonStyles.modalOverlay,
  popup: commonStyles.popup,

  modalBackdrop: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  modalCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dfe6ee",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    alignSelf: "center",
  },

  actionMenuCard: {
    width: 320,
    maxWidth: "88%",
    right: 16,
  },

  mediumModalCard: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  largeModalCard: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
  },

  messageModalCard: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },

  modalHeader: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f7",
    backgroundColor: "#f8fbfd",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f1b2d",
    textAlign: "center",
  },

  modalTitleCentered: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2981ba",
    textAlign: "center",
  },

  modalSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#5f7488",
    textAlign: "center",
    fontWeight: "600",
  },

  modalBody: {
    padding: 18,
  },

  modalActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  modalPrimaryButton: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: "#2981ba",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  modalPrimaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  modalSecondaryButton: {
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: "#f4f7fa",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  modalSecondaryButtonText: {
    color: "#0f1b2d",
    fontSize: 15,
    fontWeight: "600",
  },

  modalDangerButton: {
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: "#d9534f",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  modalDangerButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  modalHalfButton: {
    flex: 1,
    marginHorizontal: 6,
  },

  // Form
  fieldBlock: {
    marginBottom: 14,
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5f7488",
    marginBottom: 6,
  },

  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  formFieldSmall: {
    width: "34%",
  },

  formFieldMedium: {
    width: "62%",
  },

  formInput: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#dfe6ee",
    borderRadius: 12,
    paddingHorizontal: 12,
    color: "#0f1b2d",
    fontSize: 15,
    backgroundColor: "#f8fbfd",
  },

  multilineInput: {
    minHeight: 90,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  warningInput: {
    backgroundColor: "#fff7cc",
    borderColor: "#f0d66d",
  },

  radioSection: {
    borderWidth: 1,
    borderColor: "#dfe6ee",
    borderRadius: 12,
    backgroundColor: "#f8fbfd",
    padding: 12,
    marginBottom: 16,
  },

  quickActionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },

  quickActionBtn: {
    minWidth: 58,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#eef2f6",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
  },

  quickActionBtnText: {
    color: "#0f1b2d",
    fontWeight: "700",
    fontSize: 14,
  },

  confirmationText: {
    fontSize: 17,
    color: "#0f1b2d",
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 24,
  },

  messageText: {
    fontSize: 15,
    color: "#0f1b2d",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
  },

  // Filtro turno
  filtersWrapperTurno: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },

  filterCardTurno: {
    width: 240,
    minHeight: 64,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },

  filterIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#eef2f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  filterIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  filterTextBox: {
    flex: 1,
    minWidth: 0,
  },

  filterLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8a99a8",
    marginBottom: 2,
  },

  filterValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f1b2d",
  },

  filterModalCard: {
    width: "100%",
    maxWidth: 320,
    maxHeight: "75%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dfe6ee",
    alignSelf: "center",
  },

  filterModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f1b2d",
    marginBottom: 14,
    textAlign: "center",
  },

  filterModalList: {
    maxHeight: 260,
    marginBottom: 12,
  },

  filterOptionRow: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f7",
  },

  filterOptionText: {
    textAlign: "center",
    fontSize: 15,
    color: "#0f1b2d",
  },

  filterOptionTextActive: {
    color: "#2981ba",
    fontWeight: "700",
  },
});
