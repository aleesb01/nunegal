import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { id, imgUrl, brand, model, price } = product;

  const displayPrice = price && price !== '' ? `${price} €` : 'Price unavailable';

  return (
    <Link to={`/product/${id}`} className="product-card animate-fade-in-up" id={`product-card-${id}`}>
      <div className="product-card__image-wrapper">
        <img
          src={imgUrl}
          alt={`${brand} ${model}`}
          className="product-card__image"
          loading="lazy"
        />
      </div>
      <div className="product-card__info">
        <span className="product-card__brand">{brand}</span>
        <h3 className="product-card__model">{model}</h3>
        <span className="product-card__price">{displayPrice}</span>
      </div>
    </Link>
  );
}
