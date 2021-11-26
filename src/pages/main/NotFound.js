import React from "react";

export const NotFound = () => {
  return (
    <section className="d-flex flex-column text-center gap-5 p-3">
      <h1>
        <span className="fw-bold">Error 404:</span> Page not found.
      </h1>
      <div className="container">
        <img
          src="/404gandalf.jpg"
          alt="You Shall Not Pass! -by Gandalf"
          style={{ maxHeight: "60vh" }}
        />
      </div>
    </section>
  );
};
