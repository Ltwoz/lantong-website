import { useEffect, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ProductCard from "../products/ProductCard";
import instanceApi from "@/config/axios-config";

const FeaturedProducts = () => {
    const [status, setStatus] = useState("newest");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let link = `/api/products?isActive=true${
            status === "newest"
                ? "&sort=latest"
                : status === "featured"
                ? "&isFeatured=true"
                : status === "popular"
                ? "&isPopular=true"
                : status === "promotion"
                ? "&isPromotion=true"
                : null
        }`;

        const getProducts = async () => {
            const { data } = await instanceApi.get(
                `${link}`
            );
            setProducts(data?.products);
            setLoading(false);
        };

        getProducts().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [status]);

    return (
        <div className="flex flex-col w-full">
            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 space-x-2 rounded-lg p-1 text-white bg-[#3A3A3A] backdrop-blur-sm mb-9">
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="newest"
                        value="newest"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "newest"}
                    />
                    <label
                        htmlFor="newest"
                        className="block cursor-pointer select-none rounded-lg p-1.5 text-center peer-checked:bg-[#737373] peer-checked:font-semibold peer-checked:text-white"
                    >
                        สินค้าใหม่
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="featured"
                        value="featured"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "featured"}
                    />
                    <label
                        htmlFor="featured"
                        className="block cursor-pointer select-none rounded-lg p-1.5 text-center peer-checked:bg-[#737373] peer-checked:font-semibold peer-checked:text-white"
                    >
                        สินค้าแนะนำ
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="popular"
                        value="popular"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "popular"}
                    />
                    <label
                        htmlFor="popular"
                        className="block cursor-pointer select-none rounded-lg p-1.5 text-center peer-checked:bg-[#737373] peer-checked:font-semibold peer-checked:text-white"
                    >
                        สินค้ายอดนิยม
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="promotion"
                        value="promotion"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "promotion"}
                    />
                    <label
                        htmlFor="promotion"
                        className="block cursor-pointer select-none rounded-lg p-1.5 text-center peer-checked:bg-[#737373] peer-checked:font-semibold peer-checked:text-white"
                    >
                        โปรโมชั่น
                    </label>
                </div>
            </div>
            {/* Grid สินค้า */}
            {products?.length < 1 ? (
                <div className="flex items-center justify-center border-t min-h-[340.55px] xl:min-h-[360.77px]">
                    <p className="font-medium text-white">
                        ไม่มีข้อมูลสินค้า
                    </p>
                </div>
            ) : (
                <Splide
                    className=""
                    hasTrack={false}
                    options={{
                        mediaQuery: "max",
                        perPage: 4,
                        gap: "1.5rem",
                        flickPower: 100,
                        arrows: true,
                        pagination: false,
                        breakpoints: {
                            768:
                                // properties.length === 1
                                //     ? {
                                //           gap: "1rem",
                                //           perPage: 1,
                                //       }
                                //     :
                                {
                                    gap: "1rem",
                                    fixedWidth: "16rem",
                                    focus: "center",
                                },
                        },
                    }}
                >
                    <SplideTrack>
                        {products?.map((product) => (
                            <SplideSlide key={product._id}>
                                <ProductCard product={product} />
                            </SplideSlide>
                        ))}
                    </SplideTrack>
                </Splide>
            )}
        </div>
    );
};

export default FeaturedProducts;
