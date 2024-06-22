
import React, { createContext, useState } from 'react';

export const BatchContext = createContext();

export const BatchProvider = ({ children }) => {
  const [batchData, setBatchData] = useState([]
    // name: '',
    // description: '',
    // startDate: ''
  );

 const updateBatchData = (name, description, startDate) => {
  setBatchData(prevBatchData => ({
    ...prevBatchData,
    name,
    description,
    startDate
  }));
};

  return (
    <BatchContext.Provider value={{ batchData, updateBatchData }}>
      {children}
    </BatchContext.Provider>
  );
};
