import {APIClient} from '../../apiClient/apiClient';


export class LoginService{

    static async login(payLoad : any){
        const client = await APIClient.getClient();
        console.log("baseURL: " +  process.env.API_BASE_URL); 
        
        return client.post('/api/auth/login', {data: payLoad});
    

    }
}