import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BasicBtn, Input, RTE, SelectBtn } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseServiceObj from "../../appwrite/conf";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await databaseServiceObj.uploadFile(data.image[0]) : null;

            if (file) {
                databaseServiceObj.deleteFile(post.featuredImage);
            }

            const dbPost = await databaseServiceObj.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
            else{
              toast.error(dbPost)
            }
        } else {
            const file = await databaseServiceObj.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await databaseServiceObj.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                    
                }
              }       
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
           <div className="md:w-2/3 w-full flex flex-col gap-2 px-2">
           <div className="flex flex-col">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                /></div>
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="md:w-1/3 w-full mt-5 md:mt-0 px-2 flex flex-col gap-5">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
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
                <BasicBtn type="submit" bgColor={post ? "bg-green-500" : undefined} className={`font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 w-full gradient-button focus:ring-cyan-400 text-black" `}>
                {post ? "Update" : "Submit"}
                </BasicBtn>
            </div>
        </form>
    );
}