import ProductCard from "@/components/ui/products/ProductCard";
import Layout from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpiner from "@/components/ui/spiner";

export default function ProductsPage() {
    // Products State
    const [products, setProducts] = useState([]);
    const [link, setLink] = useState(`/api/products?isActive=true`);

    // Filter State
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState([0, 25000]);

    // CRUD State
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);

    // Categories State
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        const getProducts = async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}${link}`
            );
            setProducts(data?.products);
            setLoading(false);
            setFirstLoad(false);
        };

        getProducts().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [link]);

    // Fetch get all categories
    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/categories`
            );
            setAllCategories(data?.categories);
        };

        getCategories().catch(() => {
            console.error;
        });
    }, []);

    function onSubmitFilter(e) {
        e.preventDefault();

        setLink(
            `/api/products?isActive=true&keyword=${keyword}${
                category && `&category=${category}`
            }`
        );
    }

    return (
        <Layout>
            <div className="mx-auto max-w-[1200px] px-4 md:px-0 flex flex-col md:flex-row gap-4 md:gap-6 py-10">
                {firstLoad ? (
                    <div className="w-full flex justify-center items-center">
                        <LoadingSpiner />
                    </div>
                ) : (
                    <>
                        {/* Filter Form */}
                        <form
                            autoComplete="off"
                            className="border-2 border-[#2D3648] rounded p-10 w-full md:w-[309px] grid grid-cols-4 gap-4 h-fit flex-shrink-0"
                        >
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    ชื่อสินค้า
                                </label>
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    หมวดหมู่
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                >
                                    <option value=""></option>
                                    {allCategories?.map((categoryItem) => (
                                        <option
                                            key={categoryItem._id}
                                            value={categoryItem._id}
                                        >
                                            {categoryItem.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    ราคา
                                </label>
                                <div className="flex flex-row mt-1 w-full space-x-4">
                                    <input
                                        type="text"
                                        className="p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        placeholder="ต่ำสุด"
                                    />
                                    <input
                                        type="text"
                                        className="p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        placeholder="สูงสุด"
                                    />
                                </div>
                            </div>
                            <div className="col-span-4 flex items-center justify-start gap-x-4">
                                <button
                                    onClick={onSubmitFilter}
                                    className="inline-flex items-center bg-[#2D3648] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="block">{"ค้นหา"}</span>
                                    </div>
                                </button>
                            </div>
                        </form>
                        {/* Products Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center w-full">
                                <LoadingSpiner />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                                {products?.length !== 0 ? (
                                    products.map((product, i) => (
                                        <ProductCard
                                            key={i}
                                            product={product}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center">
                                        ไม่พบสินค้า
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}
