import React from "react";

export default function GetStarted() {
  return (
    <>
      <div className="row lh-lg">
        <div className="col">
          <p className="logo fw-bolder text-center">
            <span className="text-info">R</span>
            <span
              className="text-primary"
              style={{ "--bs-text-opacity": ".7" }}
            >
              A
            </span>
            <span
              className="text-primary"
              style={{ "--bs-text-opacity": ".4" }}
            >
              L
            </span>
          </p>
          <h1 className="fw-bolder text-center text-primary">
            react-admin-list
          </h1>
          <h2 className="text-center text-body-tertiary h5">
            React list component for admin panels
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 mt-5">
          <div className="d-flex justify-content-between">
            <a
              className="with-hover border rounded-4 border-primary px-4 py-2"
              href="examples.html?demo=basic"
            >
              Docs
            </a>
            <a
              className="with-hover border rounded-4 border-primary px-4 py-2"
              href="/"
            >
              Demo
            </a>
            <a
              className="with-hover border rounded-4 border-primary px-4 py-2"
              href="https://github.com/mohsen-d/react-admin-list"
            >
              Source
            </a>
          </div>
        </div>
      </div>
      <div className="row bg-body-secondary mt-5 d-flex align-items-end">
        <div className="col-lg-8 col-xl-5 offset-xl-2 order-2 order-lg-1 text-center">
          <img src="reactadminlist.png" className="img-fluid" />
        </div>
        <div className="col-lg-4 col-xl-2 order-1 order-lg-2 pt-2 pb-3 text-center text-lg-start">
          <div className="h4 fw-light mt-3">
            <i class="bi bi-check-lg"></i> Styled by Bootstrap
          </div>
          <div className="h4 fw-light mt-3">
            <i class="bi bi-check-lg"></i> Responsive
          </div>
          <div className="h4 fw-light mt-3">
            <i class="bi bi-check-lg"></i> Customizable
          </div>
          <div className="h4 fw-light mt-3">
            <i class="bi bi-check-lg"></i>
            Out of the box
            <div className="h5 fw-light ps-lg-5 mt-2">
              <div className="mb-2">
                <i class="bi bi-dash d-none d-lg-inline"></i> Search
              </div>
              <div className="mb-2">
                <i class="bi bi-dash d-none d-lg-inline"></i> Sort
              </div>
              <div className="mb-2">
                <i class="bi bi-dash d-none d-lg-inline"></i> Paging
              </div>
              <div className="mb-2">
                <i class="bi bi-dash d-none d-lg-inline"></i> CRUD operations
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 mb-4">
        <div className="col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
          <div className="mb-4">
            <div className="steps h3">
              <i class="bi bi-box-seam text-secondary"></i> Install{" "}
            </div>
            <mark className="large">$ npm install react-admin-list</mark>
          </div>
          <div className="mb-4">
            <div className="steps h3">
              <i class="bi bi-box-arrow-in-down text-secondary"></i> Import{" "}
            </div>
            <mark className="large">import List from "react-admin-list"</mark>
          </div>
          <div>
            <div className="steps h3">
              <i class="bi bi-code text-secondary"></i> Use{" "}
            </div>
            <mark className="large">
              &lt;List data={"{"}data{"}"} /&gt;
            </mark>
          </div>
        </div>
      </div>
    </>
  );
}
