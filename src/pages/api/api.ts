import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

interface Variavel{
    id?: number,
    variavel?: string;
    data?: Date;
    valor?: number;
}

export async function listaNomeVariaveis(){
    try{
        const resposta = await axios.get("variavel/");
        console.log(resposta.data.variavels);
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