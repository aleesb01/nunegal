import { useParams, Link } from 'react-router-dom';
import useProductDetail from '../../hooks/useProductDetail.js';
import ProductImage from '../../components/ProductImage/ProductImage.jsx';
import ProductDescription from '../../components/ProductDescription/ProductDescription.jsx';
import ProductActions from '../../components/ProductActions/ProductActions.jsx';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(id);

  if (loading) {
    return (
      <div className="container">
        <div className="pdp__loading">
          <div className="pdp__layout">
            <div className="pdp__col-left">
              <div className="skeleton pdp__skeleton-image" />
            </div>
            <div className="pdp__col-right">
              <div className="skeleton pdp__skeleton-title" />
              <div className="skeleton pdp__skeleton-subtitle" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton pdp__skeleton-row" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="pdp__error">
          <h2>Error loading product</h2>
          <p>{error}</p>
          <Link to="/" className="pdp__back-link">← Back to products</Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container">
      <div className="pdp animate-fade-in">
        <Link to="/" className="pdp__back-link" id="back-to-list">
          ← Back to products
        </Link>

        <div className="pdp__product-header">
          <h1 className="pdp__product-name">
            {product.brand} {product.model}
          </h1>
          <span className="pdp__product-price">
            {product.price && product.price !== '' ? `${product.price} €` : 'Price unavailable'}
          </span>
        </div>

        <div className="pdp__layout">
          <div className="pdp__col-left">
            <ProductImage
              imgUrl={product.imgUrl}
              brand={product.brand}
              model={product.model}
            />
          </div>

          <div className="pdp__col-right">
            <ProductDescription product={product} />
            <div className="pdp__divider" />
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
