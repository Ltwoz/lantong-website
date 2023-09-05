import Layout from "@/components/layouts/Layout";
import GoogleMapComponent from "@/components/ui/GoogleMap";
import ReviewCard from "@/components/ui/blogs/ReviewCard";
import instanceApi from "@/config/axios-config";
import { withInitProps } from "@/utils/get-init-props";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import NewReviewModal from "@/components/modals/NewReviewModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/contexts/user-context";
import { getCoordinatesFromMapsUrl } from "@/utils/get-coordinates";

const BlogDetails = ({ blog: blogSSR }) => {
    const { user, isAuthenticated } = useUser();

    const [blog, setBlog] = useState(blogSSR);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const mainSlideRef = useRef();
    const thumbSlideRef = useRef();

    const [coordinate, setCoordinate] = useState({});
    const [containMap, setContainMap] = useState(false);

    // Get Coordinate Lat, Lng
    useEffect(() => {
        const coordinate = getCoordinatesFromMapsUrl(blog.google_map);
        if (coordinate) {
            setCoordinate(coordinate);
            setContainMap(true);
        } else {
            setContainMap(false);
            console.log("Invalid input.");
        }
    }, [blog.google_map]);

    // Toastify
    useEffect(() => {
        if (isSuccess) {
            toast.success("เพิ่มรีวิวสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsSuccess(false);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isSuccess, error]);

    useEffect(() => {
        if (
            mainSlideRef.current &&
            thumbSlideRef.current &&
            thumbSlideRef.current.splide
        ) {
            mainSlideRef.current.sync(thumbSlideRef.current.splide);
        }
    }, []);

    useEffect(() => {
        const getBlog = async () => {
            const { data } = await instanceApi.get(`/api/blog/${blog._id}`);

            setBlog(data.blog);
        };

        getBlog().catch(() => {
            console.error;
        });
    }, [blog._id, isSuccess]);

    const submitReviewHandler = async () => {
        try {
            if (!comment) {
                return setError("กรุณาใส่คอมเมนท์");
            }

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await instanceApi.put(
                `/api/blog/review/new`,
                {
                    rating,
                    comment,
                    blogId: blog._id,
                },
                config
            );

            setIsSuccess(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setShowModal(false);
            setRating(0);
            setComment("");
        }
    };

    return (
        <Layout>
            <Head>
                <title>{`${blog.name} - หจก.ลานทองเชียงใหม่`}</title>
                {/* <meta name="description" content={blog.description} /> */}
            </Head>
            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <NewReviewModal
                        state={{
                            rating,
                            setRating,
                            comment,
                            setComment,
                        }}
                        setIsOpen={setShowModal}
                        handler={submitReviewHandler}
                    />
                )}
            </AnimatePresence>
            <div className="bg-gray-100">
                <section className="min-h-screen mx-auto max-w-[1200px] px-4 xl:px-0 flex flex-col gap-4 xl:gap-6 py-4 xl:py-10">
                    {/* Breadcrumb */}
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 xl:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-[#E32C2C]"
                                >
                                    <svg
                                        className="w-3 h-3 mr-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    หน้าหลัก
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg
                                        className="w-3 h-3 text-gray-700 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <Link
                                        href="/blogs"
                                        className="ml-1 text-sm font-medium text-gray-600 hover:text-[#E32C2C] xl:ml-2"
                                    >
                                        ลานทองพาเที่ยว
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg
                                        className="w-3 h-3 text-gray-700 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-600 xl:ml-2">
                                        {blog?.name}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col gap-4 xl:gap-6 bg-white p-4 rounded">
                        {/* รูป & ชื่อสินค้า */}
                        <div className="w-full flex flex-col rounded-md overflow-hidden gap-2">
                            <Splide
                                className="w-full"
                                hasTrack={false}
                                ref={mainSlideRef}
                                options={{
                                    perPage: 1,
                                    flickPower: 100,
                                    type: "loop",
                                    pagination: false,
                                    arrows: false,
                                }}
                            >
                                <SplideTrack>
                                    {blog.images.map((image) => (
                                        <SplideSlide key={image.public_id}>
                                            {image.url.includes("images") ? (
                                                <div className="w-full h-[240px] md:h-[480px] xl:h-[700px] flex items-center">
                                                    <Image
                                                        alt="property-image"
                                                        src={image.url}
                                                        unoptimized
                                                        draggable="false"
                                                        fill
                                                        className="select-none object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-[240px] md:h-[480px] xl:h-[700px] flex items-center">
                                                    <video
                                                        className="w-full h-full"
                                                        controls
                                                    >
                                                        <source
                                                            src={image.url}
                                                            type="video/mp4"
                                                        />
                                                        Your browser does not
                                                        support the video tag.
                                                    </video>
                                                </div>
                                            )}
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                            </Splide>
                            <Splide
                                hasTrack={false}
                                ref={thumbSlideRef}
                                options={{
                                    type: "slide",
                                    rewind: true,
                                    gap: "0.5rem",
                                    pagination: false,
                                    fixedWidth: 234,
                                    fixedHeight: 156,
                                    cover: true,
                                    isNavigation: true,
                                    breakpoints: {
                                        768: {
                                            fixedWidth: 110,
                                            fixedHeight: 70,
                                        },
                                    },
                                }}
                                aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
                            >
                                <SplideTrack>
                                    {blog.images.map((image) => (
                                        <SplideSlide
                                            className="opacity-60 !border-0"
                                            key={image.public_id}
                                        >
                                            {image.url.includes("images") ? (
                                                <div className="w-full h-full flex items-center">
                                                    <Image
                                                        alt="thumb-image"
                                                        src={image.url}
                                                        unoptimized
                                                        draggable="false"
                                                        fill
                                                        className="select-none object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <video className="w-full h-full pointer-events-none">
                                                    <source
                                                        src={image.url}
                                                        type="video/mp4"
                                                    />
                                                    Your browser does not
                                                    support the video tag.
                                                </video>
                                            )}
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                            </Splide>
                        </div>
                        {/* ชื่อ */}
                        <div className="flex flex-col gap-3 xl:mt-6">
                            <h1 className="text-3xl font-bold">{blog.name}</h1>
                        </div>
                        <hr />
                        {/* ที่อยู่ & หมวดหมู่ */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xl font-bold">
                                หมวดหมู่ :{" "}
                                <span className="font-normal">
                                    {blog.category}
                                </span>
                            </h4>
                            <h4 className="text-xl font-bold">
                                ที่อยู่ :{" "}
                                <span className="font-normal">
                                    {blog.address}
                                </span>
                            </h4>
                        </div>
                        <hr />
                        {/* คำอธิบาย */}
                        <div className="flex flex-col gap-3">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: blog.description,
                                }}
                            />
                        </div>
                        <hr />
                        {/* Map */}
                        <div className="flex flex-col xl:flex-row gap-6">
                            {containMap && (
                                <GoogleMapComponent url={blog.google_map} />
                            )}
                            <div
                                className={`w-full ${
                                    containMap ? "xl:w-[40%] " : "xl:w-full"
                                } flex flex-col gap-6`}
                            >
                                <p className="font-medium">{blog.address}</p>
                                <p className="font-medium">
                                    โทร : <span>{blog.phone_no}</span>
                                </p>
                                {containMap && (
                                    <Link
                                        href={`https://maps.google.com?q=${coordinate.lat},${coordinate.lng}`}
                                        target="_blank"
                                        className="inline-flex items-center bg-primary disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                                    >
                                        <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                            ดูเส้นทาง
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <hr />
                        {/* Reviews */}
                        <div className="flex flex-col gap-6">
                            <h2 className="text-xl font-bold">
                                รีวิวจากลูกค้า
                            </h2>
                            <div className="flex flex-col gap-4">
                                {blog.reviews && blog.reviews[0] ? (
                                    <>
                                        {blog.reviews &&
                                            blog.reviews.map((review) => (
                                                <ReviewCard
                                                    key={review._id}
                                                    review={review}
                                                />
                                            ))}
                                    </>
                                ) : (
                                    <div className="w-full h-full px-4 py-4 rounded-lg border border-zinc-200 justify-center items-center gap-4 inline-flex">
                                        <p className="font-medium">
                                            ยังไม่มีรีวิว
                                        </p>
                                    </div>
                                )}
                            </div>
                            {!user ||
                            user.role !== "admin" ||
                            !isAuthenticated ? (
                                <></>
                            ) : (
                                <button
                                    onClick={() => {
                                        setShowModal((prev) => !prev);
                                    }}
                                    className="w-fit self-end inline-flex items-center bg-primary disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                        เพิ่มรีวิว
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default BlogDetails;

export const getServerSideProps = withInitProps(async (ctx) => {
    try {
        const id = ctx.params.bid;
        const { data } = await instanceApi.get(`/api/blog/${id}`);

        return {
            props: {
                blog: data.blog,
            },
        };
    } catch (error) {
        console.log("error : ", error);
        return {
            props: {
                error: error,
            },
            notFound: true,
        };
    }
});
