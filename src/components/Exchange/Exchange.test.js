import { render, screen, fireEvent } from "@testing-library/react";
import Exchange from "./Exchange";

describe("Exchange", () => {
  it("renders without crashing", () => {
    render(<Exchange />);
  });

  it("Should match the snapshot", () => {
    const { container } = render(<Exchange />);
    expect(container).toMatchSnapshot();
  });

  it("renders the correct initial currency state", () => {
    render(<Exchange fromCurrency="CAD" toCurrency="EUR" />);
    const fromCurrency = screen.getByTestId("from-currency");
    expect(fromCurrency.value).toBe("CAD");
    const toCurrency = screen.getByTestId("to-currency");
    expect(toCurrency.value).toBe("EUR");
  });

  it("should change currency state when the user changes the from currency", () => {
    render(<Exchange fromCurrency="CAD" toCurrency="EUR" />);
    const fromCurrency = screen.getByTestId("from-currency");
    expect(fromCurrency.value).toBe("CAD");
    fromCurrency.value = "USD";
    expect(fromCurrency.value).toBe("USD");
  });

  it("should change currency state when the user changes the to currency", () => {
    render(<Exchange fromCurrency="CAD" toCurrency="EUR" />);
    const toCurrency = screen.getByTestId("to-currency");
    expect(toCurrency.value).toBe("EUR");
    toCurrency.value = "USD";
    expect(toCurrency.value).toBe("USD");
  });

  it("should show an window alert if the value is undefined or 0", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Exchange fromCurrency="CAD" toCurrency="EUR" />);
    const convertButton = screen.getByTestId("convert");
    fireEvent.click(convertButton);
    expect(window.alert).toHaveBeenCalled();
    const enteredValue = screen.getByTestId("enteredValue");
    enteredValue.value = "0";
    fireEvent.click(convertButton);
    expect(window.alert).toHaveBeenCalled();
  });

  it("Should fetch the exchange rate when the user clicks the convert button", async () => {
    render(<Exchange fromCurrency="CAD" toCurrency="EUR" />);
    const enteredValue = screen.getByTestId("enteredValue");
    fireEvent.change(enteredValue, { target: { value: "5" } });
    const convertButton = screen.getByTestId("convert");
    fireEvent.click(convertButton);
    await screen.findByTestId("exchange-result");
  });
});
