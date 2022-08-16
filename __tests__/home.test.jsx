// __tests__/index.test.jsx

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import DisplayHome from '../src/pages/index'
import Sidebar from '../src/pages/components/Sidebar';
import '@testing-library/jest-dom'
import {rest} from "msw"
import {setupServer} from "msw/node"
import FormGraph from '../src/pages/components/FormGraph';

const url = `http://localhost/variavel`

const variavelNameGet = rest.get(url, (req, res, ctx)=>{
  return  res(
    ctx.status(200),
    ctx.json({
    "variavels": [
      {
        "variavel": "Bulbassauro"
      },
      {
        "variavel": "Charmander"
      },
      {
        "variavel": "Pikachu"
      },
    ],
    "resposta": "Sucesso!!"
  }))
})

const handlers = [variavelNameGet]

const server = new setupServer(...handlers);

beforeAll(()=>server.listen({
  onUnhandleRequest:'error'
}));
afterEach(()=>server.resetHandlers());
afterAll(()=>server.close())

describe('Logo', () => {
  test('Logo must have src = "/logo-retangular.png" and alt = "Logo"', () => {
    const sidebar = render(<Sidebar />);
    const logo = sidebar.container.querySelector('#logo-retangular');
    // expect(logo).toHaveAttribute('src', '/_next/static/media/logo-retangular.8228d07f.png');
    expect(logo).toHaveAttribute('alt', 'Logo');
  });
});

describe('Tabs', () => {
  test('Tabs ', async () => {
    render(<DisplayHome />);
    const button = screen.getByText(/Gráfico 1/i, { selector: 'button' });
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
  test('Title field should exists', async () => {
    const home = render(<DisplayHome />);
    const title = home.container.querySelector('#title');
    expect(title).not.toBeNull();
  });
});


describe('Select', () => {
  test('Select field should exists', async () => {
    const home = render(<DisplayHome />);
    const select = home.container.querySelectorAll('#select');
    await waitFor(()=>expect(select).not.toBeNull()) 
  });
});


describe('Option', () => {
  test('Options should exists', async () => {
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

describe('Radio', () => {
  test('Radio intervalo ', async () => {
    render(<DisplayHome />);
    const TitleRadio = screen.getByText(/Selecione o intervalo:/i);
    expect(TitleRadio).not.toBeNull();
   const TitleRadio1 = screen.getByText(/1 Hora/i);
    expect(TitleRadio1).not.toBeNull();
    const TitleRadiop = screen.getByText(/Personalizado/i);
    expect(TitleRadiop).not.toBeNull();
  });
});


describe('Button', () => {
  test('Button gerar grafico ', async () => {
    render(<DisplayHome />);
    const button = screen.getByText(/Gerar gráfico/i, { selector: 'button' });
    expect(button).not.toBeNull();
  });
});
