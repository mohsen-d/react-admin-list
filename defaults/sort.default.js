import * as utils from "../utils";

export const defaultSort = {
  handler: ({ sortBy, sortDirection }) => {
    utils.setUrlParam([
      { name: "sortby", value: sortBy },
      { name: "sortdirection", value: sortDirection },
    ]);
  },
  sortBy: "",
  sortDirection: "1",
  sortFields: [],
};
