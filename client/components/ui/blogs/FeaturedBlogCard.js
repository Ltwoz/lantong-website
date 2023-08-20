import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function FeaturedBlogCard({ blog }) {
    return (
        <Link href={`/blogs/${blog?._id}`}>
            <div className="w-full bg-white border rounded-lg overflow-hidden">
                <div className="w-full aspect-[9/7] relative flex items-center">
                    <div className="absolute z-[1] right-0 bottom-0 left-0 w-full h-[60%] overflow-hidden bg-gradient-to-t from-black/80 to-white/0 opacity-100" />
                    <Image
                        alt="property-image"
                        src={
                            blog?.images[0]?.url
                                ? blog?.images[0]?.url
                                : `https://dummyimage.com/273x273`
                        }
                        unoptimized
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                    <div className="flex absolute top-3 right-3 gap-x-2 z-[1]">
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
                <div className="p-4 flex flex-col space-y-3">
                    <h1
                        className="text-lg font-semibold overflow-hidden h-[56px]"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {blog?.name}
                    </h1>
                    <hr />
                    <div className="flex flex-row">
                        <FaMapMarkerAlt className="mr-2 text-gray-600" />
                        <p className="text-sm text-gray-600">{blog.address}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
