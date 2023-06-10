import utils from "../utils";

export const defaultNew = () => {
  utils.setUrlParam([{ name: "page", value: "new" }]);
};
