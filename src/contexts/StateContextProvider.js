import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-web-search1.p.rapidapi.com/?query=World%20Cup&limit=300&related_keywords=true';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}?q=${searchTerm}&tbm=search`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '344ecb37femshadeecfda2f791fdp14e6a9jsnf277890ae45b',
          'X-RapidAPI-Host': 'google-web-search1.p.rapidapi.com',
        },
      });

      const data = await res.json();

      setResults(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
