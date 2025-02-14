import FetchRadioData from "../services/apiService";

const RadioController = {
    getData: async () => {
        try {
            const data = await FetchRadioData();
            return data;
        } catch {
            console.error("Error in search function in RadioController");
            return [];
        }
    }
}

export default RadioController;