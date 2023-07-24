import Layout from "@/components/layouts/Layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminAllProductsPage = () => {
    // Products State
    const [products, setProducts] = useState([]);
    const [link, setLink] = useState(`/api/admin/products`);

    // CRUD State;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}${link}`
            );
            setProducts(data?.products);
            setLoading(false);
        };

        getProducts().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [link]);

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>สินค้าทั้งหมด - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">สินค้าทั้งหมด</h2>
                    </div>
                </div>
            </div>
            {/* Form สร้างสินค้า */}
            <section id="main" className="w-full mb-6 flex flex-col gap-4">
                <div
                    id="products-main"
                    className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                >
                    {loading ? (
                        // <LoadingSpiner />
                        <div>Loading</div>
                    ) : (
                        <section className="bg-white border">
                            {products.length < 1 ? (
                                <div className="flex items-center justify-center py-6">
                                    <p className="font-medium text-gray-600">
                                        No product data.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead>
                                            <tr className="bg-zinc-700 text-gray-200 text-sm leading-normal">
                                                <th className="th-td md:w-16">
                                                    #
                                                </th>
                                                <th className="th-td w-44">
                                                    ชื่อสินค้า
                                                </th>
                                                <th className="th-td w-36">
                                                    หมวดหมู่
                                                </th>
                                                <th className="th-td w-20">
                                                    ราคา
                                                </th>
                                                <th className="th-td w-20">
                                                    วันที่
                                                </th>
                                                <th className="th-td !text-center w-16">
                                                    สถานะ
                                                </th>
                                                <th className="py-3 px-6 text-center w-[82px]">
                                                    จัดการ
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm md:text-base">
                                            {products?.map((product) => (
                                                <tr
                                                    key={product._id}
                                                    className="border-b last:border-0 border-gray-200 hover:bg-gray-100/80"
                                                >
                                                    <td className="th-td">
                                                        {product.productId}
                                                    </td>
                                                    <td className="th-td">
                                                        {product.name}
                                                    </td>
                                                    <td className="th-td">
                                                        {product?.category.name}
                                                    </td>
                                                    <td className="th-td">
                                                        {product?.price}
                                                    </td>
                                                    <td className="th-td">
                                                        {new Date(
                                                            product.createdAt
                                                        ).toLocaleString("th", {
                                                            dateStyle: "short",
                                                            timeStyle: "short",
                                                            hour12: false,
                                                        })}
                                                    </td>
                                                    <td className="th-td !text-center">
                                                        <span
                                                            className={
                                                                "text-sm font-medium px-2.5 py-0.5 rounded-full" +
                                                                (product.isActive
                                                                    ? " bg-green-700 text-green-200"
                                                                    : "bg-red-700 text-red-200")
                                                            }
                                                        >
                                                            {product.isActive
                                                                ? "เปิดใช้งาน"
                                                                : "ปิดใช้งาน"}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-end gap-x-2 w-fit">
                                                            <Link
                                                                href={`/properties/${product._id}`}
                                                                className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    className="w-5 h-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    />
                                                                </svg>
                                                            </Link>
                                                            <Link
                                                                href={`/dashboard/properties/${product._id}`}
                                                                className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    className="w-5 h-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                    />
                                                                </svg>
                                                            </Link>
                                                            <button
                                                                // onClick={(e) =>
                                                                //     deleteHandler(
                                                                //         product
                                                                //     )
                                                                // }
                                                                className="transform text-red-600 hover:scale-110 transition-all border hover:border-red-600 rounded-full p-2"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    className="w-5 h-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default AdminAllProductsPage;
