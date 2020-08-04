import React, { useState } from "react";
import Error from "./Error";

const Form = ({ saveSearch }) => {
  const [word, saveWord] = useState("");
  const [error, saveError] = useState("");

  const searchImages = (e) => {
    e.preventDefault();

    if (word.trim() === "") {
      saveError(true);
      return;
    }
    saveError(false);

    saveSearch(word);
  };
  return (
    <form onSubmit={searchImages}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Writte something"
            onChange={(e) => saveWord(e.target.value)}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="search"
          />
        </div>
      </div>
      {error ? (
        <Error message="Write a word in the field is a must to create a search" />
      ) : null}
    </form>
  );
};

export default Form;
