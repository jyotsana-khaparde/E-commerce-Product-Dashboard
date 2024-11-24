import React, { useEffect, useState } from "react";

import Modal from "react-modal";

const ProductModal = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (isOpen && productId) {
      setError(null); // Reset error before making a request
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch product (Status: ${response.status})`
            );
          }
          return response.json();
        })
        .then((data) => setProduct(data))
        .catch((error) => {
          setError("Unable to load product details. Please try again.");
          console.error("Error fetching product:", error);
        });
    }
  }, [isOpen, productId]);

  if (error) {
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <div>{error}</div>
        <button onClick={onClose}>Close</button>
      </Modal>
    );
  }

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{product.title}</h2>
      <img
        style={{ width: "200px" }}
        src={product.image}
        alt={product.title}
        loading="lazy"
      />
      <p>{product.description}</p>
      <p> Price: ${product.price}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ProductModal;
