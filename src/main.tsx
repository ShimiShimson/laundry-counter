import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import the functions you need from the SDKs you need

import 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

import { FIREBASE_CONFIG } from "../firebase.ts";

const firebaseConfig = FIREBASE_CONFIG;
console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Create a new collection in the database
// Laundry counts
const myCollection = collection(db, 'Laundry_Counts');

addDoc(myCollection, { field1: 'value1', field2: 'value2', });

// read data from collection
getDocs(myCollection)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  });


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
