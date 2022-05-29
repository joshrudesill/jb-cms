import {useEffect, useRef, useState} from "react"
import {db} from "./firebase/fb-utils"
import {collection, getDocs} from "firebase/firestore"
import _ from "lodash"
import { saveH, selectHeader } from "./data-selectors"

const App = () => {
  const [original, setOriginal] = useState({});
  const [updated, setUpdated] = useState({});
  const [h, setH] = useState('');
  const [ss, setSS] = useState(false);
  

  
  
  useEffect(() => {
    const fetch = async () => {
      const querySnap = await getDocs(collection(db, "sitedata"))
      var toAdd = {};
      var toAddu = {};
      querySnap.forEach((doc) => {
        if (doc.exists()) {
          const d = doc.data();
          if (d.lang === 'en') {
            toAdd.english = d; 
            toAddu.english = d; 
          } else if (d.lang === 'sp') {
            toAdd.spanish = d;
            toAddu.spanish = d;
          }
        }
      });
      setOriginal(toAdd);
      setUpdated(toAddu);
    }
    fetch();  
  }, []);

 
  const handleH = val => {
    console.log('hh');
    setH(val);
  }
  const handleSave = v => {
    var t = _.cloneDeep(updated);
    t.english.navbar.navlinks.home = v
    console.log(t);
    console.log(original);
    setUpdated({...t});

    console.log('save');
    console.log(original);
  }
  useEffect(() => {
    console.log(original);
    console.log('updatedo');
  }, [original]);

  return (
    <div>
      {original.english && updated.english? (
        <div className="App p-5">
            <label className="m-3">
              {
                original.english.navbar.navlinks.home
              }
              {
                updated.english.navbar.navlinks.home
              }
              
            </label>
            <input type='text' value={h} onChange={e => handleH(e.target.value)}></input>
            <button onClick={() => handleSave(h)}>SAVE</button>
            
          
          <h5>ORIG: {JSON.stringify(original.english.navbar.navlinks.home)}</h5>
          <h5>UPDATED: </h5>
        </div>
      ) : (
        <div>LOADING</div>
      )}
    </div>
  )
}

export default App
