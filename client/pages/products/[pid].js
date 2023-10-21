import Layout from "@/components/layouts/Layout";
import instanceApi from "@/config/axios-config";
import { withInitProps } from "@/utils/get-init-props";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaFacebookMessenger } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, config }) => {
    const mainSlideRef = useRef();
    const thumbSlideRef = useRef();

    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    useEffect(() => {
        if (
            mainSlideRef.current &&
            thumbSlideRef.current &&
            thumbSlideRef.current.splide
        ) {
            mainSlideRef.current.sync(thumbSlideRef.current.splide);
        }
    }, []);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
    )}`;

    const copyToClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("คัดลอกลิงก์แล้ว", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <Head>
                <title>{`${product.name} - ${config.website_title}`}</title>
                <meta name="description" content={product.description} />
            </Head>
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
                                        href="/products"
                                        className="ml-1 text-sm font-medium text-gray-600 hover:text-[#E32C2C] xl:ml-2"
                                    >
                                        สินค้าของเรา
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
                                        {product?.name}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col gap-4 xl:gap-6 bg-white p-4 rounded">
                        {/* รูป & ชื่อสินค้า */}
                        <div className="flex flex-col md:flex-row w-full gap-6 justify-between">
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
                                        {product.images.map((image) => (
                                            <SplideSlide key={image.public_id}>
                                                {image.url.includes(
                                                    "videos"
                                                ) ? (
                                                    <div className="w-full aspect-[9/7] flex items-center">
                                                        <video
                                                            className="w-full h-full"
                                                            controls
                                                        >
                                                            <source
                                                                src={image.url}
                                                                type="video/mp4"
                                                            />
                                                            Your browser does
                                                            not support the
                                                            video tag.
                                                        </video>
                                                    </div>
                                                ) : (
                                                    <div className="w-full aspect-[9/7] flex items-center">
                                                        <Image
                                                            alt="property-image"
                                                            src={image.url}
                                                            unoptimized
                                                            draggable="false"
                                                            fill
                                                            className="select-none object-contain"
                                                        />
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
                                        fixedWidth: 110,
                                        fixedHeight: 70,
                                        cover: true,
                                        isNavigation: true,
                                    }}
                                    aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
                                >
                                    <SplideTrack>
                                        {product.images.map((image) => (
                                            <SplideSlide
                                                className="opacity-60 !border-0"
                                                key={image.public_id}
                                            >
                                                {image.url.includes(
                                                    "videos"
                                                ) ? (
                                                    <video className="w-full h-full pointer-events-none">
                                                        <source
                                                            src={image.url}
                                                            type="video/mp4"
                                                        />
                                                        Your browser does not
                                                        support the video tag.
                                                    </video>
                                                ) : (
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
                                                )}
                                            </SplideSlide>
                                        ))}
                                    </SplideTrack>
                                </Splide>
                            </div>
                            <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-6">
                                <br />
                                <h1 className="text-2xl xl:text-[36px] font-semibold leading-none">
                                    {product?.name}
                                </h1>
                                <hr />
                                <div className="flex justify-between items-center">
                                    <p className="text-lg xl:text-2xl font-semibold">
                                        #{product?.productId}
                                    </p>
                                    <div className="flex flex-row items-center">
                                        {product.isOnSale && (
                                            <p className="font-semibold text-sm mr-2 line-through text-red-600">
                                                {product?.price.toLocaleString()}
                                                ฿
                                            </p>
                                        )}
                                        <p className="text-lg xl:text-2xl font-semibold">
                                            {product.isOnSale
                                                ? `${product?.salePrice.toLocaleString()}฿`
                                                : product?.price === 0
                                                ? "ราคาพิเศษ"
                                                : `${product?.price.toLocaleString()}฿`}
                                        </p>
                                    </div>
                                </div>
                                {/* Button */}
                                <Link
                                    href={config?.social.facebook_url}
                                    target="_blank"
                                    className="self-end md:self-start w-full md:w-fit inline-flex items-center bg-[#0082FA] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white text-sm md:text-base hover:backdrop-brightness-95 py-2 px-4 md:px-6">
                                        <FaFacebookMessenger className="mr-2" />
                                        <span className="block">
                                            {"ติดต่อเรา"}
                                        </span>
                                    </div>
                                </Link>
                                {/* Share Button */}
                                <div className="flex flex-row justify-end items-center gap-2">
                                    <button
                                        onClick={() =>
                                            copyToClipBoard(currentUrl)
                                        }
                                        className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2"
                                    >
                                        <BiShareAlt className="w-5 h-5" />
                                    </button>
                                    <Link
                                        href={facebookShareUrl}
                                        target="_blank"
                                        className="transform text-white bg-[#4267B2] hover:scale-110 transition-all border-[#4267B2] rounded-full p-2"
                                    >
                                        <FaFacebookF className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/* รายละเอียด */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold">รายละเอียด</h2>
                            <div className="grid grid-cols-2 justify-between">
                                <p>
                                    <span className="font-semibold">
                                        ความกว้าง :
                                    </span>{" "}
                                    {product.width} ซม.
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        ความยาว :
                                    </span>{" "}
                                    {product.length} ซม.
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        ความสูง :
                                    </span>{" "}
                                    {product.height} ซม.
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        รับน้ำหนัก :
                                    </span>{" "}
                                    {product.weightAccept} กก.
                                </p>
                            </div>
                        </div>
                        <hr />
                        {/* คำอธิบาย */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold">คำอธิบาย</h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                            />
                        </div>
                        {product.isGift && (
                            <>
                                <hr />
                                {/* ของแแถม */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-xl font-bold">
                                        ของแถม
                                    </h2>
                                    <p>{product.giftDetail}</p>
                                </div>
                            </>
                        )}
                        {product.isPromotion && (
                            <>
                                <hr />
                                {/* โปรโมชั่น */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-xl font-bold">
                                        โปรโมชั่น
                                    </h2>
                                    <p>{product.promotionDetail}</p>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ProductDetails;

export const getServerSideProps = withInitProps(async (ctx) => {
    try {
        const id = ctx.params.pid;
        const { data } = await instanceApi.get(`/api/product/${id}`);

        return {
            props: {
                product: data.product,
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
