import FetchRadioData from "../services/apiService";

const RadioController = {
  getData: async ({ searchParam, source }: { searchParam?: string; source?: string }) => {
    try {
      const data = await FetchRadioData({
        searchParam: searchParam,
        source: source,
      });
      return data;
    } catch {
      console.error("Error in search function in RadioController");
      return [];
    }
  },
};

export default RadioController;
