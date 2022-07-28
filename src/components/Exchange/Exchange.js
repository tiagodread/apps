import { React, useState } from "react";
// import { Button, Container, Row, Form, Col, Alert } from "react-bootstrap";
import FormControl from "@mui/material/FormControl";
import { Container } from "@mui/system";
import { InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import "./Exchange.css";

function Exchange(props) {
  const [fromCurrency, setFromCurrency] = useState(props.fromCurrency);
  const [toCurrency, setToCurrency] = useState(props.toCurrency);
  const [value, setValue] = useState(undefined);
  const [convertedValue, setConvertedValue] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [showResults, setShowResults] = useState(false);

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
      alert("Please enter a valid value!");
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
      <div className="header">
        <h1>💱 Currency Converter</h1>
      </div>
      <form>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fromCurrency}
              label="Age"
              onChange={handleChangeFrom}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          {/* <Row className="exchange-form-from">
            <Col sm={5}>
              <Form.Label>From Currency</Form.Label>
            </Col>
            <Col sm={5}>
              <Form.Select
                aria-label="Select from currency"
                data-testid="from-currency"
                value={fromCurrency}
                onChange={handleChangeFrom}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="BRL">BRL</option>
                <option value="CAD">CAD</option>
              </Form.Select>
            </Col>
          </Row> */}
        </div>
        {/* <div className="mb-3" controlId="to">
          <Row className="exchange-form-to">
            <Col sm={5}>
              <Form.Label>To Currency</Form.Label>
            </Col>
            <Col sm={5}>
              <Form.Select
                aria-label="Select to currency"
                data-testid="to-currency"
                value={toCurrency}
                onChange={handleChangeTo}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="BRL">BRL</option>
                <option value="CAD">CAD</option>
              </Form.Select>
            </Col>
          </Row>
        </div>

        <div className="mb-3" controlId="from">
          <Row className="exchange-form-from">
            <Col sm={5}>
              <Form.Label>Amount</Form.Label>
            </Col>
            <Col sm={5}>
              <Form.Control
                type="number"
                data-testid="enteredValue"
                min={1}
                placeholder={`value in ${fromCurrency} format`}
                onChange={(event) => handleValue(event)}
                required={true}
              />
            </Col>
          </Row>
        </div> */}
        <Button
          variant="primary"
          data-testid="convert"
          value="convert"
          onClick={convert}
        >
          Convert
        </Button>{" "}
      </form>

      {/* {showResults ? (
        <Container className="exchange-results" data-testid="exchange-result">
          <Alert variant="light">
            <Alert.Heading>Success</Alert.Heading>
            <p>
              {value} {fromCurrency} = {convertedValue} {toCurrency}
            </p>
            <hr />
            <p className="mb-0">Exchange Rate: {exchangeRate}</p>
          </Alert>
        </Container>
      ) : null} */}
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
