import utils from "../utils";

export const defaultEdit = (id) => {
  utils.setUrlParam([{ name: "edit", value: id }]);
};
