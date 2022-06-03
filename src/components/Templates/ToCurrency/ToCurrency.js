import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ToCurrency({
  toCurrency,
  handleChangeTo,
}) {

  return (
    <Form.Select aria-label="Select to currency" data-testid="to-currency" value={toCurrency} onChange={handleChangeTo}>
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
      <option value="BRL">BRL</option>
      <option value="CAD">CAD</option>
    </Form.Select>
  );
}
  
ToCurrency.propTypes = {
  toCurrency: PropTypes.string.isRequired,
  handleChangeFrom: PropTypes.func.isRequired,
};

ToCurrency.defaultProps = {
  toCurrency: 'BRL',
  handleChangeFrom: () => { },
};

export default ToCurrency;