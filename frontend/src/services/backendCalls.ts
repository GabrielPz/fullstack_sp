import { Data } from "@/types/data"


export const getData = async () => {
    const data: Data[] = [
        {
            city: 'City test',
            country: 'Country Test',
            favorite_sport: 'Football',
            name: 'Test'
        }
    ]
    return{status: 200, data: data}
}