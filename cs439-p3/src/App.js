import React, { useState, useEffect } from 'react';

function App() {
  const [animalType, setAnimalType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [animalType, keyword]);

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const fetchImages = async () => {
    let apiUrl;
    if (animalType === 'both') {
      apiUrl = `https://api.unsplash.com/photos/random?count=10&query=dogs,cats,${keyword}&client_id=465DcHLSqViqfL61LPdLJMmETgqYtS5A3zKQM6eMAx4`;
    } else {
      apiUrl = `https://api.unsplash.com/photos/random?count=10&query=${animalType},${keyword}&client_id=465DcHLSqViqfL61LPdLJMmETgqYtS5A3zKQM6eMAx4`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    const imageUrls = data.map((image) => image.urls.regular);
    setImages(imageUrls);
  };

  return (
    <div>
      <form>
        <label>
          <input
            type="radio"
            value="cats"
            checked={animalType === 'cats'}
            onChange={handleAnimalTypeChange}
          />
          Cats
        </label>
        <label>
          <input
            type="radio"
            value="dogs"
            checked={animalType === 'dogs'}
            onChange={handleAnimalTypeChange}
          />
          Dogs
        </label>
        <label>
          <input
            type="radio"
            value="both"
            checked={animalType === 'both'}
            onChange={handleAnimalTypeChange}
          />
          Both
        </label>
        <br />
        <label>
          add a search term:
          <input type="text" value={keyword} onChange={handleKeywordChange} />
        </label>
      </form>
      {images.map((imageUrl) => (
        <img key={imageUrl} src={imageUrl} alt="random" width="300" height="200" />
      ))}
    </div>
  );
}

export default App;
