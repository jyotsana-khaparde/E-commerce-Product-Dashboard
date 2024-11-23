import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import axios from "../utils/api";

const ProductModal = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (isOpen && productId) {
      axios.get(`/products/${productId}`).then(({ data }) => setProduct(data));
    }
  }, [isOpen, productId]);

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} loading="lazy" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ProductModal;
