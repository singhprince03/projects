import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'component/Button/button';

describe('Button', () => {
  test('Calls the handleChange callback handler', () => {
    const handleSearch = jest.fn();
    render(
      <Button handleSearch={handleSearch} type={'submit'} name={'Search'} />
    );
    userEvent.click(screen.getByRole('button'));
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('Button element contains classname', () => {
    const handleSearch = jest.fn();
    render(
      <Button handleSearch={handleSearch} type={'submit'} name={'Search'} />
    );
    expect(screen.getByTestId('submit-button')).toHaveClass('btn btn-success');
    expect(screen.getByRole('button')).toHaveClass('btn btn-success');
  });

  it('Button element should have name', () => {
    const handleSearch = jest.fn();
    render(
      <Button handleSearch={handleSearch} type={'submit'} name={'Search'} />
    );
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });
});
