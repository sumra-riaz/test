import Request from "../network/Request";
import K from "../utils/constants";

export default class modalService {
  static getContacts(filter) {
    const request = new Request(
      `${K.Network.URL.modal.App}?companyId=560${
        filter?.type === "B" ? `&countryId=226` : ""
      }&noGroupDuplicates=1&page=${filter?.page ?? 1}${
        filter?.search ? `&query=${filter?.search}` : ""
      }`,
      K.Network.Method.GET,
      {},
      K.Network.Header.Type.Json,
      {},
      false
    );
    return request;
  }
}
