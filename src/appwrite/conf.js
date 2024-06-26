import { config } from "../config/config";
import toast from "react-hot-toast";
import { ID,Client,Databases,Storage,Query } from "appwrite";

export class databaseService{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.databases =new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    //post related services
    async createPost({title,slug,content,featuredImage,status,userid}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            
            console.log("Appwrite serive :: createPost :: error:::::::::::::::::::::::::::::::::::", error.message);
        }        
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            
            console.log(error);
        }

    }
    async deleteDocument(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
        }
    }
    async getAllActivePosts(queries=[Query.equal("status","active")]){
        
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            
            console.error("Error fetching user posts:", error);
        throw error; // Optionally, rethrow the error after logging it
        }
    }

    async getMyPosts(userId){
        if(!userId){
            throw new Error("User ID is required to fetch posts.");
        }
        const queries = [Query.equal("userid", userId)];
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log(error);
        }
    }

    //fileUploadServicefileUploadServicefileUploadService
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    } 
}

const databaseServiceObj=new databaseService()

export default databaseServiceObj;