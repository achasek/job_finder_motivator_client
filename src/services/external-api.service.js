import axios from "axios";

export const callExternalApi = async (options) => {
  try {
    const response = await axios(options.config);
    const { data, status } = response.data;
    return {
      data,
      status,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && response.data.message) {
        message = response.data.message;
      }
      console.log({message});
      return {
        data: null,
        status: null,
        error: {
          message,
        },
      };
    }

    console.log({error});

    return {
      data: null,
      status: null,
      error: {
        message: error.message,
      },
    };
  }
};
