import React, { useContext } from "react";
import { ListContext } from "../context";

import "../assets/list.style.css";

export function Command({
  title,
  icon,
  className,
  handler,
  listCommand = true,
  needsLoading = true,
  needsConfirm = true,
}) {
  const context = useContext(ListContext);

  return (
    <button
      type="button"
      onClick={() =>
        needsLoading
          ? context.runHandler(
              needsConfirm,
              title,
              handler,
              listCommand ? context.selectedIds : null
            )
          : handler()
      }
      className={className}
    >
      {icon && icon.length > 0 ? <i className={icon} /> : title}
    </button>
  );
}

export function CommandGroup({ commands }) {
  return (
    <div className="btn-group me-1" role="group">
      {commands.map((c, i) => (
        <Command key={i} {...c} />
      ))}
    </div>
  );
}

export function Commands({ commands }) {
  const output = [];

  commands.forEach((c) => {
    Array.isArray(c)
      ? output.push(<CommandGroup commands={c} />)
      : output.push(<Command {...c} />);
  });

  return output;
}

export function ListCommands({ customCommands }) {
  const context = useContext(ListContext);

  return (
    <div>
      <div className={context.selectedIds.length === 0 ? "d-inline" : "d-none"}>
        {context.options.new && (
          <Command
            title="new"
            icon="bi-plus"
            className="btn btn-outline-success me-1"
            handler={context.handleAdd}
            listCommand={false}
            needsConfirm={false}
          />
        )}

        {context.options.sort && (
          <Command
            icon="bi-sort-down"
            className="btn btn-outline-secondary me-1 d-lg-none"
            handler={() => {
              context.renderForm((currentForm) =>
                currentForm === "sort" ? "" : "sort"
              );
            }}
            listCommand={false}
            needsLoading={false}
            needsConfirm={false}
          />
        )}

        {context.options.search && (
          <Command
            icon="bi-search"
            className="btn btn-outline-secondary me-1 d-lg-none"
            handler={() => {
              context.renderForm((currentForm) =>
                currentForm === "search" ? "" : "search"
              );
            }}
            listCommand={false}
            needsLoading={false}
            needsConfirm={false}
          />
        )}
      </div>

      <div className={context.selectedIds.length === 0 ? "d-none" : "d-inline"}>
        {context.options.remove && context.handleRemove && (
          <Command
            title="remove"
            icon="bi-x"
            className="btn btn-outline-danger me-1"
            handler={context.handleRemove}
          />
        )}

        {context.options.edit && (
          <Command
            title="edit"
            icon="bi-pencil"
            className={
              context.selectedIds.length > 1
                ? "d-none"
                : "btn btn-outline-primary me-1"
            }
            handler={context.handleEdit}
            needsConfirm={false}
          />
        )}

        <Commands commands={customCommands} />
      </div>
    </div>
  );
}

export function RowCommands({ id }) {
  const context = useContext(ListContext);

  return (
    <>
      <div className="d-block text-center d-md-inline me-md-2">
        {context.options.multipleSelection && (
          <input
            id={id}
            type="checkbox"
            className="form_check_input form-check-input"
            onChange={context.handleSelection}
          />
        )}
      </div>

      {context.options.edit && (
        <div className="d-none d-md-inline me-md-2">
          <Command
            title="edit"
            icon="bi-pencil-square"
            className="btn text-secondary p-0"
            handler={() => context.handleEdit([id])}
            needsConfirm={false}
          />
        </div>
      )}

      {context.options.remove && context.handleRemove && (
        <div className="d-none d-md-inline">
          <Command
            title="remove"
            icon="bi-trash-fill"
            className="btn text-secondary p-0"
            handler={() => context.handleRemove([id])}
          />
        </div>
      )}
    </>
  );
}
