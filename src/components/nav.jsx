import { useEffect, useState } from "react";

const Nav = ({ handleSave, selector, o, n }) => {
  const [navState, setNavState] = useState();
  const [h, setH] = useState('');
  
  useEffect(() => {
    const state = selector(o,n);
    setNavState(state);
  }, [selector, setNavState, o, n]);

  const handleH = val => {
    setH(val);
  }

  return (
    navState ? 
    <div>
      {
        navState.orig.eng.navlinks.home + ' : '
      }
          
      {
        navState.updated.eng.navlinks.home
      }
      <input className='mx-4' type='text' value={h} onChange={e => handleH(e.target.value)}></input>
      <button onClick={() => handleSave(h)}>SAVE</button>
    </div> : <div>LOADING</div>
  ) 
}

export default Nav;