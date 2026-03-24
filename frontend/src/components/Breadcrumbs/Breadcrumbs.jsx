import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const crumbs = [{ label: 'Home', path: '/' }];

  if (pathSegments[0] === 'product' && pathSegments[1]) {
    crumbs.push({ label: 'Product Details', path: null });
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.label} className="breadcrumbs__item">
              {isLast || !crumb.path ? (
                <span className="breadcrumbs__current">{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.path} className="breadcrumbs__link">
                    {crumb.label}
                  </Link>
                  <span className="breadcrumbs__separator">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
