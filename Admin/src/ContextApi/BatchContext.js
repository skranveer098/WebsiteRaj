
import React, { createContext, useState } from 'react';

export const BatchContext = createContext();

export const BatchProvider = ({ children }) => {
  const [batchData, setBatchData] = useState([]);

const updateBatchData = (name, description, startDate) => {
  const adjustedStartDate = new Date(startDate);
  adjustedStartDate.setDate(adjustedStartDate.getDate() - 1); // Subtract one day
  setBatchData({ name, description, startDate: adjustedStartDate.toISOString() });
};


  return (
    <BatchContext.Provider value={{ batchData, updateBatchData }}>
      {children}
    </BatchContext.Provider>
  );
};
