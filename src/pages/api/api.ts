import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export interface Variavel {
    id?: number,
    variavel?: string;
    data?: Date;
    valor?: number;
}
export interface Variavel extends Array<Variavel> { }

const paramstype = {
    variavel: "Bulbassauro",
    startDate: '2022-06-30T06:18:50',
    endDate: '2022-06-30T06:26:14'
}
export async function listaNomeVariaveis() {
    try {
        const resposta = await axios.get("variavel/");
        return resposta.data;
    } catch (e) {
        return e
    }

};

export const postAllData = async (params: any, dataapi: any) => {
    try {

        const { data }: any = await axios.post(`/variavel/${params}`, dataapi).catch(function (error) {
            console.error(error);
        });
        return data

    } catch (e) {
        return e
    }
}

