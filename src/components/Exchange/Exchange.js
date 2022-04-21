import React from 'react';
import './Exchange.css';

export default class Exchange extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          fromCurrency: this.props.fromCurrency,
          toCurrency: this.props.toCurrency,
          value: undefined,
          convertedValue: undefined,
          exchangeRate: undefined
      }
      this.convert = this.convert.bind(this);
      this.handleChangeFrom = this.handleChangeFrom.bind(this);
      this.handleChangeTo = this.handleChangeTo.bind(this);
  }

  handleChangeFrom(event){
      this.setState({fromCurrency: event.target.value});
  }

  handleChangeTo(event){
    this.setState({toCurrency: event.target.value});
  } 

  convert(){
      if(this.state.value === undefined || this.state.value < 0){
          alert("Please enter a valid value!");
          return;
      }
      if (this.state.fromCurrency === this.state.toCurrency){
          this.setState({convertedValue: this.state.value});
      }
      const apiKey = '7c478081950780fb862c'
      let query = `${this.state.fromCurrency}_${this.state.toCurrency}`;
      let url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${apiKey}`;
      fetch(url).then(response => response.json()).then(data => {
          let exchangeRate = (parseFloat(data[query])).toFixed(4);
          let convertedValue = (parseFloat(this.state.value * exchangeRate)).toFixed(2);
          this.setState({exchangeRate: exchangeRate})
          this.setState({convertedValue: convertedValue});
      })
      console.log(this.state);
  }

  render() {
    return(
      <div className="exchange">
        <div className="exchange-header">
        <p>FROM:</p>
        <select id="from-currency" data-testid="from-currency" value={this.state.fromCurrency} onChange={this.handleChangeFrom}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
        </select>
        <p>TO:</p>
        <select id="to-currency" data-testid="to-currency" value={this.state.toCurrency} onChange={this.handleChangeTo}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
        </select>
      </div>
      
      <input type="number" min="0" id="value" data-testid="enteredValue" placeholder={this.state.fromCurrency} onChange={(event) => {this.setState({value: event.target.value})}}/>
      <input type="button" data-testid="convert" value="Convert" onClick={this.convert}/>
      <h2 data-testid="converted-value">Converted value: {this.state.value == undefined ? 0 : this.state.convertedValue}</h2>
        <p data-testid="exchange-rate">Exchange rate: {this.state.exchangeRate == undefined ? 0 : this.state.exchangeRate}</p>
      </div>
    )
  }
}
    