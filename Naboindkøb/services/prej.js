const baseUrl = "https://api.prej.app/v1/products";
// Gemmer tidligere søgninger, mens appen er åben.
const cache = new Map();

// Konverterer værdier fra API'et til tekst.
const asText = (value) => (typeof value === "string" ? value : "");

// Henter produktforslag fra Prej API'et.
export async function søgProdukter(søgetekst) {
  const søgning = søgetekst.trim().toLowerCase();

  if (cache.has(søgning)) return cache.get(søgning);

  const apiNøgle = process.env.EXPO_PUBLIC_PREJ_API_KEY;
  if (!apiNøgle) {
    throw new Error("Prej API-nøglen mangler.");
  }

  const response = await fetch(`${baseUrl}?q=${encodeURIComponent(søgning)}&limit=5`, {
    headers: {
      Authorization: `Bearer ${apiNøgle}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Kunne ikke hente produktforslag.");
  }

  // Tilpasser svaret fra API'et til appens produktformat.
  const produkter = (data.products || []).slice(0, 5).map((produkt) => ({
    id: asText(produkt.id),
    navn: asText(produkt.name) || asText(produkt.title) || asText(produkt.product_name),
    mærke: asText(produkt.brand) || asText(produkt.brand_name),
    mængde: asText(produkt.quantity_label),
  })).filter((produkt) => produkt.navn);

  // Gemmer resultatet, så samme søgning ikke hentes igen.
  cache.set(søgning, produkter);
  return produkter;
}
