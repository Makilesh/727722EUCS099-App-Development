// src/utils.js
export const shouldShowNavbarAndFooter = (pathname) => {
    const pathsWithoutNavbarAndFooter = ['/login', '/register', '/checkout'];
    return !pathsWithoutNavbarAndFooter.includes(pathname);
  };
  