import './App.css'
import { useFirebaseService } from './firebase/useFirebase.service';


function App() {
  
  const {
    laundryCounts,
    handleDecrement,
    handleIncrement
  } = useFirebaseService();


  return (
    <table>
      <thead>
        <tr>
          <th>Imię</th>
          <th>Ilość prań</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {laundryCounts && laundryCounts.map(({name, number}) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{number}</td>
            <td>
              <button onClick={() => handleDecrement(name)}>-</button>
              <button onClick={() => handleIncrement(name)}>+</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App
