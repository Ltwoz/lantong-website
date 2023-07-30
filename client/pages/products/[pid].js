import Layout from "@/components/layouts/Layout";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

const ProductDetails = ({ product }) => {
    const mainSlideRef = useRef();
    const thumbSlideRef = useRef();

    useEffect(() => {
        if (
            mainSlideRef.current &&
            thumbSlideRef.current &&
            thumbSlideRef.current.splide
        ) {
            mainSlideRef.current.sync(thumbSlideRef.current.splide);
        }
    }, []);

    return (
        <Layout>
            <Head>
                <title>{`${product.name} - หจก.ลานทองเชียงใหม่`}</title>
                <meta name="description" content={product.description} />
            </Head>
            <section className="min-h-screen mx-auto max-w-[1200px] px-4 md:px-0 flex flex-col gap-4 md:gap-6 py-10">
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
                                        <div className="w-full aspect-[9/7] flex items-center">
                                            <Image
                                                alt="property-image"
                                                src={image.url}
                                                unoptimized
                                                draggable="false"
                                                fill
                                                className="select-none object-cover"
                                            />
                                        </div>
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
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                        </Splide>
                    </div>
                    <div className="w-1/2 flex-shrink-0 flex flex-col gap-6">
                        <h1 className="text-[36px] font-semibold leading-none">
                            {product?.name}
                        </h1>
                        <hr />
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-semibold">
                                #{product?.productId}
                            </p>
                            <p className="text-2xl font-semibold">
                                {product?.price.toLocaleString()}฿
                            </p>
                        </div>
                        {/* Button */}
                        <Link
                            href={"#"}
                            className="md:h-[50px] w-fit inline-flex items-center bg-[#0082FA] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                        >
                            <div className="w-full h-full inline-flex items-center justify-center font-medium text-white text-sm md:text-base hover:backdrop-brightness-95 py-2 px-4 md:px-6">
                                <FaFacebookMessenger className="mr-2" />
                                <span className="block">{"ติดต่อเรา"}</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <hr />
                {/* รายละเอียด */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold">รายละเอียด</h2>
                    <div className="grid grid-cols-2 justify-between">
                        <p>
                            <span className="font-semibold">ความกว้าง :</span>{" "}
                            {product.width} ซม.
                        </p>
                        <p>
                            <span className="font-semibold">ความยาว :</span>{" "}
                            {product.length} ซม.
                        </p>
                        <p>
                            <span className="font-semibold">ความสูง :</span>{" "}
                            {product.height} ซม.
                        </p>
                        <p>
                            <span className="font-semibold">รับน้ำหนัก :</span>{" "}
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
                            <h2 className="text-xl font-bold">ของแถม</h2>
                            <p>{product.giftDetail}</p>
                        </div>
                    </>
                )}
            </section>
        </Layout>
    );
};

export default ProductDetails;

export const getServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.pid;
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/product/${id}`
        );

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
};
