// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import DisplayHome from '../src/pages/home'
import '@testing-library/jest-dom'

describe('Logo', () => {
  test('Logo must have src = "https://bit.ly/dan-abramov" and alt = "Logo"', () => {
    render(<DisplayHome />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'https://bit.ly/dan-abramov');
    expect(logo).toHaveAttribute('alt', 'Logo');
  });
});

describe('Tabs', () => {
  test('Tabs ', async() => {
    render(<DisplayHome />);
    const button = screen.getByText(/Gráfico 1/i, { selector: 'button' })
    expect(button).not.toBeNull();
  });
});

describe('TabPanel', () => {
  test('TabPanel ', async() => {
    render(<DisplayHome />);
    const tabPanel = screen.getAllByText(/Dados/i)
    expect(tabPanel).toHaveLength(1)
  });
});
