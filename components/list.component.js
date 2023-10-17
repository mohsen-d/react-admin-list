import React, { useState, useEffect, useRef } from "react";

import * as utils from "../utils";

import {
  defaultAdd,
  defaultEdit,
  defaultOptions,
  defaultStyles,
} from "../defaults";

import { DynamicsContext, HandlersContext, StaticsContext } from "../context";

import { useUpdateEffect, useMultiRef } from "../hooks";

import {
  Body,
  Confirm,
  CurrentSearchInfo,
  EmptyList,
  Footer,
  FormPlaceholder,
  Header,
  ListCommands,
  Loading,
  Pagination,
} from ".";
import {
  useConfirm,
  useCurrentSize,
  useLoading,
  usePagination,
  useSearch,
  useSelection,
  useSort,
} from "../states";

let loadingtdColSpan = 2;

export function List({
  columns = [],
  data = [],
  search = {},
  sort = {},
  loading = {},
  styles = {},
  add,
  edit,
  remove,
  pagination = {},
  commands = [],
  options = {},
}) {
  const [status, setStatus] = useState("done");

  const listColumns = utils.getColumns(columns, data);
  const listOptions = Object.assign(defaultOptions, options);
  const listStyles = Object.assign(defaultStyles, styles);

  const handleAdd = add ?? defaultAdd;
  const handleEdit = edit ?? defaultEdit;
  const handleRemove = remove;

  loadingtdColSpan = listColumns.length + 2;

  const listTableElmRef = useRef();
  const listContainerElmRef = useRef();
  const stickyElmsRef = useMultiRef();

  const confirm = useConfirm();
  const currentSize = useCurrentSize();
  const [formToRender, setFormToRender] = useState();
  const [loadingInfo, setIsLoading] = useLoading(loading);
  const [paginationInfo, handlePageChange] = usePagination(
    pagination,
    data.length,
    setStatus
  );

  const [searchInfo, handleNewSearch] = useSearch(search, setStatus);
  const [selectedIds, handleSelection, handleSelectAll] = useSelection(
    data,
    listOptions.keyField
  );
  const [sortInfo, handleSortChange] = useSort(
    sort,
    listColumns,
    data,
    setStatus
  );

  if (listOptions.stickyTop)
    useEffect(() => {
      utils.makeStickyOnScroll(stickyElmsRef);
    }, []);

  useUpdateEffect(() => {
    if (status === "sortIt") {
      setStatus("sorting");
      runHandler(false, "sort", sortInfo.handler, sortInfo);
      setFormToRender("");
    }
  }, [status]);

  useUpdateEffect(() => {
    if (status === "changePage") {
      setStatus("changingPage");
      runHandler(
        false,
        "pagination",
        paginationInfo.handler,
        paginationInfo.currentPage
      );
    }
  }, [status]);

  useUpdateEffect(() => {
    if (status === "searchIt") {
      setStatus("searching");
      runHandler(false, "search", searchInfo.handler, searchInfo.keyword);
      if (formToRender === "search") setFormToRender("");
    }
  }, [status]);

  useEffect(() => {
    const tableWidth = listTableElmRef.current?.offsetWidth ?? 0;
    const containerWidth = listContainerElmRef.current.offsetWidth;
    tableWidth > containerWidth
      ? listTableElmRef.current?.parentNode.classList.add("table-responsive")
      : listTableElmRef.current?.parentNode.classList.remove(
          "table-responsive"
        );
  });

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
    args = [
      ...args,
      paginationInfo.recalculateInfo.bind(paginationInfo),
    ].filter((arg) => arg !== null);

    setIsLoading(true);
    loadingInfo.handler(handlerName, "started");
    await handler(...args);
    setIsLoading(false);
    loadingInfo.handler(handlerName, "ended");
  }

  const listData = utils.defaultFetch(
    data,
    !search.handler && listOptions.search,
    searchInfo,
    !sort.handler && listOptions.sort,
    sortInfo,
    !pagination.handler && listOptions.pagination,
    paginationInfo,
    status
  );

  return (
    <div>
      <div
        ref={listContainerElmRef}
        className={"position-relative " + listStyles.container}
      >
        <HandlersContext.Provider
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
          }}
        >
          <StaticsContext.Provider
            value={{
              columns: listColumns,
              options: listOptions,
              loadingtdColSpan,
              stickyElmsRef,
            }}
          >
            <DynamicsContext.Provider
              value={{
                searchInfo,
                selectedIds,
                paginationInfo,
                sortInfo,
                currentSize,
                loadingInfo,
              }}
            >
              {utils.listIsRealyEmpty(
                loadingInfo.isLoading,
                searchInfo.keyword,
                listData
              ) ? (
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

                  <div
                    ref={stickyElmsRef}
                    data-sticky-classes="bg-body z-3 py-1"
                  >
                    <ListCommands customCommands={commands} />
                    <FormPlaceholder formToRender={formToRender} />
                    <CurrentSearchInfo />
                  </div>

                  <div>
                    <table
                      ref={listTableElmRef}
                      className={"table " + listStyles.table}
                    >
                      <Header columns={listColumns} />
                      <Body list={listData} />
                      {listOptions.pagination && (
                        <Footer>
                          <Pagination
                            {...paginationInfo}
                            handler={handlePageChange}
                          />
                        </Footer>
                      )}
                    </table>
                  </div>
                </>
              )}
            </DynamicsContext.Provider>
          </StaticsContext.Provider>
        </HandlersContext.Provider>
      </div>
    </div>
  );
}
