import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

const useFetchData = (searchKey: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCallbackData = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`https://radio.garden/api/search?q=${searchKey}`)
      .then(resp => {
        const filterCountryType = resp.data.hits.hits.filter(
          (l: any) => l._source.type !== 'country',
        );
        setData(filterCountryType);
        setLoading(false);
      });
  }, [searchKey]);
  useEffect(() => {
    fetchCallbackData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);
  return {data, loading};
};

export default useFetchData;
