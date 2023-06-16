import React, { useState, useEffect } from "react";

import { defaultAdd, defaultEdit, defaultOptions } from "./defaults";
import { ListContext } from "./context";
import utils from "./utils";
import { useUpdateEffect, useMultiRef } from "./hooks";
import {
  Body,
  Confirm,
  CurrentSearchInfo,
  EmptyList,
  listIsRealyEmpty,
  getPaginationInfo,
  getSearchInfo,
  getSortInfo,
  Footer,
  FormPlaceholder,
  Header,
  ListCommands,
  Loading,
} from "./components";
import {
  useConfirm,
  useCurrentSize,
  useLoading,
  usePagination,
  useSelection,
  useSort,
} from "./states";

let loadingtdColSpan = 2;

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
  commands = [],
  options = {},
}) => {
  const listHeaders = utils.getHeaders(headers, data);
  const listOptions = Object.assign(defaultOptions, options);
  const handleAdd = add ?? defaultAdd;
  const handleEdit = edit ?? defaultEdit;
  const handleRemove = remove;

  const stickyElmsRef = useMultiRef();

  loadingtdColSpan = listHeaders.length + 2;

  if (listOptions.stickyTop)
    useEffect(() => {
      utils.makeStickyOnScroll(stickyElmsRef);
    }, []);

  const confirm = useConfirm();
  const currentSize = useCurrentSize();
  const [formToRender, setFormToRender] = useState();
  const [loadingInfo, setIsLoading] = useLoading(loading);
  const [paginationInfo, handlePageChange] = usePagination(pagination, data);
  const [selectedIds, handleSelection, handleSelectAll] = useSelection(
    data,
    listOptions.keyField
  );
  const [sortInfo, handleSortChange] = useSort(sort, headers, data);

  const [searchInfo, setSearchInfo] = useState(getSearchInfo(search));

  useUpdateEffect(() => {
    runHandler(false, "sort", sortInfo.handler, sortInfo);

    setFormToRender("");
  }, [sortInfo]);

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

  async function runHandler(
    needsConfirm = true,
    handlerName,
    handler,
    ...args
  ) {
    if (needsConfirm) {
      confirm.setShow(true);
      confirm.setHandler(() => () => {
        confirm.clear();
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
            options: listOptions,
            currentSize,
            loadingtdColSpan,
            loadingInfo,
            stickyElmsRef,
          }}
        >
          {listIsRealyEmpty(loadingInfo.isLoading, searchInfo.keyword, data) ? (
            <EmptyList />
          ) : (
            <>
              <Loading
                enable={loadingInfo.isLoading && loadingInfo.disableList}
              />
              <Confirm
                show={confirm.show}
                onConfirm={confirm.handler}
                onCancel={confirm.cancel}
              />

              <div ref={stickyElmsRef} data-sticky-classes="bg-body z-3 py-1">
                <ListCommands customCommands={commands} />
                <FormPlaceholder formToRender={formToRender} />
                <CurrentSearchInfo />
              </div>

              <div>
                <table
                  className={
                    "table" +
                    (listOptions.classes ? " " + listOptions.classes : "")
                  }
                >
                  <Header list={listHeaders} />
                  <Body list={data} />
                  {listOptions.pagination && (
                    <Footer
                      pagination={{
                        ...paginationInfo,
                        handler: handlePageChange,
                      }}
                    />
                  )}
                </table>
              </div>
            </>
          )}
        </ListContext.Provider>
      </div>
    </div>
  );
};
