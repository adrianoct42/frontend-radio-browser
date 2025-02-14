import FetchRadioData from "../services/apiService";

const RadioController = {
  getData: async ({ searchParam }: { searchParam?: string }) => {
    try {
      const data = await FetchRadioData({
        searchParam: searchParam,
      });
      return data;
    } catch {
      console.error("Error in search function in RadioController");
      return [];
    }
  },
};

export default RadioController;
