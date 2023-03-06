import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from 'component/TextField/textfield';

describe('TextField', () => {
  test('Calls the handleChange callback handler with Fire Event', () => {
    const handleChange = jest.fn();
    render(
      <TextField
        value={''}
        handleChange={handleChange}
        placeholder={'Ex. 5-January-2000'}
        type={'search'}
      />
    );
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: '5-January-2000' },
    });
    expect(handleChange).toBeCalled();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('input-element')).toHaveDisplayValue(
      '5-January-2000'
    );
  });

  it('Calls the handleChange callback handler with User Event', () => {
    const handleChange = jest.fn();
    render(
      <TextField
        value={''}
        handleChange={handleChange}
        placeholder={'5-January-2000'}
        type={'search'}
      />
    );
    userEvent.type(screen.getByRole('searchbox'), '5-January-2000');
    expect(handleChange).toHaveBeenCalledTimes(14);
    expect(screen.getByTestId('input-element')).toHaveDisplayValue(
      '5-January-2000'
    );
  });

  it('TextField element contains classname', () => {
    const handleChange = jest.fn();
    render(
      <TextField
        value={''}
        placeholder={'5-January-2000'}
        type={'search'}
        handleChange={handleChange}
      />
    );
    expect(screen.getByTestId('input-element')).toHaveClass(
      'form-control me-2'
    );
  });

  it('TextField element have attributes', () => {
    const handleChange = jest.fn();
    render(
      <TextField
        value={''}
        placeholder={'5-January-2000'}
        type={'search'}
        handleChange={handleChange}
      />
    );
    expect(screen.getByRole('searchbox')).toHaveAttribute('type');
    expect(screen.getByPlaceholderText('5-January-2000')).toHaveAttribute(
      'placeholder'
    );
  });
});
