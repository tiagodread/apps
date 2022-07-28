import ResponsiveAppBar from "../components/NavCustom/ResponsiveAppBar";
import Exchange from "../components/Exchange/Exchange";

function CurrencyConverter() {
  return (
    <main>
      <ResponsiveAppBar />
      <Exchange fromCurrency="BRL" toCurrency="USD"></Exchange>
    </main>
  );
}

export default CurrencyConverter;
