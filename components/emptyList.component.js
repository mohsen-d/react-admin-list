import React, { useContext } from "react";
import { Command } from "./command.component";
import { ListContext } from "../context";

export function EmptyList() {
  const context = useContext(ListContext);

  if (context.loadingInfo.isLoading) return <span>Loading...</span>;
  if (context.searchInfo.keyword !== "")
    return (
      <span>
        Found no match for keyword{" "}
        <i>
          <b>{context.searchInfo.keyword}</b>
        </i>
      </span>
    );

  return (
    <div className="text-center my-5">
      <span>
        <b>No records yet. </b>
      </span>
      {context.options.new && (
        <Command
          title="Create Your First"
          className="btn btn-success pt-1"
          handler={context.handleAdd}
          listCommand={false}
          needsConfirm={false}
        />
      )}
    </div>
  );
}

export function listIsRealyEmpty(isLoading, keyword, data) {
  return data.length === 0 && !isLoading && keyword === "";
}
