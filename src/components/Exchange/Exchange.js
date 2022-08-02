import { React, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
  InputAdornment,
  Alert,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import PropTypes from "prop-types";
import "./Exchange.css";

function Exchange(props) {
  const [fromCurrency, setFromCurrency] = useState(props.fromCurrency);
  const [toCurrency, setToCurrency] = useState(props.toCurrency);
  const [value, setValue] = useState(undefined);
  const [convertedValue, setConvertedValue] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleChangeFrom = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleChangeTo = (event) => {
    setToCurrency(event.target.value);
  };

  const handleExchangeRate = (value) => {
    setExchangeRate(value);
  };

  const handleConvertedValue = (value) => {
    setConvertedValue(value);
  };

  const handleValue = (event) => {
    setShowResults(false);
    setShowErrors(false);
    setValue(event.target.value);
  };

  const getExchangeRate = () => {
    const apiKey = "7c478081950780fb862c";
    let query = `${fromCurrency}_${toCurrency}`;
    let url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRate = parseFloat(data[query]).toFixed(4);
        handleExchangeRate(exchangeRate);
        const convertedValue = parseFloat(value * exchangeRate).toFixed(2);
        handleConvertedValue(convertedValue);
      });
  };

  const convert = () => {
    if (value === undefined || value < 1) {
      setShowErrors(true);
      return;
    }
    if (fromCurrency === toCurrency) {
      setConvertedValue(value);
      return;
    }
    getExchangeRate();
    setShowResults(true);
  };

  return (
    <Container className="exchange-container">
      <h1>💱 Currency Converter</h1>
      <form>
        <div>
          <FormControl fullWidth>
            <InputLabel id="exchange-form-from">From Currency</InputLabel>
            <Select
              labelId="exchange-form-from"
              id="exchange-form-from"
              data-testid="from-currency"
              value={fromCurrency}
              label="From Currency"
              required={true}
              onChange={handleChangeFrom}
            >
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="BRL">BRL</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
            </Select>
            <br />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="exchange-form-to">To Currency</InputLabel>
            <Select
              labelId="exchange-form-to"
              id="exchange-form-to"
              data-testid="to-currency"
              value={toCurrency}
              label="To Currency"
              onChange={handleChangeTo}
              required={true}
            >
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="BRL">BRL</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
            </Select>
            <br />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
              type="number"
              id="amount"
              data-testid="enteredValue"
              placeholder={`value in ${fromCurrency} format`}
              onChange={(event) => handleValue(event)}
              required={true}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </div>
        <Button
          variant="primary"
          data-testid="convert"
          value="convert"
          onClick={convert}
        >
          Convert
        </Button>{" "}
      </form>

      {showResults ? (
        <Alert
          variant="outlined"
          severity="success"
          className="exchange-results"
          data-testid="exchange-result"
        >
          <p>
            {value} {fromCurrency} = {convertedValue} {toCurrency}
          </p>
          <hr />
          <p className="mb-0">Current exchange Rate: {exchangeRate}</p>
        </Alert>
      ) : null}

      {showErrors ? (
        <Alert
          variant="outlined"
          severity="error"
          className="exchange-results"
          data-testid="exchange-result"
        >
          <p>Please enter a valid value!</p>
        </Alert>
      ) : null}
    </Container>
  );
}

Exchange.propTypes = {
  fromCurrency: PropTypes.string,
  toCurrency: PropTypes.string,
};

Exchange.defaultProps = {
  fromCurrency: "BRL",
  toCurrency: "USD",
};

export default Exchange;
