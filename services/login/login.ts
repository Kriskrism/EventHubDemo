import {APIClient} from '../../apiClient/apiClient';

interface LoginPayload {
    email: string;
    password: string;
}

export class LoginService{

    static async login(payLoad : LoginPayload){
        const client = await APIClient.getClient();
        console.log("baseURL: " +  process.env.API_BASE_URL); 
        
        return client.post('/api/auth/login', {data: payLoad});
    

    }
}