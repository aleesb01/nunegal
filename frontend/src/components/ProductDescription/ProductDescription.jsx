import './ProductDescription.css';

const SPEC_FIELDS = [
  { key: 'brand', label: 'Brand' },
  { key: 'model', label: 'Model' },
  { key: 'price', label: 'Price', format: (v) => (v && v !== '' ? `${v} €` : 'N/A') },
  { key: 'cpu', label: 'CPU' },
  { key: 'ram', label: 'RAM' },
  { key: 'os', label: 'Operating System' },
  { key: 'displayResolution', label: 'Screen Resolution' },
  { key: 'battery', label: 'Battery' },
  { key: 'primaryCamera', label: 'Primary Camera' },
  { key: 'secondaryCmera', label: 'Secondary Camera' },
  { key: 'dimentions', label: 'Dimensions' },
  { key: 'weight', label: 'Weight', format: (v) => (v ? `${v} g` : 'N/A') },
];

export default function ProductDescription({ product }) {
  return (
    <div className="product-description" id="product-description">
      <h2 className="product-description__title">Specifications</h2>
      <dl className="product-description__specs">
        {SPEC_FIELDS.map(({ key, label, format }) => {
          const rawValue = product[key];
          const value = format ? format(rawValue) : (rawValue || 'N/A');

          // Handle array values (cameras can be arrays)
          const displayValue = Array.isArray(value) ? value.join(', ') : value;

          return (
            <div key={key} className="product-description__spec-row">
              <dt className="product-description__spec-label">{label}</dt>
              <dd className="product-description__spec-value">{displayValue}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
