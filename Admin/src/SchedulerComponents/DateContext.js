import React, { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [clickedDate, setClickedDate] = useState(null);

  return (
    <DateContext.Provider value={{ clickedDate, setClickedDate }}>
      {children}
    </DateContext.Provider>
  );
};
