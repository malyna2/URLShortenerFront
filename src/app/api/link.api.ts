import axios from "axios";

const baseUrl = "https://localhost:7100/Link";

const linkApi = {
    getAll: async () => await axios.get(`${baseUrl+"/GetAll"}`),
    create: async (linkOriginal: string) => await axios.post(`${baseUrl+"?linkOriginal="+linkOriginal}`, null, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}} ),
    delete: async (id: number) => await axios.delete(`${baseUrl+"?id="+id}`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}),
    getOriginalByShortened: async (shortenedURL: string) => await axios.get(`${baseUrl+"/GetOriginalByShortened?shortenedURL="+shortenedURL}`),
    get: async (id: number) => await axios.get(`${baseUrl+"/?id="+id}`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}} ),
}

export default linkApi;