import React, { useState } from "react";

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    try {
      if (!prompt.trim()) return;

      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/generate-image?prompt=${encodeURIComponent(prompt)}`
      );

      const data = await response.json();
      console.log("API Response:", data);

      // ✅ FIX: ensure it's always an array
      const urls = Array.isArray(data) ? data : (data.imageUrls || data.results || []);

      setImageUrls(urls);

    } catch (error) {
      console.log("Error generating image:", error);
      setImageUrls([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Image of your choice</h2>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for image"
      />

      <button className="generate-btn" onClick={generateImage}>
        {loading ? "Generating..." : "Generate Image"}
      </button>

      <div className="image-grid">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Generated ${index}`} />
        ))}

        {!loading &&
          [...Array(Math.max(0, 4 - imageUrls.length))].map((_, index) => (
            <div key={index} className="empty-image-slot"></div>
          ))}
      </div>
    </div>
  );
}

export default ImageGenerator;