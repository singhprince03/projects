import { useState } from 'react';

export const useApiGet = (url: string) => {
  const [resdata, setresData] = useState<string[] | any>(null);
  const [loading, setloading] = useState<boolean>(false);
  const getApiData = async () => {
    setloading(true);
    try {
      let response = await fetch(url);
      let responseData = await response.json();
      setresData(responseData.data);
      setloading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return [resdata, getApiData, loading];
};
// export default useApiGet;
