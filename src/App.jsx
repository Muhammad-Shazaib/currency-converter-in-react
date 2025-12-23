import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState("0.00");

  // Fetch exchange rates
  useEffect(() => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/${
  import.meta.env.VITE_EXCHANGE_API_KEY
}/latest/${fromCurrency}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Official API field
        setExchangeRates(response.data.conversion_rates);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      });
  }, []);

  // Convert currency
  useEffect(() => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const rate =
        exchangeRates[toCurrency] / exchangeRates[fromCurrency];

      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") setAmount(Number(value));
    if (name === "fromCurrency") setFromCurrency(value);
    if (name === "toCurrency") setToCurrency(value);
  };

  return (
    <div className="card">
      <h1 className="text-6xl">Currency Converter</h1>

      <div className="currency-exchange">
        {/* Amount */}
        <div className="input-container">
          <label className="input-label">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* From Currency */}
        <div className="input-container">
          <label className="input-label">From Currency</label>
          <select
            name="fromCurrency"
            value={fromCurrency}
            onChange={handleChange}
            className="input-field"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* To Currency */}
        <div className="input-container">
          <label className="input-label">To Currency</label>
          <select
            name="toCurrency"
            value={toCurrency}
            onChange={handleChange}
            className="input-field"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="output">
        <h2 className="output-text">
          Converted Amount: <b>{convertedAmount}</b>
        </h2>
      </div>
    </div>
  );
}

export default App;
