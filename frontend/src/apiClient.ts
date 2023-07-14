import axios from "axios" //package utilizzato per richieste ajax

const apiClient = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : '/',
    headers:{
        'Content-type': 'application/json',  //le richieste api devono provenire da formati json
    },
})

export default apiClient