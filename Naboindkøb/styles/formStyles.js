import { StyleSheet } from "react-native";
import { farver } from "./colors";
export const formStyles = StyleSheet.create({
  inputLabel: { color: farver.tekst, fontSize: 14, fontWeight: "700", marginBottom: 7 }, input: { backgroundColor: farver.kort, borderColor: farver.kant, borderWidth: 1, borderRadius: 12, color: farver.tekst, fontSize: 16, marginBottom: 16, paddingHorizontal: 14, paddingVertical: 13 },
  button: { alignItems: "center", backgroundColor: farver.primær, borderRadius: 12, marginTop: 6, paddingVertical: 15 }, buttonText: { color: "#fff", fontSize: 16, fontWeight: "800" }, buttonDisabled: { opacity: 0.6 },
  secondaryButton: { alignItems: "center", borderColor: farver.primær, borderRadius: 12, borderWidth: 1, marginBottom: 12, paddingVertical: 13 }, secondaryButtonText: { color: farver.primær, fontSize: 15, fontWeight: "800" },
  searchHelp: { color: farver.svagTekst, fontSize: 13, lineHeight: 18, marginTop: -9, marginBottom: 12 }, searchError: { color: farver.svagTekst, fontSize: 14, lineHeight: 20, marginBottom: 12 },
  manualChoice: { alignItems: "center", marginBottom: 16, paddingVertical: 5 }, manualChoiceText: { color: farver.primær, fontSize: 14, fontWeight: "700", textDecorationLine: "underline" },
  suggestionList: { backgroundColor: farver.primærLys, borderColor: "#b9dcd1", borderRadius: 12, borderWidth: 1, marginBottom: 16, padding: 12 }, suggestionHeading: { color: farver.primær, fontSize: 14, fontWeight: "800", marginBottom: 4 },
  suggestionButton: { borderTopColor: "#b9dcd1", borderTopWidth: 1, paddingVertical: 11 }, suggestionName: { color: farver.tekst, fontSize: 15, fontWeight: "700" }, suggestionMeta: { color: farver.svagTekst, fontSize: 13, marginTop: 3 },
});
