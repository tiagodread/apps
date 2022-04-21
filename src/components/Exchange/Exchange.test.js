import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import Exchange from './Exchange';

it('renders without crashing', () => {
    render(<Exchange />);
});

it('renders the correct initial currency state', () => {
    render(<Exchange fromCurrency="CAD" toCurrency="EUR"/>);
    const fromCurrency = screen.getByTestId('from-currency');
    expect(fromCurrency.value).toBe('CAD');
    const toCurrency = screen.getByTestId('to-currency');
    expect(toCurrency.value).toBe('EUR');
});

it('should change currency state when the user changes the from currency', () => {
    render(<Exchange fromCurrency="CAD" toCurrency="EUR"/>);
    const fromCurrency = screen.getByTestId('from-currency');
    expect(fromCurrency.value).toBe('CAD');
    const toCurrency = screen.getByTestId('to-currency');
    expect(toCurrency.value).toBe('EUR');
    fromCurrency.value = 'USD';
    fireEvent.change(fromCurrency);
    expect(fromCurrency.value).toBe('USD');
    expect(toCurrency.value).toBe('EUR');
});

it('should change currency state when the user changes the to currency', () => {
    render(<Exchange fromCurrency="CAD" toCurrency="EUR"/>);
    const fromCurrency = screen.getByTestId('from-currency');
    expect(fromCurrency.value).toBe('CAD');
    const toCurrency = screen.getByTestId('to-currency');
    expect(toCurrency.value).toBe('EUR');
    toCurrency.value = 'USD';
    fireEvent.change(toCurrency);
    expect(fromCurrency.value).toBe('CAD');
    expect(toCurrency.value).toBe('USD');
});

it('should load converted value as 0 if value is undefined', () => {
    render(<Exchange fromCurrency="CAD" toCurrency="BRL"/>)
    const convertedValue = screen.getByTestId('converted-value').textContent
    expect(convertedValue).toBe('Converted value: 0')
});

it('Should convert from CAD to BRL', async () => {
    render(<Exchange fromCurrency="CAD" toCurrency="BRL"/>)
    const enteredValue = screen.getByTestId('enteredValue');
    fireEvent.change(enteredValue, {target: {value: '10'}})
    const convert = screen.getByTestId('convert');
    fireEvent.click(convert);
    await waitFor(() => screen.getByTestId('converted-value'))
    const convertedValue = screen.getByTestId('converted-value').textContent
    expect(convertedValue).toBe('Converted value: 36.73')

});