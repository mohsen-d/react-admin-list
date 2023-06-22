import React, { useContext } from "react";
import { Command } from "./command.component";
import { DynamicsContext, HandlersContext, StaticsContext } from "../context";

export function EmptyList() {
  const { loadingInfo, searchInfo } = useContext(DynamicsContext);
  const { options } = useContext(StaticsContext);
  const { handleAdd } = useContext(HandlersContext);

  if (loadingInfo.isLoading) return <span>Loading...</span>;
  if (searchInfo.keyword !== "")
    return (
      <span>
        Found no match for keyword{" "}
        <i>
          <b>{searchInfo.keyword}</b>
        </i>
      </span>
    );

  return (
    <div className="text-center my-5">
      <span>
        <b>No records yet. </b>
      </span>
      {options.new && (
        <Command
          title="Create Your First"
          className="btn btn-success pt-1"
          handler={handleAdd}
          listCommand={false}
          needsConfirm={false}
        />
      )}
    </div>
  );
}
