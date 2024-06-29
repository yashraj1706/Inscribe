import {ID,Client,Account} from 'appwrite'
import { config } from '../config/config';
import toast from 'react-hot-toast';

export class AuthService{
    client=new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId)
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                return this.login({email,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            
            console.log("Error creating the account",error)
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            
            
            console.log(error)
            return error.message
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get() 
        } catch (error) {
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            
            console.log(error)
        }
    }
}

const authServiceObj= new AuthService()

export default authServiceObj;