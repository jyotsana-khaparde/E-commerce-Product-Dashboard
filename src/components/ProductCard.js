import React from "react";

const ProductCard = ({ product, onProductClick }) => {
  const { name, price, category, rating, image } = product;

  return (
    <div className="product-card" onClick={() => onProductClick(product.id)}>
      {/* Product Image */}
      <div className="product-card__image">
        <img src={image} alt={name} loading="lazy" />
      </div>

      {/* Product Details */}
      <div className="product-card__details">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__category">{category}</p>
        <p className="product-card__price">${price.toFixed(2)}</p>
        <div className="product-card__rating">
          <span>⭐ {rating.rate}</span> ({rating.count} reviews)
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
