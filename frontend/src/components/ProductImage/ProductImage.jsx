import './ProductImage.css';

export default function ProductImage({ imgUrl, brand, model }) {
  return (
    <div className="product-image">
      <div className="product-image__wrapper">
        <img
          src={imgUrl}
          alt={`${brand} ${model}`}
          className="product-image__img"
        />
      </div>
    </div>
  );
}
