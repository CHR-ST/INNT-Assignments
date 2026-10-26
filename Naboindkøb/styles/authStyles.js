import { StyleSheet } from "react-native";
import { farver } from "./colors";
export const authStyles = StyleSheet.create({
  authContent: { flex: 1, justifyContent: "center", padding: 20 }, errorText: { color: farver.fejl, fontSize: 14, lineHeight: 20, marginBottom: 12 }, authSwitch: { alignItems: "center", marginTop: 20, padding: 8 }, authSwitchText: { color: farver.primær, fontSize: 15, fontWeight: "700", textAlign: "center" },
  roleCard: { backgroundColor: farver.kort, borderColor: farver.kant, borderRadius: 12, borderWidth: 1, marginBottom: 12, padding: 15 }, roleCardSelected: { backgroundColor: farver.primærLys, borderColor: farver.primær, borderWidth: 2 }, roleTitle: { color: farver.tekst, fontSize: 16, fontWeight: "800" }, roleText: { color: farver.svagTekst, fontSize: 14, lineHeight: 20, marginTop: 4 },
});
