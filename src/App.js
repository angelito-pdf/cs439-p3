import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [keyword, setKeyword] = useState("");
  const [animal, setAnimal] = useState("both");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const apiUrl = `https://api.unsplash.com/photos/random?count=10&query=${keyword}${
      animal !== "both" ? "&orientation=" + animal : ""
    }&client_id=465DcHLSqViqfL61LPdLJMmETgqYtS5A3zKQM6eMAx4`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword, animal]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value);
  };

  return (
    <div>
      <h1>Animals and Stuff</h1>
      <h2>Are you a cat person or a dog person?</h2>
      <div>
        <button onClick={handleAnimalChange} value="cats">
          Cats
        </button>
        <button onClick={handleAnimalChange} value="dogs">
          Dogs
        </button>
        <button onClick={handleAnimalChange} value="both">
          Both
        </button>
      </div>
      <input type="text" placeholder="Enter a keyword" onChange={handleKeywordChange} />
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
