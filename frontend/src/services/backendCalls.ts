import { Data } from "@/types/data"


export const getData = async () => {
    const data: Data[] = [
        {
            city: 'City test',
            country: 'Country Test',
            favorite_sport: 'Football',
            name: 'Test'
        },
        {
            city: 'Cidade',
            country: 'Country Test',
            favorite_sport: 'Baseball',
            name: 'Test'
        },
    ]
    return{status: 200, data: data, message: 'Dados obtidos com sucesso'}
}

export const sendCsv = async (file: File) => {
    return {status: 201, data: null, message: 'Arquivo enviado com sucesso'}
}