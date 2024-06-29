import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseServiceObj from "../appwrite/conf";
import { BasicBtn, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseServiceObj.getPost(slug).then((post) => {
                if (post){ 
                    console.log(post)
                    console.log(userData)
                    console.log("Is Author value = " + isAuthor)
                    setPost(post);}
                else navigate("/");
            }).catch((error)=> console.log(error.message))
        } else navigate("/");
    }, [slug, navigate,setPost]);

    const deletePost = () => {
        databaseServiceObj.deleteDocument(post.$id).then((status) => {
            if (status) {
                toast.promise(databaseServiceObj.deleteFile(post.featuredImage),{
                    loading:"Deleting Post...",
                    success:"Post Deleted",
                    error:"Error Deleting Poast"
                })
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 min-h-screen bg-gray-900">
            <Container>
                <div className="flex gap-1 md:flex-row flex-col w-full justify-between">
                        <div className="md:max-w-[calc(100vw/2)] md:min-w-[calc(100vw/3)] w-full flex h-fit justify-center mb relative border rounded-xl p-2">
                            <img
                                src={databaseServiceObj.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl h-fit object-cover "
                            />

                            {isAuthor && (
                                <div className="absolute right-6 top-6">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <BasicBtn bgColor="bg-green-600" className="mr-3 text-white border border-black shadow-sm shadow-green-500 rounded-md">
                                            Edit
                                        </BasicBtn>
                                    </Link>
                                    <BasicBtn bgColor="bg-red-500" onClick={deletePost} className="text-white border border-black shadow-sm shadow-red-500 rounded-md">
                                        Delete
                                    </BasicBtn>
                                </div>
                            )}
                        </div>
                        <div className="flex border p-2 border-white rounded-xl md:max-w-[calc(100vw/2)] md:min-w-[calc(100vw/2)] flex-col gap-4  items-center align-middle">
                            <div className="w-full  mb-6">
                            <h1 className="text-3xl font text-white font-bold">{post.title}</h1>
                            </div>
                            <hr className="border-2 w-11/12 border-white rounded-full"/>
                            <div className="text-white browser-css">
                                {parse(post.content)}
                            </div>    
                        </div>
                </div>
            </Container>
        </div>
    ) : <div className="min-h-screen"></div>;
}