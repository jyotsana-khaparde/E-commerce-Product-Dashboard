import React, { useEffect, useState } from "react";

import Modal from "react-modal";

const ProductModal = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (isOpen && productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Failed to load product:", error));
    }
  }, [isOpen, productId]);

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
