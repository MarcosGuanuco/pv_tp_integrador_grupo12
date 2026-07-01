import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('adminSession');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('adminSession', JSON.stringify(admin));
    } else {
      localStorage.removeItem('adminSession');
    }
  }, [admin]);

  const loginAdmin = (nombre, sector) => {
    setAdmin({ nombre, sector });
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};