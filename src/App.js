import Exchange from './components/Exchange/Exchange';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>💱 Currency Converter</h1>
        <Exchange fromCurrency="USD" toCurrency="BRL"></Exchange> 
      </div>
  );
}

export default App;
