

export const selectHeader = (o, n) => {
  return {
    orig: {eng : o.english.navbar, sp : o.spanish.navbar}, 
    updated : {eng : n.english.navbar, p : n.spanish.navbar}
  };
}

export const saveH = (u, v) => {
  const tc = {...u};
  tc.english.navbar.navlinks.home = v;
  console.log('fire');
  return tc;
}
