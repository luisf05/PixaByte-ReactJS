import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ImageList from "./components/imagesList";

function App() {
  const [search, saveSearch] = useState("");
  const [images, saveImages] = useState([]);
  const [currentPage, saveCurrentPage] = useState(1);
  const [totalPages, saveTotalPages] = useState(5);

  useEffect(() => {
    const api = async () => {
      if (search === "") return;

      const imagesPerPage = 10;
      const key = "17734955-834413b45304e3db82a0c4ac2";
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentPage}`;

      const response = await fetch(url);
      const result = await response.json();
      saveImages(result.hits);

      const totalPagesCalculate = Math.ceil(result.totalHits / imagesPerPage);
      saveTotalPages(totalPagesCalculate);

      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    api();
  }, [search, currentPage]);

  const previousPage = () => {
    const newCurrentPage = currentPage - 1;

    if (newCurrentPage === 0) return;

    saveCurrentPage(newCurrentPage);
  };

  const nextPage = () => {
    const newCurrentPage = currentPage + 1;

    if (newCurrentPage > totalPages) return;

    saveCurrentPage(newCurrentPage);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">PIxabay API + ReactJS</p>
        <Form saveSearch={saveSearch} />
      </div>

      <div className="row justify-content-center">
        <ImageList images={images} />

        {currentPage === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={previousPage}
          >
            &laquo; Previous
          </button>
        )}

        {currentPage === totalPages ? null : (
          <button type="button" className="bbtn btn-info" onClick={nextPage}>
            Next &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
