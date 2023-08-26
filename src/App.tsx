import "./App.css";
import { useFirebaseService } from "./firebase/useFirebase.service";

function App() {

  const { laundryCounts, handleDecrement, handleIncrement, handleInputChange } =
    useFirebaseService();
  
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
                onChange={(e) => handleInputChange(name, e.target.value)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
