// __tests__/index.test.jsx

import { fireEvent, render, screen } from '@testing-library/react'
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

// describe('TabPanel', () => {
//   test('TabPanel ', async() => {
//     render(<DisplayHome />);
//     const tabPanel = screen.getAllByText(/Dados/i)
//     expect(tabPanel).toHaveLength(1)
//   });
// });

describe('Title', () => { 
  test('Title field should exists', async() => {
    const home = render(<DisplayHome />);
    const title = home.container.querySelector('#title');
    expect(title).not.toBeNull();
  });
});

describe('Select', () => { 
  test('Select field should exists', async() => {
    const home = render(<DisplayHome />);
    const select = home.container.querySelector('#variables-select');
    expect(select).not.toBeNull();
  });
});

describe('Option', () => {
  test('Options should exists', async() => {
    render(<DisplayHome />);
    fireEvent.click(screen.getByText("Selecione as variáveis"));

    setTimeout(() => {
      fireEvent.click(screen.getAllByDisplayValue('Charmander'));
    }, 1000);

    setTimeout(() => {
      expect(widget.find('span').text().contains('Charmander').toBe(true));
    }, 1000);
  });
});
