import { StyleSheet } from "react-native";
import { farver } from "./colors";
export const commonStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: farver.baggrund }, content: { padding: 20, paddingBottom: 36 }, hero: { marginBottom: 24 },
  eyebrow: { color: farver.primær, fontWeight: "700", fontSize: 13, letterSpacing: 0.5 }, title: { color: farver.tekst, fontSize: 29, fontWeight: "800", marginTop: 5 },
  subtitle: { color: farver.svagTekst, fontSize: 16, lineHeight: 22, marginTop: 8 }, empty: { alignItems: "center", paddingTop: 72 },
  emptyTitle: { color: farver.tekst, fontSize: 19, fontWeight: "800", marginTop: 12 }, emptyText: { color: farver.svagTekst, fontSize: 15, marginTop: 6, textAlign: "center" },
});
