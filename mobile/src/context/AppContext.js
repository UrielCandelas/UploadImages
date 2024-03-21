import { useContext, createContext, useState, useEffect } from "react";

import { insertData, getData } from "../api/app.js";

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  //const [data2, setData2] = useState([]);
  const [errors, setErrors] = useState([]);

  const insertImage = async (data) => {
    try {
      const response = await insertData(data);
      return response.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getImage = async () => {
    try {
      const response = await getData();
      setData(response.data);
      //setData([]);
      return response.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        insertImage,
        getImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
