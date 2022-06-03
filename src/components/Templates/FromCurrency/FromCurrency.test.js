import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FromCurrency from './FromCurrency';

describe('FromCurrency', () => {
    it('renders without crashing', () => {
        render(<FromCurrency />);
    });

    it('renders the correct initial currency state', () => {
        render(<FromCurrency fromCurrency="CAD"  />);
        const fromCurrency = screen.getByTestId('from-currency');
        expect(fromCurrency.value).toBe('CAD');
    });

    it('should change currency state when the user changes the from currency', () => {
        render(<FromCurrency fromCurrency="CAD" />);
        const fromCurrency = screen.getByTestId('from-currency');
        expect(fromCurrency.value).toBe('CAD');
        fromCurrency.value = 'USD';
        expect(fromCurrency.value).toBe('USD');
    });

    it('Should match the snapshot', () => {
        const { container } = render(<FromCurrency fromCurrency="CAD" />);
        expect(container).toMatchSnapshot();
    });
});
