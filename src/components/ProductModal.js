import React, { useEffect, useState } from "react";

import Modal from "react-modal";

const ProductModal = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && productId) {
      setLoading(true);
      setError(null);

      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product details.");
          }
          return response.json();
        })
        .then((data) => setProduct(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [isOpen, productId]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {loading && <div>Loading product details...</div>}
      {error && <div>{error}</div>}
      {!loading && product && (
        <>
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
        </>
      )}
    </Modal>
  );
};

export default ProductModal;
