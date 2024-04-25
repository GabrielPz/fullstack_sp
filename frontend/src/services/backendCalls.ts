import api from "@/lib/axios"
import { Data } from "@/types/data"


export const getData = async () => {
    let data: Data[] = []
    try{
        const response = await api.get("users");
        data = response.data.data;
        return{status: response.status, data: data, message: response.data.message || 'Data retrieved'}
    }catch(err: any){   
        return{status: err.response?.status || 500, data: data, message: err.response?.data.message || 'Error retrieving data'}
    }
}

export const deleteData = async () => {
    try{
        const response = await api.delete("users");
        return{status: response.status, message: response.data.message || 'Data deleted'}
    }catch(err: any){   
        return{status: err.response?.status || 500, message: err.response?.data.message || 'Error deleting data'}
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
            return{status: err.response?.status || 500, message: err?.response.data.message || 'Error'}
        }
}