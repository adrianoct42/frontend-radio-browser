const FetchRadioData = async ({ searchParam, source }: { searchParam?: string; source?: string }) => {
  try {
    let apiUrl = "https://de1.api.radio-browser.info/json/stations/search?limit=10";
    if (searchParam) {
      apiUrl += `&name=${searchParam}`;
    } else if (source === "US") {
      apiUrl += `&countrycode=${source}`;
    } else if (source === "english") {
      apiUrl += `&language=${source}`;
    }

    return await fetch(apiUrl).then((response) => response.json());
  } catch (error) {
    console.error("Error in apiResponse call in apiService.", error);
    return [];
  }
};

export default FetchRadioData;
