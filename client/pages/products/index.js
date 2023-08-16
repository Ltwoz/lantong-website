import ProductCard from "@/components/ui/products/ProductCard";
import Layout from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import LoadingSpiner from "@/components/ui/Spiner";
import Head from "next/head";
import Pagination from "@/components/ui/Pagination";
import instanceApi from "@/config/axios-config";

export default function ProductsPage() {
    // Products State
    const [products, setProducts] = useState([]);
    const [link, setLink] = useState(`/api/products?isActive=true&sort=latest`);

    // Filter State
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState([0, 50000]);
    const [sort, setSort] = useState("latest");

    // CRUD State
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);

    // Categories State
    const [allCategories, setAllCategories] = useState([]);

    // Pagination State
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        const getProducts = async () => {
            const { data } = await instanceApi.get(
                `${link}`
            );
            setProducts(data);
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
            const { data } = await instanceApi.get(
                `/api/categories`
            );
            setAllCategories(data?.categories);
        };

        getCategories().catch(() => {
            console.error;
        });
    }, []);

    useEffect(() => {
        setLink(
            `/api/products?isActive=true&keyword=${keyword}${
                category && `&category=${category}`
            }&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}&page=${page}`
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, page]);

    function onSubmitFilter(e) {
        e.preventDefault();

        setLink(
            `/api/products?isActive=true&keyword=${keyword}${
                category && `&category=${category}`
            }&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}&page=${page}`
        );
    }

    function handlePriceChange(index, value) {
        const newPrice = [...price];
        newPrice[index] = parseInt(value, 10);
        setPrice(newPrice);
    }

    return (
        <Layout>
            <Head>
                <title>สินค้าทั้งหมด - หจก.ลานทองเชียงใหม่</title>
            </Head>
            <section className="min-h-screen mx-auto max-w-[1200px] px-4 xl:px-0 flex flex-col md:flex-row gap-4 xl:gap-6 py-10">
                {firstLoad ? (
                    <div className="w-full flex justify-center items-center">
                        <LoadingSpiner />
                    </div>
                ) : (
                    <>
                        {/* Filter Form */}
                        <form
                            autoComplete="off"
                            className="border-2 border-[#2D3648] rounded p-8 w-full md:w-fit xl:w-[309px] grid grid-cols-4 gap-4 h-fit flex-shrink-0"
                        >
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    ชื่อสินค้า
                                </label>
                                <input
                                    type="text"
                                    value={keyword}
                                    placeholder="ค้นหาชื่อสินค้า"
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm xl:text-base"
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
                                    className="mt-1 p-2 block w-full bg-white rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm xl:text-base hover:cursor-pointer"
                                >
                                    <option value="">ทั้งหมด</option>
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
                                        type="number"
                                        min={0}
                                        max={50000}
                                        value={price[0]}
                                        onChange={(e) =>
                                            handlePriceChange(0, e.target.value)
                                        }
                                        step={1000}
                                        className="p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm xl:text-base"
                                        placeholder="ต่ำสุด"
                                    />
                                    <input
                                        type="number"
                                        min={0}
                                        max={50000}
                                        value={price[1]}
                                        onChange={(e) =>
                                            handlePriceChange(1, e.target.value)
                                        }
                                        step={1000}
                                        className="p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm xl:text-base"
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
                        {/* Main Content */}
                        <div className="flex flex-col w-full gap-4">
                            {/* Sort Dropdown */}
                            <div className="flex justify-between items-center">
                                <h3>
                                    พบสินค้า {products?.filteredProductsCount}{" "}
                                    ชิ้น
                                </h3>
                                <div className="flex items-center gap-4">
                                    <span>เรียงตาม</span>
                                    <select
                                        onChange={(e) =>
                                            setSort(e.target.value)
                                        }
                                        className="py-1 px-2 block w-32 bg-white rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm xl:text-base hover:cursor-pointer"
                                    >
                                        <option value="latest">
                                            อัพเดทล่าสุด
                                        </option>
                                        <option value="oldest">
                                            สินค้าเก่าสุด
                                        </option>
                                        <option value="highestPrice">
                                            ราคาสูงสุด
                                        </option>
                                        <option value="lowestPrice">
                                            ราคาต่ำสุด
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <hr className="mb-2 mt-2" />
                            {/* Products Grid */}
                            {loading ? (
                                <div className="flex justify-center items-center w-full">
                                    <LoadingSpiner />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-6">
                                    {products?.products?.length !== 0 ? (
                                        products?.products?.map(
                                            (product, i) => (
                                                <ProductCard
                                                    key={i}
                                                    product={product}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div className="text-center col-span-3">
                                            ไม่พบสินค้า
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* Pagination */}
                            <div
                                id="pagination"
                                className="flex my-4 items-center justify-center"
                            >
                                <Pagination
                                    currentPage={page}
                                    totalPage={products?.totalPageCount}
                                    onPageChange={(page) =>
                                        setPage(page)
                                    }
                                />
                            </div>
                        </div>
                    </>
                )}
            </section>
        </Layout>
    );
}

export { getServerSideProps } from "@/utils/get-init-props";