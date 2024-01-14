import { useContext, createContext, useState, useEffect } from "react";

import { insertData, getData } from "../api/home";

export const HomeContext = createContext();

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};

const HomeProvider = ({ children }) => {
  const [data, setData] = useState([]);
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
      return response.data;
    } catch (error) {
        setErrors(error.response.data);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        data,
        insertImage,
        getImage,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
