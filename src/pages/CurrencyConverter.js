import NavCustom from "../components/NavCustom/NavCustom";
import Exchange from "../components/Exchange/Exchange";

function CurrencyConverter() {
  return (
    <main>
      <NavCustom />
      <Exchange fromCurrency="BRL" toCurrency="USD"></Exchange>
    </main>
  );
}

export default CurrencyConverter;
