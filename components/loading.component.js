import React from "react";
import "../assets/list.style.css";
import { defaultLoading } from "../defaults";

export function Loading({ enable }) {
  return enable ? (
    <div className="loading d-flex justify-content-center bg-body position-absolute top-0 start-0 w-100 h-100">
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Please wait...</span>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export function getLoadingInfo(userLoading) {
  const result = {};
  Object.assign(result, defaultLoading, userLoading);
  return result;
}
