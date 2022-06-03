import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function FromCurrency({
  fromCurrency,
  handleChangeFrom,
}) {

  return (
    <Form.Select aria-label="Select from currency" data-testid="from-currency" value={fromCurrency} onChange={handleChangeFrom}>
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
      <option value="BRL">BRL</option>
      <option value="CAD">CAD</option>
    </Form.Select>
  );
}

FromCurrency.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  handleChangeFrom: PropTypes.func.isRequired,
};

FromCurrency.defaultProps = {
  fromCurrency: 'USD',
  handleChangeFrom: () => { },
};

export default FromCurrency;