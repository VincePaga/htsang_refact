import { StyleSheet } from "react-native";
import { commonStyles } from "./commonStyles";

export const styles = StyleSheet.create({
  // ── Layout principale ──────────────────────────────────────────────
  flex1: {
    flex: 1,
  },

  screenWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  contentWrapper: {
    flex: 1,
    width: "100%",
  },

  // ── Top bar ────────────────────────────────────────────────────────
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,
  },

  filterToggleButton: {
    width: 130,
  },

  filterToggleInner: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },

  filterToggleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
  },

  filterToggleLabelBox: {
    height: 40,
    minWidth: 90,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  filterToggleLabel: {
    color: "#3682f3",
    fontSize: 15,
    fontWeight: "600",
  },

  patientCountWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  patientCountText: {
    textAlign: "center",
    fontSize: 24,
    color: "#3682f3",
    fontWeight: "bold",
  },

  viewModeWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewModeButton: {
    minWidth: 92,
    height: 40,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfd8e3",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  viewModeButtonActive: {
    backgroundColor: "#3682f3",
    borderColor: "#3682f3",
  },

  viewModeButtonText: {
    fontWeight: "bold",
  },

  // ── Card lista pazienti ────────────────────────────────────────────
  itemRicovery: {
    padding: 5,
    marginVertical: 1,
    backgroundColor: "white",
  },

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    elevation: 3,
  },

  cardHeader: {
    backgroundColor: "#3682f3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  reparto: {
    flex: 1,
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 8,
  },

  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  roomText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 12,
  },

  cardBody: {
    padding: 12,
  },

  cardBodyCompact: {
    padding: 12,
    paddingLeft: 30,
  },

  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  avatar: {
    marginTop: 6,
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#eef2f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    fontSize: 18,
  },

  patientMainInfo: {
    flex: 1,
    minWidth: 0,
  },

  patientName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3682f3",
  },

  patientCode: {
    fontSize: 13,
    color: "#6c7a89",
    marginTop: 2,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoBox: {
    width: "48%",
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 11,
    color: "#8a99a8",
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f1b2d",
  },

  openButton: {
    backgroundColor: "#3682f3",
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  cardDettagliataButtons: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 8,
    paddingLeft: 10,
  },

  openButtonMargin: {
    marginBottom: 6,
  },

  cardSdoRow: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },

  cardButtonRow: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },

  // ── Pannello filtri ────────────────────────────────────────────────
  filtersWrapper: {
    width: "100%",
    backgroundColor: "#f8fbfd",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
    marginBottom: 12,
  },

  filtersWrapperRow: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },

  filterCard: {
    flex: 1,
    minHeight: 64,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 6,
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

  resetDateButton: {
    width: 90,
    height: 64,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dfe6ee",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  resetDateButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000000",
  },

  // ── Modali filtri ──────────────────────────────────────────────────
  modalOverlay: commonStyles.modalOverlay,

  filterModalCard: {
    width: "100%",
    maxWidth: 320,
    maxHeight: "75%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dfe6ee",
  },

  filterModalCardLarge: {
    width: "100%",
    maxWidth: 360,
    maxHeight: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dfe6ee",
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
    color: "#3682f3",
    fontWeight: "700",
  },

  manualSection: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#edf2f7",
  },

  manualSectionTitle: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    color: "#5f7488",
  },

  manualInput: {
    height: 46,
    borderWidth: 1,
    borderColor: "#dfe6ee",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: "#0f1b2d",
    backgroundColor: "#f8fbfd",
  },

  modalPrimaryButton: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#3682f3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  modalPrimaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  modalSecondaryButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: "#f4f7fa",
    justifyContent: "center",
    alignItems: "center",
  },

  modalSecondaryButtonText: {
    color: "#0f1b2d",
    fontSize: 15,
    fontWeight: "600",
  },

  // ── Date picker iOS ────────────────────────────────────────────────
  iosDateModalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dfe6ee",
  },

  iosDateHeader: {
    height: 48,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f7",
  },

  iosDateCancel: {
    fontSize: 15,
    color: "#5f7488",
    fontWeight: "600",
  },

  iosDateConfirm: {
    fontSize: 15,
    color: "#3682f3",
    fontWeight: "700",
  },

  // ── Modale dettaglio paziente ──────────────────────────────────────
  detailModalContent: {
    padding: 10,
  },

  // ── Loading cambio modalità ────────────────────────────────────────
  changingModeWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  changingModeText: {
    marginTop: 10,
    color: "#3682f3",
  },
});
