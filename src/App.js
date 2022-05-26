import { useEffect, useState } from 'react';
import {db} from './firebase/fb-utils';
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [spanish, setSpanish] = useState();
  const [english, setEnglish] = useState();
  const fetch = async () => {
    
      const querySnap = await getDocs(collection(db, 'sitedata'));
      querySnap.forEach((doc) => {
        if(doc.exists()) {
          const data = doc.data();
          if (data.lang === 'sp') {
            setSpanish(data);
          } else {
            setEnglish(data);
          }
        }
      });
    
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(spanish);
    console.log(english);
  }, [spanish, english]);
  
  return (
    <div>
      {
      english ? 
      <div className="App">
        <h1>{english.navbar.navlinks.about}</h1>
        <h1>{spanish.navbar.navlinks.about}</h1>
      </div> 
      : 
      <div></div>
    }
    </div>
    
    
  );
}

export default App;
