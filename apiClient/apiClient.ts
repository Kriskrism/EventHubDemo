import { request, APIRequestContext } from '@playwright/test';
//import { config } from '../resources/config/env';
import dotenv from 'dotenv';
dotenv.config();


export class APIClient {
    static async getClient() {
        
        return await request.newContext({
            baseURL: process.env.API_BASE_URL
        });
    }

//Authenticated client(only when needed)
    static async getAuthClient(token: string){

        

        return await request.newContext({
            baseURL: process.env.API_BASE_URL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    //invalid token for negative testing
    static async getInvalidAuthClient(inValidToken : string){
        return await request.newContext({
            baseURL : process.env.API_BASE_URL,
            extraHTTPHeaders:{
                Authorization: `Bearer ${inValidToken}`}
        

        })
    }
}