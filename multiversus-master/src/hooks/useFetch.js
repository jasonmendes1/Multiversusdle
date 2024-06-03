import { useState, useEffect } from "react";

// Custom Hook
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("Couldn't fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setError(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
