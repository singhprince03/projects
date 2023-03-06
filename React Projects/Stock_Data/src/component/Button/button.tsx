import React from 'react';
interface Props {
  type: any;
  name: string;
  handleSearch: () => void;
}

// eslint-disable-next-line
export const Button: React.FC<Props> = ({ type, name, handleSearch }) => (
  <button
    className='btn btn-success'
    type={type}
    onClick={handleSearch}
    data-testid='submit-button'
  >
    {name}
  </button>
);
// export default Button;
