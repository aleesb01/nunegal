import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext.jsx';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.jsx';
import './Header.css';

export default function Header() {
  const { cartCount } = useCartContext();

  return (
    <header className="header" id="header">
      <div className="header__inner container">
        <div className="header__left">
          <Link to="/" className="header__logo" id="logo-link" aria-label="Go to homepage">
            <span className="header__logo-icon">📱</span>
            <span className="header__logo-text">MobileStore</span>
          </Link>
          <Breadcrumbs />
        </div>

        <div className="header__right">
          <div className="header__cart" id="cart-indicator" aria-label={`Cart: ${cartCount} items`}>
            <svg
              className="header__cart-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="header__cart-badge" id="cart-count">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
