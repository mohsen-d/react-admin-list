import utils from "../utils";

export const defaultPagination = {
  handler: (p) => {
    utils.setUrlParam([{ name: "page", value: p }]);
  },
  totalRecords: 0,
  recordsPerPage: 2,
  currentPage: 1,
};
