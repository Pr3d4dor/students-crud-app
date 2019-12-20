import { create } from "apisauce";

const API_ENDPOINT = "http://students-crud.test";

const api = create({
    baseURL: API_ENDPOINT,
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;
