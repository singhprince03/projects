import React, { ChangeEvent } from 'react';
interface Props {
  value: string;
  placeholder: string;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line
export const TextField: React.FC<Props> = ({
  value,
  placeholder,
  type,
  handleChange,
}) => (
  <input
    className='form-control me-2'
    type={type}
    placeholder={placeholder}
    defaultValue={value}
    onChange={(event) => handleChange(event)}
    data-testid='input-element'
  />
);
// export default TextField;
