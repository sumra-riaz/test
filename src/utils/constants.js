const K = {
  Network: {
    URL: {
      Base: "https://api.dev.pastorsline.com/api/",
      BaseAPI: "https://api.dev.pastorsline.com/api/",

      modal: {
        App: "contacts.json",
      },
    },

    Method: {
      GET: "GET",
      PUT: "PUT",
      POST: "POST",
      PATCH: "PATCH",
      DELETE: "DELETE",
    },

    Header: {
      ContentType: "Content-Type",
      ApplicationJson: "application/json",
      Default: (token = "") => ({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      }),
      Authorization: (token = "") => ({
        Authorization: "Bearer " + token,
      }),
      Type: {
        Json: "json",
        File: "file",
      },
    },
    ResponseType: { Blob: "blob", Json: "json" },
    StatusCode: {
      NotModified: 304,
      Unauthorized: 401,
      Forbidden: 403,
      NotFound: 404,
      InternalServerError: 500,
    },
  },
};

export default K;
