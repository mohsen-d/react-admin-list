import React, { useEffect, useState } from "react";

import ListContext from "./context/list.context";
import utils from "./utils";
import { useUpdateEffect } from "./hooks";
import Body from "./components/body.component";
import Confirm from "./components/confirm.component";
import { CurrentSearchInfo } from "./components/search.component";
import { getSortInfo } from "./components/sort.component";
import Footer from "./components/footer.component";
import FormPlaceholder from "./components/formPlaceHolder.component";
import Header from "./components/header.component";
import { ListCommands } from "./components/command.component";
import Loading from "./components/loading.component";

let loadingtdColSpan = 2;

const initialSize = document.body.clientWidth;

const options = {
  classes: "",
  multipleSelection: true,
  edit: true,
  delete: true,
  new: true,
  sort: true,
  search: true,
  pagination: true,
};

export default ({
  headers = [],
  data,
  search: { keyword, handler: handleSearch },
  sort = {},
  loading,
  handleNew,
  handleEdit,
  handleDelete,
  pagination,
  commands,
  options: customOptions,
}) => {
  loadingtdColSpan = headers.length + 2;

  const listHeaders = utils.getHeaders(headers, data);

  if (customOptions) Object.assign(options, customOptions);

  const [currentSize, setCurrentSize] = useState(initialSize);
  const [selectedIds, setSelectedIds] = useState([]);
  const [formToRender, setFormToRender] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [handleConfirm, setHandleConfirm] = useState(() => () => {});
  const [sortInfo, setSortInfo] = useState(getSortInfo(sort, headers, data));

  utils.currentWindowSize(setCurrentSize);

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

  async function handlePageChange(p) {
    await runHandler(false, "pagination", pagination.handler, p);
  }

  async function handleNewSearch(keyword) {
    await runHandler(false, "search", handleSearch, keyword);
    if (formToRender === "search") setFormToRender("");
  }

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
    loading.handler(handlerName, "started");
    const result = await handler(...args);
    setIsLoading(false);
    loading.handler(handlerName, "ended");
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
            handleNew,
            handleEdit,
            handleDelete,
            runHandler,
            renderForm: setFormToRender,
            keyword,
            selectedIds,
            sortInfo,
            headers: listHeaders,
            options,
            currentSize,
            loadingtdColSpan,
          }}
        >
          <Loading enable={isLoading && loading.disableList} />
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
                  pagination={{ ...pagination, handler: handlePageChange }}
                />
              )}
            </table>
          </div>
        </ListContext.Provider>
      </div>
    </div>
  );
};
