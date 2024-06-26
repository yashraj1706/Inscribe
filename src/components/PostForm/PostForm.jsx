import React, { useCallback, useEffect } from 'react'
import {SelectBtn,RTE,BasicBtn,Input} from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import databaseServiceObj from '../../appwrite/conf'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import ErrorComponent from '../Error/ErrorComponent'
import toast from 'react-hot-toast'


function PostForm({post}) {
    const {handleSubmit,register,setValue,getValues,watch,control}=useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.$id || '',
            status:post?.status || 'active',
            content:post?.content || '',
        }
    })

    const navigate=useNavigate()
    const userData=useSelector((state)=> state.userData)
    const submit=async(data)=>{
        if(post){
            const file=data.featuredImage[0]? await databaseServiceObj.uploadFile(data.featuredImage[0]) : null;
            if(file){
                databaseServiceObj.deleteFile(post.featuredImage)
            }
            const dbPost=databaseServiceObj.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage:file? file.$id:undefined
                }
            )
            await toast.promise(dbPost,{
                loading:"Posting...",
                success:"Successfully Posted",
                error:"Error Posting..."
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }

        else{
            const file=await databaseServiceObj.uploadFile(data.featuredImage[0])
            if(file){
                console.log(data)
                const fileID= file.$id
                data.featuredImage=fileID
                const dbPost= databaseServiceObj.createPost({
                    ...data,userid:userData.$id
                })
                await toast.promise(dbPost,{
                    loading:"Posting...",
                    success:"Successfully Posted",
                    error:"Error Posting..."
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
                
            }
        }
    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value==='string'){
            return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]/g,'-')
            .replace(/\s/g,'-')
        }
    },[])

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })

        return  ()=>{
            subscription.unsubscribe()
        }
    },[watch,setValue,slugTransform])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="md:w-2/3 w-full flex flex-col gap-2 px-2">
                <div className='flex flex-col'>
                <Input
                    label="Title"
                    placeholder="Title..."
                    className="mb-4"
                    maxLength={36}
                    {...register("title", { required: true,maxLength:36 })}
                />
                
                </div>
                <Input
                    label="Slug"
                    placeholder="Slug..."
                    className="mb-4"
                    readOnly={true}
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="md:w-1/3 w-full mt-5 md:mt-0 px-2 flex flex-col gap-5">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseServiceObj.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <SelectBtn
                    
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <BasicBtn type="submit" bgColor={post ? "bg-green-500" : undefined} className="bg-cyan-500 shadow-cyan-900 text-black font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 w-full">
                    {post ? "Update" : "Submit"}
                </BasicBtn>
            </div>
        </form>
  )
}

export default PostForm