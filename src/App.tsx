import { useRef } from "react";

import "./App.css";

import { useFirebaseService } from "./firebase/useFirebase.service";

function App() {
  const { laundryCounts, handleDecrement, handleIncrement, handleInputChange } =
    useFirebaseService();
  
  const isPasswordCorrect = useRef<boolean>(false);


  const requestPassword = () => {
    console.log('onFocus triggered')
    if (!isPasswordCorrect.current) {
      const password = window.prompt("Wpisz hasło");
      if (password === "agatka") {
        isPasswordCorrect.current = true;
      } else {
        alert("Niewłaściwe hasło");
      }
    }

  }

  const handleClickInput = (name: string, value: string) => {
    requestPassword();
    if (isPasswordCorrect.current) {
      handleInputChange(name, value);
    } else {
      alert("Niewłaściwe hasło");
    }
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
                    onClick={() => handleDecrement(name)}
                  >
                    -
                  </button>
                  <button
                    className="increment-button"
                    onClick={() => handleIncrement(name)}
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
