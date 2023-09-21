import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import K from "../utils/constants";
import { message } from "antd";

export default class NetworkCall {
  static async fetch(request, useLoading = true) {
    try {
      const response = useLoading
        ? await trackPromise(
            NetworkCall.axios({
              method: request.method,
              url: request.url,
              data: request.body,
              headers: request.headers,
              responseType: request.responseType,
              validateStatus: (status) => {
                return (
                  (status >= 200 && status < 300) ||
                  status === K.Network.StatusCode.NotModified
                );
              },
            })
          )
        : await NetworkCall.axios({
            method: request.method,
            url: request.url,
            data: request.body,
            headers: request.headers,
            responseType: request.responseType,
            validateStatus: (status) => {
              return (
                (status >= 200 && status < 300) ||
                status === K.Network.StatusCode.NotModified
              );
            },
          });

      console.log("NetworkCall Data: ", response.data);
      return response.data;
    } catch (err) {
      let error = err.response;
      console.log("NetworkCall Error: ", error);
      if (error === undefined) {
        message.error("Cannot connect to server");
        return Promise.reject({
          error: error,
        });
      } else if (error.status === K.Network.StatusCode.Unauthorized) {
        message.error(error.data.message);
        // if (User.getToken()) {
        //   User.logoutCall("User unauthorized");
        // }
      } else if (error.status === K.Network.StatusCode.Forbidden) {
        message.error(error.data.message);
      } else message.error(error.data.message);

      if ("errors" in error.data)
        return Promise.reject({
          error: error,
          message: error.data.message,
          statusCode: error.status,
        });
    }
  }
}

NetworkCall.axios = axios.create({
  baseURL: K.Network.URL.BaseAPI,
  timeout: K.Network.Timeout,
  headers: {},
});
