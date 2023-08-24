import Layout from "@/components/layouts/Layout";
import NoPermission from "@/components/ui/custom-pages/403";
import instanceApi from "@/config/axios-config";
import { useUser } from "@/contexts/user-context";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await instanceApi.get(`/api/admin/products`);
            setProducts(data?.products);
        };
        const getCategories = async () => {
            const { data } = await instanceApi.get(`/api/admin/categories`);
            setCategories(data?.categories);
        };
        const getUsers = async () => {
            const { data } = await instanceApi.get(`/api/admin/users`);
            setUsers(data?.users);
        };

        const getBlogs = async () => {
            const { data } = await instanceApi.get(`/api/admin/blogs`);
            setBlogs(data?.blogs);
        };

        getProducts();
        getCategories();
        getUsers();
        getBlogs();
    }, []);

    const { user, isAuthenticated } = useUser();

    if (!user || user.role !== "admin" || !isAuthenticated) {
        return <NoPermission />;
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>จัดการหลังบ้าน - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">
                            ภาพรวมของเว็บไซต์
                        </h2>
                    </div>
                </div>
            </div>
            <div className="w-full mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1 from-[#3D52A8] to-[#9B63E9] bg-gradient-to-r text-white rounded-lg p-4 flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h4 className="text-sm font-medium">
                                สินค้าทั้งหมด
                            </h4>
                            <p className="font-semibold text-2xl mt-2">
                                {products?.length}
                            </p>
                        </div>
                        <div className="rounded-full bg-white/20 overflow-hidden w-[80px] h-[80px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="md:col-span-1 from-[#FE5B00] to-[#F68D36] bg-gradient-to-r text-white rounded-lg p-4 flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h4 className="text-sm font-medium">
                                หมวดหมู่ทั้งหมด
                            </h4>
                            <p className="font-semibold text-2xl mt-2">
                                {categories?.length}
                            </p>
                        </div>
                        <div className="rounded-full bg-white/20 overflow-hidden w-[80px] h-[80px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="md:col-span-1 from-[#0C485A] to-[#3CABC7] bg-gradient-to-r text-white rounded-lg p-4 flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h4 className="text-sm font-medium">
                                ผู้ใช้ทั้งหมด
                            </h4>
                            <p className="font-semibold text-2xl mt-2">
                                {users?.length}
                            </p>
                        </div>
                        <div className="rounded-full bg-white/20 overflow-hidden w-[80px] h-[80px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="md:col-span-1 from-[#D64952] to-[#FD8B91] bg-gradient-to-r text-white rounded-lg p-4 flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h4 className="text-sm font-medium">
                                รีวิวทั้งหมด
                            </h4>
                            <p className="font-semibold text-2xl mt-2">
                                {blogs?.length}
                            </p>
                        </div>
                        <div className="rounded-full bg-white/20 overflow-hidden w-[80px] h-[80px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        href={`/dashboard/products/new-product`}
                        className="md:col-span-1 border bg-gray-100 hover:bg-gray-200/80 rounded-lg py-6 flex flex-row justify-center items-center gap-4"
                    >
                        <div className="rounded-full bg-white/30 overflow-hidden w-[60px] h-[60px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">เพิ่มสินค้า</h4>
                        </div>
                    </Link>
                    <Link
                        href={`/dashboard/products/new-product`}
                        className="md:col-span-1 border bg-gray-100 hover:bg-gray-200/80 rounded-lg py-6 flex flex-row justify-center items-center gap-4"
                    >
                        <div className="rounded-full bg-white/30 overflow-hidden w-[60px] h-[60px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">
                                เพิ่มหมวดหมู่
                            </h4>
                        </div>
                    </Link>
                    <Link
                        href={`/dashboard/products/new-product`}
                        className="md:col-span-1 border bg-gray-100 hover:bg-gray-200/80 rounded-lg py-6 flex flex-row justify-center items-center gap-4"
                    >
                        <div className="rounded-full bg-white/30 overflow-hidden w-[60px] h-[60px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">เพิ่มรีวิว</h4>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="w-full mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        href={`/dashboard/products/new-product`}
                        className="md:col-span-1 border bg-gray-100 hover:bg-gray-200/80 rounded-lg py-6 flex flex-row justify-center items-center gap-4"
                    >
                        <div className="rounded-full bg-white/30 overflow-hidden w-[60px] h-[60px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">
                                จัดการเว็บไซต์
                            </h4>
                        </div>
                    </Link>
                    <Link
                        href={`/dashboard/products/new-product`}
                        className="md:col-span-1 border bg-gray-100 hover:bg-gray-200/80 rounded-lg py-6 flex flex-row justify-center items-center gap-4"
                    >
                        <div className="rounded-full bg-white/30 overflow-hidden w-[60px] h-[60px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">
                                จัดการแบนเนอร์
                            </h4>
                        </div>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;

export { getServerSideProps } from "@/utils/get-init-props";
