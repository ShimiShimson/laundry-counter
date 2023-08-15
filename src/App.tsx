import { useState } from 'react'
import './App.css'

 import { initializeApp } from 'firebase/app';
 import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { FIREBASE_CONFIG } from '../firebase';

const app = initializeApp(FIREBASE_CONFIG); // firebaseConfig is your Firebase configuration object const db = getFirestore(app); // db is a reference to the Firestore service
const db = getFirestore(app);

function App() {

  type LaundryCounts = {
    [name: string]: number;
  };

  const [laundryCounts, setLaundryCounts] = useState<LaundryCounts>({
    Tata: 0,
    Agata: 0,
    Wiktor: 0,
    Zosia: 0,
    Szymon: 0
  });

  const handleIncrement = (name: string) => {
    setLaundryCounts((prevState) => ({
      ...prevState,
      [name]: prevState[name] + 1,
    }));
  };

  const handleDecrement = (name: string) => {
    setLaundryCounts((prevState) => ({
      ...prevState,
      [name]: prevState[name] - 1,
    }));
  };

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
        {Object.entries(laundryCounts).map(([name, count]) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{count}</td>
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
