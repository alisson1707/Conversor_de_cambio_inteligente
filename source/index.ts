const input = document.getElementById("valor") as HTMLInputElement;
const usdEl = document.getElementById("usd")!;
const eurEl = document.getElementById("eur")!;
const btcEl = document.getElementById("btc")!;
const erroEl = document.getElementById("erro")!;

let timeout: number;

async function buscarCotacao(): Promise<CurrencyResponse | null> {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"
    );

    if (!response.ok) throw new Error("Erro na API");

    const data: CurrencyResponse = await response.json();
    erroEl.textContent = "";
    return data;

  } catch (error) {
    erroEl.textContent = "Erro ao buscar cotações 😢";
    return null;
  }
}
function formatar(valor: number, moeda: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: moeda
  }).format(valor);
}
input.addEventListener("input", () => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    const valorBRL = parseFloat(input.value);

    if (isNaN(valorBRL)) return;

    const data = await buscarCotacao();
    if (!data) return;

    const usd = valorBRL / parseFloat(data.USDBRL.bid);
    const eur = valorBRL / parseFloat(data.EURBRL.bid);
    const btc = valorBRL / parseFloat(data.BTCBRL.bid);

    usdEl.textContent = formatar(usd, "USD");
    eurEl.textContent = formatar(eur, "EUR");
    btcEl.textContent = formatar(btc, "BTC");

  }, 500); // debounce de 500ms
});