
import '@testing-library/jest-dom'
import { cleanup, waitFor, render, screen } from "@testing-library/react";
import axios from "axios";
import {listaNomeVariaveis} from '../src/pages/api/api'
import {rest} from "msw"
import {setupServer} from "msw/node"
import {FormGraph} from '../src/pages/components/FormGraph/'


const url = "http://localhost:8080/variavel"

const variavelNameGet = rest.get(url, (req, res, ctx)=>{
  return  res(ctx.json({
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

beforeAll(()=>server.listen());
afterEach(()=>server.resetHandlers());
afterAll(()=>server.close())

describe('Axios Mocking',()=>{
  it('should return all variable names', async()=>{
    render(<FormGraph/>);
    const dropdownIntem = await screen.findAllByPlaceholderText("Selecione as variáveis");
    expect(dropdownIntem).toBeVisible();
  })
  } 
);