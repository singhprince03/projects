import { render, screen } from '@testing-library/react';
import { Header } from 'component/Header/header';

describe('Header', () => {
  test('Test is in DOM', () => {
    const title = 'Stock Data';
    render(<Header title={title} />);
    expect(screen.getByText('Stock Data')).toBeInTheDocument();
  });

  it('Test is in DOM', () => {
    render(<Header title={''} />);
    expect(screen.queryByText('Stock Data')).toBeNull();
  });

  it('Header element contains another elements', () => {
    render(<Header title={''} />);
    const HeaderNav = screen.getByTestId('header-nav');
    const HeaderDiv = screen.getByTestId('header-div');
    const HeaderSpan = screen.getByTestId('header-span');
    expect(HeaderNav).toContainElement(HeaderDiv);
    expect(HeaderDiv).toContainElement(HeaderSpan);
    expect(HeaderSpan).not.toContainElement(HeaderNav);
  });

  it('Header element contains classname', () => {
    render(<Header title={''} />);
    const NavClass = screen.getByTestId('header-nav');
    const DivClass = screen.getByTestId('header-div');
    const SpanClass = screen.getByTestId('header-span');
    expect(NavClass).toHaveClass('navbar bg-secondary');
    expect(DivClass).toHaveClass(
      'container-fluid d-flex justify-content-center'
    );
    expect(SpanClass).toHaveClass('navbar-brand h1');
  });
});
