
import { useEffect, useState } from 'react';
import  { collection, doc, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { LaundryCounts, LaundryItem } from '../shared/types/laundry-counts.type';

import db from './firebase';
import { LAUNDRY_COUNTS_INITIAL, Laundry_Counts_STRING } from '../shared/constants';

export const useFirebaseService = () => {
  const [laundryCounts, setLaundryCounts] = useState<LaundryCounts>();
  const collectionRef = collection(db, Laundry_Counts_STRING);

    
  useEffect(() => {

    query(collectionRef);

    // RESET DATABASE
    LAUNDRY_COUNTS_INITIAL.forEach(item => {
      setDoc(doc(db, Laundry_Counts_STRING, item.name), {
        name: item.name,
        number: item.number,
      });
    })

    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items: LaundryCounts = [];

      querySnapshot.forEach((item) => {
        if (item.data()) {
          items.push(item.data() as LaundryItem);
        }
      });

      if (items.length > 0) {
        setLaundryCounts(items);
      }

    });
    return () => {
      unsub();
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  
  
  const handleIncrement = (name: string) => {
    const record = laundryCounts?.find(item => item.name === name)

    record &&
      updateDoc(doc(db, Laundry_Counts_STRING, name), {
        number: record.number + 1,
      });

    };

  const handleDecrement = (name: string) => {
    const record = laundryCounts?.find((item) => item.name === name);

    record &&
      updateDoc(doc(db, Laundry_Counts_STRING, name), {
        number: record.number - 1,
      });
    };


  
  return {
    laundryCounts,
    handleIncrement,
    handleDecrement
  };
}
