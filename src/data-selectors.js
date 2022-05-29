

export const selectHeader = (o, n) => {
  return {
    orig: [o.english.navbar.navlinks.home, o.spanish.navbar.navlinks.home], 
    updated : [n.english.navbar.navlinks.home, n.spanish.navbar.navlinks.home]
  };
}

export const saveH = (u, v) => {
  const tc = {...u};
  tc.english.navbar.navlinks.home = v;
  console.log('fire');
  return tc;
}
