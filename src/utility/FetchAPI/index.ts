import AppConfig from "../AppConfig";

const FetchAPI = async (url: string, params?: {}) => {
  let returnData = {};

  // Execute the API request.
  await fetch(AppConfig.baseUrl + url, params)
    .then((response) => response.json())
    .then((data) => (returnData = data))
    .catch((err) => {
      console.info(err);
    });
  return returnData;
};
export default FetchAPI;
