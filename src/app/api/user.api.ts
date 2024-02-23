import axios from "axios";

const baseUrl = "https://localhost:7100/User";

const userApi = {
    login: async (data: any) => await axios.post(`${baseUrl+"/Login"}`, data),
    register: async (data: any) => await axios.post(`${baseUrl+"/Register"}`, data),
    get: async (id: number) => await axios.get(`${baseUrl+"/ById?id="+id}`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}} ),
}

export default userApi;