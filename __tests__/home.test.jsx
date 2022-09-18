// __tests__/index.test.jsx

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import DisplayHome from '../src/pages/index'
import {listaNomeVariaveis , postAllData as apiPost} from 'src/pages/api/api.ts'
import Graph from '../src/pages/components/Graph';
import Sidebar from '../src/pages/components/Sidebar';
import RatioSelect from '../src/pages/components/RatioTimeChart/Index';
import FormGraph from '../src/pages/components/FormShowInfo';
import MyApp from '../src/pages/_app'
import {getServerSideProps} from '../src/pages/index'
import Document from '../src/pages/_document'
import '@testing-library/jest-dom'
import { rest } from "msw"
import { setupServer } from "msw/node"
import renderer from 'react-test-renderer';

import axios from "axios";

const url = "http://localhost";

const chakraWrapper = ({ children }) => <ChakraProvider>{children}</ChakraProvider>
const DATE_TO_USE = new Date('2022-03-16T07:42:10');
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

const person =
{
  id: 1,
  intervalo: 1,
  startDate:"30-04-2022",
  endDate:"30-06-2022",
  granularity:"month",
  variavel: ["Pikashu"],
  graphName:"Grafico 1"
};

const query =
{
  id: 1,
  intervalo: 1,
  startDate:"30-04-2022",
  endDate:"30-06-2022",
  granularity:"month",
  variavel: "Pikashu",
  graphName:"Grafico 1"
};

const variavelNameGet = rest.get(`${url}/variavel`, (req, res, ctx) => {
  return res(
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

const postAllData = rest.post(`${url}/variavel/filtered`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      "variavels": [
        {
          "date": "30-6-2022",
          "valor": "5.08"
        },
        {
          "date": "1-7-2022",
          "valor": "5.04"
        }
      ],
      "resposta": "Sucesso!!"
    })
  )
})

const postAllDataPredefinido = rest.post(`${url}/variavel/filteredByPeriod`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      "variavels": [
        {
          "date": "30-6-2022",
          "valor": "5.08"
        },
        {
          "date": "1-7-2022",
          "valor": "5.04"
        }
      ],
      "resposta": "Sucesso!!"
    })
  )
})

const handlers = [variavelNameGet, postAllData, postAllDataPredefinido]

const server = new setupServer(...handlers);

