import Layout from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import LoadingSpiner from "@/components/ui/Spiner";
import Head from "next/head";
import Pagination from "@/components/ui/Pagination";
import instanceApi from "@/config/axios-config";
import BlogCard from "@/components/ui/blogs/BlogCard";

export default function BlogsPage() {
    // Blogs State
    const [blogs, setBlogs] = useState([]);
    const [link, setLink] = useState(`/api/blogs?isActive=true&sort=latest`);

    // Filter State
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("latest");

    // All Blog Categories
    const [allCategories, setAllCategories] = useState([]);

    // CRUD State
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getCategory = async () => {
            const { data } = await instanceApi.get(`/api/blog/category`);
            setAllCategories(data.categories);
        };

        getCategory().catch(() => {
            console.error;
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        const getBlogs = async () => {
            const { data } = await instanceApi.get(`${link}`);
            setBlogs(data);
            setLoading(false);
            setFirstLoad(false);
        };

        getBlogs().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [link]);

    useEffect(() => {
        setLink(
            `/api/blogs?isActive=true&keyword=${keyword}${
                category && `&category=${category}`
            }&sort=${sort}&page=${page}`
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, page]);

    function onSubmitFilter(e) {
        e.preventDefault();

        setLink(
            `/api/blogs?isActive=true&keyword=${keyword}${
                category && `&category=${category}`
            }&sort=${sort}&page=${page}`
        );
    }

    return (
        <Layout>
            <Head>
                <title>ลานทองพาเที่ยว - หจก.ลานทองเชียงใหม่</title>
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
                                    ชื่อ
                                </label>
                                <input
                                    type="text"
                                    value={keyword}
                                    placeholder="ค้นหาด้วยชื่อ"
                                    onChange={(e) => {
                                        const filteredValue =
                                            e.target.value.replace(
                                                /[^\u0E00-\u0E7Fa-zA-Z0-9\s]/g,
                                                ""
                                            );
                                        setKeyword(filteredValue);
                                    }}
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
                                    {allCategories?.map((categoryItem, i) => (
                                        <option
                                            key={i}
                                            value={categoryItem}
                                        >
                                            {categoryItem}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-4 flex items-center justify-start gap-x-4">
                                <button
                                    onClick={onSubmitFilter}
                                    className="inline-flex items-center bg-primary disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
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
                                <h3>พบ {blogs?.filteredBlogsCount} รายการ</h3>
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
                                            รายการเก่าสุด
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <hr className="mb-2 mt-2" />
                            {/* Blogs Grid */}
                            {loading ? (
                                <div className="flex justify-center items-center w-full">
                                    <LoadingSpiner />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 xl:gap-6">
                                    {blogs?.blogs?.length !== 0 ? (
                                        blogs?.blogs?.map((blog, i) => (
                                            <BlogCard key={i} blog={blog} />
                                        ))
                                    ) : (
                                        <div className="text-center col-span-3">
                                            ไม่พบรายการ
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
                                    totalPage={blogs?.totalPageCount}
                                    onPageChange={(page) => setPage(page)}
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
