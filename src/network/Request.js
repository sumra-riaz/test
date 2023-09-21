import K from "../utils/constants";

export default class Request {
  constructor(
    relativeURL,
    method = K.Network.Method.GET,
    body = null,
    defaultHeaderType = K.Network.Header.Type.Json,
    headers = {},
    responseType = K.Network.ResponseType.Json
  ) {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4";
    headers = {
      ...(defaultHeaderType === K.Network.Header.Type.Json
        ? K.Network.Header.Default(token)
        : K.Network.Header.Authorization(token)),
      ...headers,
    };
    this.url = K.Network.URL.BaseAPI + relativeURL;
    this.method = method;
    this.body = body;
    this.headers = headers;
    this.responseType = responseType;
  }
}
