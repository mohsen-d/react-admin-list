import * as utils from "../utils";

export const defaultPagination = {
  handler: (p) => {
    utils.setUrlParam([{ name: "page", value: p }]);
  },
  totalRecords: 0,
  recordsPerPage: 10,
  currentPage: 1,
};