beforeAll(() => server.listen({
  onUnhandleRequest: 'error'
}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close())


describe('DisplayHome', () => {
  test('DisplayHome deve existir', () => {
    const displayHome = render(<DisplayHome />, {wrapper: chakraWrapper});
    expect(displayHome).not.toBeNull();
  });
});

describe('MyApp', () => {
  it('MyApp deve existir"', () => {
    const myApp =()=>{
      render(<MyApp />)
    } ;
    expect(myApp).not.toBeNull();
  });
});

describe('Document', () => {
  it('Document deve existir"', () => {
    const myApp =()=>{
      render(<Document />)
    } ;
    expect(myApp).not.toBeNull();
  });
});

describe('Logo', () => {
  test('Logo must have src = "/logo-retangular.png" and alt = "Logo"', () => {
    const sidebar = render(<Sidebar />, {wrapper: chakraWrapper});
    const logo = sidebar.container.querySelector('#logo-retangular');
    // expect(logo).toHaveAttribute('src', '/_next/static/media/logo-retangular.8228d07f.png');
    expect(logo).toHaveAttribute('alt', 'Logo');
  });
});

describe('Tabs', () => {
  test('Tabs ', async () => {
    render(<Sidebar SidebarData={person} />, {wrapper: chakraWrapper});
    const button = screen.getByText(/Gráfico 1/i, { selector: 'button' });
    expect(button).not.toBeNull();
  });
});

describe('Option', () => {
  test('Options should exists', async () => {
    const SidebarData = () => console.log("MOCK FUNÇÃO")
    render(<FormGraph FormGraphProps={(e) => { SidebarData({ ...e }) }} />, {wrapper: chakraWrapper});
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
    const setGraphParameters = () => console.log("MOCK FUNÇÃO")
    render(<RatioSelect RatioRange={(e) => setGraphParameters(e)} />);
    const TitleRadio = screen.getByText(/Selecione o intervalo:/i);
    expect(TitleRadio).not.toBeNull();
    const TitleRadio1 = screen.getByText(/1 Hora/i);
    expect(TitleRadio1).not.toBeNull();
    const TitleRadio2 = screen.getByText(/1 Dia/i);
    expect(TitleRadio2).not.toBeNull();
    const TitleRadio3 = screen.getByText(/1 Sem/i);
    expect(TitleRadio3).not.toBeNull();
    const TitleRadio4 = screen.getByText(/1 Mês/i);
    expect(TitleRadio4).not.toBeNull();
    const TitleRadiop = screen.getByText(/Personalizado/i);
    expect(TitleRadiop).not.toBeNull();
  });
});

describe('Button', () => {
  test('Button gerar grafico ', async () => {
    render(<Sidebar SidebarData={person} />, {wrapper: chakraWrapper});
    const button = screen.getByText(/Gerar Gráfico/i, { selector: 'button' });
    expect(button).not.toBeNull();
  });
});

describe('closeButton', () => {
  test('CloseButton está ativado nas abas', async () => {
    render(<Sidebar SidebarData={person} />, {wrapper: chakraWrapper});
    const button = screen.findByLabelText('button', { name: /Close/i });
    expect(button).not.toBeNull();
  });
});

describe('RatioSelect', () => {
  test('Deve renderizar os campos de Início e Fim', async () => {
    const setGraphParameters = () => console.log("MOCK FUNÇÃO")
    render(<RatioSelect RatioRange={(e) => setGraphParameters(e)} />);
    const TitleRadio = screen.getByText(/Personalizado/i);
    fireEvent.click(TitleRadio);
    expect(screen.getByText('Início:')).not.toBeNull();
    expect(screen.getByText('Fim:')).not.toBeNull();
  });
});

describe('Graph Tempo Personalizado', () => {
  test('Deve renderizar o grafico com a opção de tempo personalizado', async () => {
    const dataForm = {
      variavel: ["Pikashu", "Outro"],
      intervalo: 5,
      startDate: "30-04-2022",
      endDate: "30-06-2022",
      granularity: "year"
    }
    const graph = renderer.create(<Graph dataForm={dataForm} />).toJSON();
    expect(graph).toMatchSnapshot();
  })
})


describe('Graph Tempo Predefinido', () => {
  test('Deve renderizar o grafico com a opção de tempo predefinido', async () => {
    const dataForm = {
      variavel: ["Pikashu"],
      intervalo: 2,
      startDate: "30-04-2022",
      endDate: "30-06-2022",
      granularity: "month"
    }
    const graph = renderer.create(<Graph dataForm={dataForm} />).toJSON();
    expect(graph).toMatchSnapshot();
  })
})

describe('Graph Tempo Personalizado Vazio', () => {
  test('Deve renderizar o grafico com a opção de tempo personalizado sem granularidade', async () => {
    const dataForm = {
      variavel: ["Picachu"],
      intervalo: 2,
      startDate: "30-04-2022",
      endDate: "30-06-2022",
      granularity: ""
    }
    const graph = renderer.create(<Graph dataForm={dataForm} />).toJSON();
    expect(graph).toMatchSnapshot();
  })
})

describe('Graph Tempo Personalizado Segundo', () => {
  test('Deve renderizar o grafico com a opção de tempo personalizado em segundos', async () => {
    const dataForm = {
      variavel: ["Picachu"],
      intervalo: 2,
      startDate: "30-04-2022",
      endDate: "30-06-2022",
      granularity: "second"
    }
    const graph = renderer.create(<Graph dataForm={dataForm} />).toJSON();
    expect(graph).toMatchSnapshot();
  })
})

describe('Graph Tempo Personalizado Minuto', () => {
  test('Deve renderizar o grafico com a opção de tempo personalizado em minutos', async () => {
    const dataForm = {
      variavel: ["Picachu"],
      intervalo: 2,
      startDate: "30-04-2022",
      endDate: "30-06-2022",
      granularity: "minute"
    }
    const graph = renderer.create(<Graph dataForm={dataForm} />).toJSON();
    expect(graph).toMatchSnapshot();
  })
})

describe('Graph Tempo Personalizado Dias', () => {
  test('Deve renderizar o grafico com a opção de tempo personalizado em dias', async () => {
    const dataForm = {
      variavel: ["Picachu"],
      intervalo: 2,
      startDate: "30-04-2022",
      endDate: "30-06-2022",
      granularity: "day"
    }
    const graph = renderer.create(<Graph dataForm={dataForm} />).toJSON();
    expect(graph).toMatchSnapshot();
  })
})


describe('getServerSideProps', () => {
  test('Deve retornar person', async () => {
    const context = {
      query: query
    }
    const props = getServerSideProps(context);
    expect(props).not.toBeNull();
  })
  test('Deve retornar props vazia', async () => {
    const context = {
      query: {}
    }
    const props = getServerSideProps(context);
    expect(props).not.toBeNull();
  })
})

describe('Exceptions', () => {
  test('listaNomeVariaveis Exception', async () => {
    jest.spyOn(axios, 'get').mockImplementation((req) => {
      throw "Exception Occurred";
    });
    const test = listaNomeVariaveis();
    expect(test).toStrictEqual(Promise.resolve({}));
  });
  test('apiPost Exception', async () => {
    jest.spyOn(axios, 'post').mockImplementation((req) => {
      throw "Exception Occurred";
    });
    const test = apiPost();
    expect(test).toStrictEqual(Promise.resolve({}));
  });
  test('apiPost Promise error', async () => {
    jest.spyOn(axios, 'post').mockImplementation((req) => {
      return Promise.reject();
    });
    const test = apiPost()
    expect(test).toStrictEqual(Promise.resolve({}));
  });
});