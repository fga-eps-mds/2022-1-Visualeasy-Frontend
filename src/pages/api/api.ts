import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Variavel{
    id?: number,
    variavel?: string;
    data?: Date;
    valor?: number;
} 
export interface Variavel extends Array<Variavel>{}

export const listaNomeVariaveis = async()=>{
    try{
        const resposta = await axios.get("/variavel");
        return resposta.data;
    }catch(e){
        return e
    }

};