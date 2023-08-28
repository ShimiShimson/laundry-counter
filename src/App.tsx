import { useRef } from "react";

import "./App.css";

import { useFirebaseService } from "./firebase/useFirebase.service";

function App() {
  const { laundryCounts, handleDecrement, handleIncrement, handleInputChange } =
    useFirebaseService();

  const isPasswordCorrect = useRef<boolean>(false);

  const requestPassword = () => {
    if (!isPasswordCorrect.current) {
      const password = window.prompt("Wpisz hasło");
      if (password === "agatka") {
        isPasswordCorrect.current = true;
      } else {
        alert("Niewłaściwe hasło");
      }
    }
  };

  const handleClickPlus = (name: string) => {
    requestPassword();
    isPasswordCorrect.current && handleDecrement(name);
  };
  const handleClickMinus = (name: string) => {
    requestPassword();
    isPasswordCorrect.current && handleIncrement(name);
  };

  const handleClickInput = (name: string, value: string) => {
    requestPassword();
    isPasswordCorrect.current && handleInputChange(name, value);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Ilość prań</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {laundryCounts &&
            laundryCounts.map(({ name, number }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{number}</td>
                <td>
                  <button
                    className="decrement-button"
                    onClick={() => handleClickPlus(name)}
                  >
                    -
                  </button>
                  <button
                    className="increment-button"
                    onClick={() => handleClickMinus(name)}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="input-column">
        {laundryCounts &&
          laundryCounts.map(({ name }) => (
            <div key={name} className="input-row">
              <span>{name}</span>
              <input
                type="number"
                onClick={() => requestPassword()}
                onChange={(e) => handleClickInput(name, e.target.value)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
