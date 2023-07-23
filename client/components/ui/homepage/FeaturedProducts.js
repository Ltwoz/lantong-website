import { useEffect, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ProductCard from "../products/ProductCard";
import axios from "axios";

const FeaturedProducts = () => {
    const [status, setStatus] = useState("Newest");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [link, setLink] = useState(`/api/products?isActive=true`);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}${link}`);
            setProducts(data?.products);
            setLoading(false);
        };

        getProducts().catch(() => {
            console.error;
            setLoading(false);
        });

        console.log("done");
    }, [link]);

    return (
        <div className="flex flex-col w-full">
            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 space-x-2 rounded-lg p-1 bg-white/80 backdrop-blur-sm mb-9">
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="newest"
                        value="Newest"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "Newest"}
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
                        id="recommend"
                        value="Recommend"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "Recommend"}
                    />
                    <label
                        htmlFor="recommend"
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
                        value="Popular"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "Popular"}
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
                        value="Promotion"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "Promotion"}
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
            <Splide
                className="mb-10"
                hasTrack={false}
                options={{
                    mediaQuery: "max",
                    perPage: 4,
                    gap: "1.5rem",
                    flickPower: 100,
                    arrows: false,
                    pagination: false,
                    breakpoints: {
                        1024: {
                            perPage: 2,
                            gap: "1.5rem",
                        },
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
                    <SplideSlide>
                        <ProductCard />
                    </SplideSlide>
                    <SplideSlide>
                        <ProductCard />
                    </SplideSlide>
                    <SplideSlide>
                        <ProductCard />
                    </SplideSlide>
                    <SplideSlide>
                        <ProductCard />
                    </SplideSlide>
                </SplideTrack>
            </Splide>
        </div>
    );
};

export default FeaturedProducts;
