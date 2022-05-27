import { useEffect, useState } from 'react';
import {db} from './firebase/fb-utils';
import { collection, getDocs } from "firebase/firestore";
import _ from 'lodash';

const App = () => {
  const [spanish, setSpanish] = useState();
  const [english, setEnglish] = useState();
  const [englishUpdated, setEnglishUpdated] = useState();
  const [spanishUpdated, setSpanishUpdated] = useState();
  
  const fetch = async () => {
      const querySnap = await getDocs(collection(db, 'sitedata'));
      querySnap.forEach((doc) => {
        if(doc.exists()) {
          const data = doc.data();
          if (data.lang === 'sp') {
            setSpanish(data);
            setSpanishUpdated(data);
          } else {
            setEnglish(data);
            setEnglishUpdated(data);
          }
        }
      });
  }

  useEffect(() => {
    fetch();
  }, []);
  

  const handleSubmit = val => {
    console.log(val);
    //_.get(englishUpdated, val);
  }
  
  return (
    <div>
      {
      english ? 
      <div className="App p-5">
        <form>
          <label className='m-3'>
            {english.navbar.navlinks.home + ' : ' + englishUpdated.navbar.navlinks.home} 
          </label>
          <input></input>
          <input type='submit' onSubmit={e => handleSubmit(e.target.value)}></input>
        </form>
        <h5>ORIG: {JSON.stringify(english.navbar.navlinks)}</h5>
        <h5>UPDATED: {JSON.stringify(englishUpdated.navbar.navlinks)}</h5>
      </div> 
      : 
      <div>LOADING</div>
    }
    </div>
    
    
  );
}

export default App;
