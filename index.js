import React, { useState } from "react";

import { defaultAdd, defaultEdit } from "./defaults";
import { ListContext } from "./context";
import utils from "./utils";
import { useUpdateEffect } from "./hooks";
import {
  Body,
  Confirm,
  CurrentSearchInfo,
  getLoadingInfo,
  getPaginationInfo,
  getSearchInfo,
  getSortInfo,
  Footer,
  FormPlaceholder,
  Header,
  ListCommands,
  Loading,
} from "./components";

let loadingtdColSpan = 2;

const options = {
  classes: "",
  multipleSelection: true,
  edit: true,
  remove: true,
  new: true,
  sort: true,
  search: true,
  pagination: true,
};

export default ({
  headers = [],
  data,
  search = {},
  sort = {},
  loading = {},
  add,
  edit,
  remove,
  pagination = {},
  commands,
  options: customOptions,
}) => {
  loadingtdColSpan = headers.length + 2;

  const listHeaders = utils.getHeaders(headers, data);
  const handleAdd = add ?? defaultAdd;
  const handleEdit = edit ?? defaultEdit;
  const handleRemove = remove;

  if (customOptions) Object.assign(options, customOptions);

  const [currentSize, setCurrentSize] = useState(utils.currentWindowWidth);
  const [selectedIds, setSelectedIds] = useState([]);
  const [formToRender, setFormToRender] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [handleConfirm, setHandleConfirm] = useState(() => () => {});
  const [loadingInfo, setLoadingInfo] = useState(getLoadingInfo(loading));
  const [sortInfo, setSortInfo] = useState(getSortInfo(sort, headers, data));
  const [searchInfo, setSearchInfo] = useState(getSearchInfo(search));
  const [paginationInfo, setPaginationInfo] = useState(
    getPaginationInfo(pagination, data)
  );

  utils.watchWindowWidth(setCurrentSize);

  function setIsLoading(isLoading) {
    setLoadingInfo((prev) => ({
      ...prev,
      isLoading,
    }));
  }

  function handleSelection(e) {
    setSelectedIds((currentIds) =>
      e.target.checked
        ? [...currentIds, e.target.id]
        : currentIds.filter((i) => i !== e.target.id)
    );
  }

  function handleSelectAll(e) {
    setSelectedIds(e.target.checked ? data.map((d) => d._id) : []);
  }

  async function handleSortChange(e) {
    e.preventDefault();

    let value = e.target.value || e.target.attributes["data-sortby"].value;
    let key = e.target.id || "sortBy";

    if (sortInfo.sortBy && value === sortInfo.sortBy) {
      key = "sortDirection";
      value = `${sortInfo.sortDirection * -1}`;
    }

    setSortInfo((prev) => {
      return { ...prev, [key]: value };
    });
  }

  useUpdateEffect(() => {
    runHandler(false, "sort", sortInfo.handler, sortInfo);

    setFormToRender("");
  }, [sortInfo]);

  function handlePageChange(p) {
    setPaginationInfo((prev) => ({
      ...prev,
      currentPage: p,
    }));
  }

  useUpdateEffect(() => {
    runHandler(
      false,
      "pagination",
      paginationInfo.handler,
      paginationInfo.currentPage
    );
  }, [paginationInfo]);

  function handleNewSearch(keyword) {
    setSearchInfo((prev) => ({
      ...prev,
      keyword: keyword,
    }));
  }

  useUpdateEffect(() => {
    runHandler(false, "search", searchInfo.handler, searchInfo.keyword);
    if (formToRender === "search") setFormToRender("");
  }, [searchInfo]);

  function handleConfirmCancel() {
    clearConfirmInfo();
  }

  function clearConfirmInfo() {
    setShowConfirm(false);
    setHandleConfirm(() => () => {});
  }

  async function runHandler(
    needsConfirm = true,
    handlerName,
    handler,
    ...args
  ) {
    if (needsConfirm) {
      setShowConfirm(true);
      setHandleConfirm(() => () => {
        clearConfirmInfo();
        runHandler(false, handlerName, handler, ...args);
      });
      return;
    }

    setIsLoading(true);
    loadingInfo.handler(handlerName, "started");
    const result = await handler(...args);
    setIsLoading(false);
    loadingInfo.handler(handlerName, "ended");
    return result;
  }

  return (
    <div className="row">
      <h2 className="col-12 col-lg-8 offset-lg-2 mb-2 text-info text-capitalize">
        List
      </h2>
      <div className="col-12 col-lg-8 offset-lg-2 position-relative">
        <ListContext.Provider
          value={{
            handleSelection,
            handleSelectAll,
            handleSortChange,
            handleNewSearch,
            handleAdd,
            handleEdit,
            handleRemove,
            runHandler,
            renderForm: setFormToRender,
            searchInfo,
            selectedIds,
            sortInfo,
            headers: listHeaders,
            options,
            currentSize,
            loadingtdColSpan,
          }}
        >
          <Loading enable={loadingInfo.isLoading && loadingInfo.disableList} />
          <Confirm
            show={showConfirm}
            onConfirm={handleConfirm}
            onCancel={handleConfirmCancel}
          />
          <ListCommands customCommands={commands} />
          <FormPlaceholder formToRender={formToRender} />
          <CurrentSearchInfo />
          <div>
            <table
              className={
                "table" + (options.classes ? " " + options.classes : "")
              }
            >
              <Header list={listHeaders} />
              <Body list={data} />
              {options.pagination && (
                <Footer
                  pagination={{ ...paginationInfo, handler: handlePageChange }}
                />
              )}
            </table>
          </div>
        </ListContext.Provider>
      </div>
    </div>
  );
};
