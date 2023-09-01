import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function BlogCard({ blog }) {
    return (
        <Link href={`/blogs/${blog._id}`}>
            <div className="w-full flex flex-col md:flex-row bg-white border rounded-lg overflow-hidden shadow-md">
                <div className="w-full aspect-[16/9] overflow-hidden relative flex items-center">
                    <div className="absolute z-[1] right-0 bottom-0 left-0 w-full h-[50%] overflow-hidden bg-gradient-to-t from-black/20 to-white/0 opacity-100" />
                    {blog.images[0]?.url.includes("images") ? (
                        <Image
                            alt="blog-image"
                            src={
                                blog.images[0]?.url ||
                                `https://dummyimage.com/261x261`
                            }
                            draggable="false"
                            fill
                            className="select-none object-cover"
                        />
                    ) : (
                        <video className="h-full object-cover pointer-events-none">
                            <source
                                src={blog.images[0]?.url}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <div className="w-full md:w-[60%] xl:w-[75%] flex flex-col flex-shrink-0 p-4 bg-white">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-x-2">
                            <div
                                className={
                                    "py-1.5 px-2.5 leading-none text-sm text-white font-semibold rounded bg-[#38a169]/90"
                                }
                            >
                                {blog.category}
                            </div>
                            <div
                                className={
                                    "py-1.5 px-2.5 leading-none text-sm text-white font-semibold rounded bg-sky-600 flex flex-row items-center"
                                }
                            >
                                <div
                                    className={`text-[#F2DD1F] overflow-hidden pr-1`}
                                >
                                    <span>&#9733;</span>
                                </div>
                                <span>{blog.ratings}</span>
                            </div>
                        </div>
                    </div>
                    <h1
                        className="text-xl font-medium overflow-hidden mb-2 h-[56px]"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {blog.name}
                    </h1>
                    <hr className="mb-4" />
                    <div className="flex flex-row">
                        <FaMapMarkerAlt className="mr-2 text-gray-600" />
                        <p className="text-sm text-gray-600">{blog.address}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
