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
                    setPost(post);
                }
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
                <div className="flex gap-1 flex-col w-full justify-between">
                        <h1 className="p-2 md:px-64 blog-title exp-bg bg-clip-text text-transparent bg-gradient-to-br from-[#00ffe5] via-[#b798fe]  to-[#ff69e3]   ">{post.title}</h1>
                        <div className="md:max-w-[calc(100vw/1.75)] mx-auto md:min-w-[calc(100vw/3)] w-full flex h-fit justify-center  relative  rounded-xl p-2">
                            <div className="relative">
                            <img
                            id="cover-image"
                                src={databaseServiceObj.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl relative h-fit object-cover m-0 p-1 border-[1px]"
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
                        </div>
                        <div className="p-2 mt-5 md:px-64">
                            <div className="text-white white-bullets browser-css post-content-images post-h-tags">
                                    {parse(post.content)}
                            </div> 
                        </div> 
                </div>
            </Container>
        </div>
    ) : <div className="min-h-screen"></div>;
}