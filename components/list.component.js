import React, { useState, useEffect } from "react";

import { defaultAdd, defaultEdit, defaultOptions } from "../defaults";
import { DynamicsContext, HandlersContext, StaticsContext } from "../context";
import * as utils from "../utils";
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
  children,
}) {
  const listHeaders = utils.getHeaders(headers, data);
  const listOptions = Object.assign(defaultOptions, options);

  const handleAdd = add ?? defaultAdd;
  const handleEdit = edit ?? defaultEdit;
  const handleRemove = remove;

  loadingtdColSpan = listHeaders.length + 2;

  const stickyElmsRef = useMultiRef();
  const confirm = useConfirm();
  const currentSize = useCurrentSize();
  const [formToRender, setFormToRender] = useState();
  const [loadingInfo, setIsLoading] = useLoading(loading);
  const [paginationInfo, handlePageChange] = usePagination(pagination, data);
  const [searchInfo, handleNewSearch] = useSearch(search);
  const [selectedIds, handleSelection, handleSelectAll] = useSelection(
    data,
    listOptions.keyField
  );
  const [sortInfo, handleSortChange] = useSort(sort, headers, data);

  if (listOptions.stickyTop)
    useEffect(() => {
      utils.makeStickyOnScroll(stickyElmsRef);
    }, []);

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
      <div className="col-12 col-lg-8 offset-lg-2 position-relative">
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
              headers: listHeaders,
              options: listOptions,
              loadingtdColSpan,
              stickyElmsRef,
            }}
          >
            <DynamicsContext.Provider
              value={{
                searchInfo,
                selectedIds,
                sortInfo,
                currentSize,
              }}
            >
              {utils.listIsRealyEmpty(
                loadingInfo.isLoading,
                searchInfo.keyword,
                data
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
                    <table className={"table " + listOptions.classes}>
                      <Header list={listHeaders} />
                      <Body list={data} />
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
