import {useEffect, useState} from "react"
import {db, sendData} from "./firebase/fb-utils"
import {collection, getDocs} from "firebase/firestore"
import _ from "lodash"
import { saveH, selectHeader } from "./data-selectors"
import Nav from "./components/nav"

const App = () => {
  const [original, setOriginal] = useState({});
  const [updated, setUpdated] = useState({});
  
  
  useEffect(() => {
    const fetch = async () => {
      const querySnap = await getDocs(collection(db, "sitedata"))
      var toAdd = {};
      querySnap.forEach((doc) => {
        if (doc.exists()) {
          const d = doc.data();
          if (d.lang === 'en') {
            toAdd.english = d; 
          } else if (d.lang === 'sp') {
            toAdd.spanish = d;
          }
        }
      });
      setOriginal(toAdd);
    }
    fetch();  
  }, []);

  useEffect(() => {
    const t = _.cloneDeep(original);
    setUpdated(t);
  }, [original]);
 
  
  
  const handleSave = v => {
    var t = updated;
    t.english.navbar.navlinks.home = v
    setUpdated({...t});
  }

  const handleSend = () => {
    sendData(updated.english);
  }

  return (
    <div>
      {original.english && updated.english? (
        <div className="App p-5">
          {
            //JSON.stringify(updated)
          }
            <Nav handleSave ={handleSave} selector={selectHeader} o={original} n={updated}/>
            <button onClick={() => handleSend()}>SAVE DATA</button>
        </div>
        
      ) : (
        <div>LOADING</div>
      )}
    </div>
  )
}

export default App
