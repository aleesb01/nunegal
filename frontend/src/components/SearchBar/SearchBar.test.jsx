import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar.jsx';

describe('SearchBar', () => {
  it('should render the search input', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/Search by brand or model/);
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/Search by brand or model/);
    fireEvent.change(input, { target: { value: 'Apple' } });
    expect(handleChange).toHaveBeenCalledWith('Apple');
  });

  it('should show clear button when value is present', () => {
    render(<SearchBar value="test" onChange={() => {}} />);
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('should not show clear button when value is empty', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  it('should call onChange with empty string when clear is clicked', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="test" onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(handleChange).toHaveBeenCalledWith('');
  });
});
