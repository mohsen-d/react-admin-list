import utils from "../utils";

export const defaultSearch = {
  handler: (k) => {
    utils.setUrlParam([{ name: "keyword", value: k }]);
  },
  keyword: "",
};
