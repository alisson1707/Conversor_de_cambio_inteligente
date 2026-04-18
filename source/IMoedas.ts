interface Currency {
  code: string;
  codein: string;
  name: string;
  bid: string;
}

interface CurrencyResponse {
  USDBRL: Currency;
  EURBRL: Currency;
  BTCBRL: Currency;
}