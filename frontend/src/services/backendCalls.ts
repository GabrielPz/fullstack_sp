import api from "@/lib/axios"
import { Data } from "@/types/data"


export const getData = async () => {
    let data: Data[] = []
    try{
        const response = await api.get("users");
        data = response.data.data;
        return{status: response.status, data: data, message: response.data.message || 'Success'}
    }catch(err: any){   
        return{status: err.response.status, data: data, message: err.response.data.message || 'Error'}
    }
}

export const sendCsv = async (file: File) => {
        let formData = new FormData();
        formData.append('file', file);
        try{
            const response = await api.post("files", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
            })
            return{status: response.status, message: response.data.message || 'Success'}
        } catch(err: any){
            return{status: err.response.status, message: err.response.data.message || 'Error'}
        }
}