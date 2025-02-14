const FetchRadioData = async ({ searchParam }: { searchParam?: string }) => {
  try {
    if (searchParam) {
      const apiResponse = await fetch("https://de1.api.radio-browser.info/json/stations/search?limit=10&name=" + searchParam).then(
        (response) => response.json()
      );
      return apiResponse;
    } else {
      const apiResponse = await fetch("https://de1.api.radio-browser.info/json/stations/search?limit=10").then((response) =>
        response.json()
      );
      return apiResponse;
    }
  } catch (error) {
    console.error("Error in apiResponse call in apiService.", error);
    return [];
  }
};

export default FetchRadioData;
