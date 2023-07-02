import React, { useContext } from "react";
import { DynamicsContext, HandlersContext, StaticsContext } from "../context";

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
  const { selectedIds } = useContext(DynamicsContext);
  const { runHandler } = useContext(HandlersContext);

  return (
    <button
      type="button"
      onClick={() =>
        needsLoading
          ? runHandler(
              needsConfirm,
              title,
              handler,
              listCommand ? selectedIds : null
            )
          : handler()
      }
      className={className}
    >
      {icon && icon.length > 0 ? (
        <i data-testid="command-icon" className={icon} />
      ) : (
        title
      )}
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

  commands.forEach((c, i) => {
    Array.isArray(c)
      ? output.push(<CommandGroup key={i} commands={c} />)
      : output.push(<Command key={i} {...c} />);
  });

  return output;
}

export function ListCommands({ customCommands }) {
  const { selectedIds } = useContext(DynamicsContext);
  const { handleAdd, renderForm, handleRemove, handleEdit } =
    useContext(HandlersContext);
  const { options } = useContext(StaticsContext);

  return (
    <div>
      <div
        data-testid="add-sort-search-commands"
        className={selectedIds.length === 0 ? "d-inline" : "d-none"}
      >
        {options.new && (
          <Command
            title="new"
            icon="bi-plus"
            className="btn btn-outline-success me-1"
            handler={handleAdd}
            listCommand={false}
            needsConfirm={false}
          />
        )}

        {options.sort && (
          <Command
            icon="bi-sort-down"
            className="btn btn-outline-secondary me-1 d-lg-none"
            handler={() => {
              renderForm((currentForm) =>
                currentForm === "sort" ? "" : "sort"
              );
            }}
            listCommand={false}
            needsLoading={false}
            needsConfirm={false}
          />
        )}

        {options.search && (
          <Command
            icon="bi-search"
            className="btn btn-outline-secondary me-1 d-lg-none"
            handler={() => {
              renderForm((currentForm) =>
                currentForm === "search" ? "" : "search"
              );
            }}
            listCommand={false}
            needsLoading={false}
            needsConfirm={false}
          />
        )}
      </div>

      <div
        data-testid="remove-edit-custom-commands"
        className={selectedIds.length === 0 ? "d-none" : "d-inline"}
      >
        {options.remove && handleRemove && (
          <Command
            title="remove"
            icon="bi-x"
            className="btn btn-outline-danger me-1"
            handler={handleRemove}
          />
        )}

        {options.edit && (
          <Command
            title="edit"
            icon="bi-pencil"
            className={
              selectedIds.length > 1 ? "d-none" : "btn btn-outline-primary me-1"
            }
            handler={handleEdit}
            needsConfirm={false}
          />
        )}

        <Commands commands={customCommands} />
      </div>
    </div>
  );
}

export function RowCommands({ id }) {
  const { handleSelection, handleEdit, handleRemove } =
    useContext(HandlersContext);
  const { options } = useContext(StaticsContext);

  return (
    <div className="d-md-flex justify-content-between flex-grow-1">
      <div className="d-block text-center d-md-inline">
        {options.multipleSelection && (
          <input
            id={id}
            type="checkbox"
            className="form_check_input form-check-input"
            onChange={handleSelection}
          />
        )}
      </div>

      {options.edit && (
        <div className="d-none d-md-inline">
          <Command
            title="edit"
            icon="bi-pencil-square"
            className="btn text-secondary p-0"
            handler={() => handleEdit([id])}
            needsConfirm={false}
          />
        </div>
      )}

      {options.remove && handleRemove && (
        <div className="d-none d-md-inline">
          <Command
            title="remove"
            icon="bi-trash-fill"
            className="btn text-secondary p-0"
            handler={() => handleRemove([id])}
          />
        </div>
      )}
    </div>
  );
}
