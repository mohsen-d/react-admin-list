import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { DynamicsContext } from "../context";

import "../assets/list.style.css";

export function Confirm({ show, onConfirm, onCancel }) {
  const { currentSize } = useContext(DynamicsContext);
  const modalWidth = getModalWidth(currentSize);

  return show
    ? createPortal(
        <div className="loading  d-flex justify-content-center align-items-center bg-body position-absolute top-0 start-0 w-100 h-100">
          <div
            className={
              modalWidth +
              " d-flex flex-column border shadow-sm rounded justify-content-center bg-body py-3 px-2"
            }
          >
            <h4>
              <b>Confirm</b>
            </h4>
            <div className="mb-3">Are you sure?</div>
            <div className="d-flex justify-content-end">
              <button
                onClick={onConfirm}
                type="button"
                className="btn btn-success me-1"
              >
                Yes, Proceed
              </button>
              <button
                onClick={onCancel}
                type="button"
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : "";
}

function getModalWidth(currentSize) {
  switch (true) {
    case currentSize >= 992:
      return "w-25";
    case currentSize >= 768:
      return "w-50";
    case currentSize < 768:
      return "w-75";
  }
}
