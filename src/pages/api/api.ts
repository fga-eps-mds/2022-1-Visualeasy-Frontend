import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;

interface Variavel{
    id?: number,
    variavel?: string;
    data?: Date;
    valor?: number;
}

const listaNomeVariaveis = async ()=>{
    try{
        const res = await axios.get("/variableNames/");
        return res

    }catch(e){
        return e
    }
}

const listaVariaveis = async ()=>{
    try{
        const resposta = await axios.get("/variables/");
        return resposta

    }catch(e){
        return e
    }
}

module.exports = {listaNomeVariaveis, 
                  listaVariaveis};

