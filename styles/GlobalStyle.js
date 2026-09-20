import { StyleSheet } from "react-native";

export const farver = {
  baggrund: "#f5f7f4",
  kort: "#ffffff",
  primær: "#28665b",
  primærLys: "#dceee8",
  tekst: "#1d2b28",
  svagTekst: "#66736f",
  kant: "#d9e1de",
  succes: "#3b8b61",
};

export const GS = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: farver.baggrund
  },
  content: {
    padding: 20,
    paddingBottom: 36 
  },
  hero: {
    marginBottom: 24
  },
  eyebrow: {
    color: farver.primær,
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.5
  },
  title: {
    color: farver.tekst,
    fontSize: 29,
    fontWeight: "800",
    marginTop: 5
  },
  subtitle: {
    color: farver.svagTekst,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8
  },
  inputLabel: {
    color: farver.tekst,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 7
  },
  input: {
    backgroundColor: farver.kort,
    borderColor: farver.kant,
    borderWidth: 1,
    borderRadius: 12,
    color: farver.tekst,
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 13
  },
  button: {
    alignItems: "center",
    backgroundColor: farver.primær,
    borderRadius: 12,
    marginTop: 6,
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800"
  },
  card: {
    backgroundColor: farver.kort,
    borderColor: farver.kant,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16
  },
  cardDone: {
    backgroundColor: farver.primærLys,
    borderColor: "#b9dcd1"
  },
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemName: {
    color: farver.tekst,
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    paddingRight: 10
  },
  itemMeta: {
    color: farver.svagTekst,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5
  },
  personBadge: {
    backgroundColor: "#eef2f1",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  personText: {
    color: farver.primær,
    fontSize: 12,
    fontWeight: "800"
  },
  customerHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
    marginTop: 16,
  },
  customerTitle: {
    color: farver.tekst,
    fontSize: 19,
    fontWeight: "800"
  },
  customerCount: {
    color: farver.svagTekst,
    fontSize: 14,
    fontWeight: "700"
  },
  customerAction: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2
  },
  action: {
    alignSelf: "flex-start",
    marginTop: 13,
    paddingVertical: 3
  },
  actionText: {
    color: farver.primær,
    fontSize: 15,
    fontWeight: "800"
  },
  doneText: {
    color: farver.succes
  },
  empty: { 
    alignItems: "center",
    paddingTop: 72 },
  emptyTitle: {
    color: farver.tekst,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 12
  },
  emptyText: {
    color: farver.svagTekst,
    fontSize: 15,
    marginTop: 6,
    textAlign: "center"
  },
});
