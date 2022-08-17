import axios from "axios";

axios.defaults.baseURL = "https://visualeasy-controle.herokuapp.com";

export interface Variavel{
    id?: number,
    variavel?: string;
    data?: Date;
    valor?: number;
} 
export interface Variavel extends Array<Variavel>{}

export async function listaNomeVariaveis(){
    try{
        const resposta = await axios.get("variavel/");
        return resposta.data;
    }catch(e){
        return e
    }

};

export const listaVariaveis = async ()=>{
    try{
        const resposta = await axios.get("/variavel/");
        return resposta

    }catch(e){
        return e
    }
}

export const api = axios.create({
  baseURL: 'https://visualeasy-controle.herokuapp.com/variavel/'
})  