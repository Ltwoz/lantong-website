import Layout from "@/components/layouts/Layout";
import DeleteModal from "@/components/modals/delete-modal";
import Pagination from "@/components/ui/Pagination";
import LoadingSpiner from "@/components/ui/Spiner";
import NoPermission from "@/components/ui/custom-pages/403";
import instanceApi from "@/config/axios-config";
import { useUser } from "@/contexts/user-context";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAllProductsPage = ({ config }) => {
    // Products State
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [link, setLink] = useState("/api/admin/products?page=1&sort=latest");

    // CRUD State
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    // Search State
    const [keyword, setKeyword] = useState("");
    const [debounceValue, setDebounceValue] = useState("");
    const [category, setCategory] = useState("");

    // State ของ Categories
    const [allCategories, setAllCategories] = useState([]);

    // Pagination State
    const [page, setPage] = useState(1);

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            const filteredValue = debounceValue.replace(
                /[^\u0E00-\u0E7Fa-zA-Z0-9\s]/g,
                ""
            );
            setKeyword(filteredValue);
        }, 500);

        return () => clearTimeout(debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    // Toastify
    useEffect(() => {
        if (isDeleted) {
            toast.success("ลบสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsDeleted(false);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isDeleted, error]);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const { data } = await instanceApi.get(`${link}`);
            setProducts(data);
            setLoading(false);
        };

        getProducts().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [isDeleted, link]);

    useEffect(() => {
        setLink(
            `/api/admin/products?keyword=${
                keyword ? keyword : ""
            }&page=${page}${category && `&category=${category}`}&sort=latest`
        );
    }, [category, keyword, page]);

    // Fetch get all categories
    useEffect(() => {
        const getCategories = async () => {
            const { data } = await instanceApi.get(`/api/admin/categories`);
            setAllCategories(data?.categories);
        };

        getCategories().catch(() => {
            console.error;
        });
    }, []);

    const deleteHandler = async (e) => {
        try {
            const { data } = await instanceApi.delete(
                `/api/admin/product/${selectedProduct._id}`
            );

            setIsDeleted(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    const { user, isAuthenticated } = useUser();

    if (!user || user.role !== "admin" || !isAuthenticated) {
        return <NoPermission />;
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>สินค้าทั้งหมด - {config.website_title}</title>
            </Head>
            {/* Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <DeleteModal
                        title={`ลบสินค้า ${selectedProduct.name} ?`}
                        message={"สินค้านี้จะหายไปจากเว็บไซต์"}
                        buttonLabel={"ตกลง, ลบเลย!"}
                        setIsOpen={setShowDeleteModal}
                        handler={deleteHandler}
                    />
                )}
            </AnimatePresence>
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
            {/* ตาราง */}
            <section id="main" className="w-full mb-6 flex flex-col gap-4">
                <div
                    id="products-main"
                    className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                >
                    <div className="flex flex-col-reverse xl:flex-row items-center justify-end gap-4">
                        <div className="flex items-center w-full md:w-fit">
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className="p-2 h-10 block w-full xl:w-40 bg-white rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-base hover:cursor-pointer"
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

                        <div className="relative w-full md:w-fit">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="ค้นหาข้อมูลในตาราง"
                                autoComplete="off"
                                value={debounceValue}
                                onChange={(e) =>
                                    setDebounceValue(e.target.value)
                                }
                                className="pl-10 p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                            />
                        </div>
                    </div>
                    {loading ? (
                        <LoadingSpiner />
                    ) : (
                        <section className="bg-white">
                            {products?.products?.length < 1 ? (
                                <div className="flex items-center justify-center pb-4 pt-8 border-t">
                                    <p className="font-medium text-gray-600">
                                        ไม่มีข้อมูลสินค้า
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 md:gap-6">
                                    <div className="flex flex-col overflow-x-auto border rounded-md">
                                        <table className="w-full table-fixed">
                                            <thead>
                                                <tr className="bg-zinc-700 text-gray-200 text-sm leading-normal">
                                                    <th className="th-td w-36 2xl:w-16">
                                                        รหัส
                                                    </th>
                                                    <th className="th-td w-52 2xl:w-44">
                                                        ชื่อสินค้า
                                                    </th>
                                                    <th className="th-td w-52 2xl:w-32">
                                                        หมวดหมู่
                                                    </th>
                                                    <th className="th-td w-32 2xl:w-14">
                                                        ราคา
                                                    </th>
                                                    <th className="th-td !text-center w-40 2xl:w-24">
                                                        วันที่
                                                    </th>
                                                    <th className="th-td !text-center w-40 2xl:w-16">
                                                        สถานะ
                                                    </th>
                                                    <th className="py-3 px-6 text-center w-48 2xl:w-[82px]">
                                                        จัดการ
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-sm md:text-base">
                                                {products?.products?.map(
                                                    (product) => (
                                                        <tr
                                                            key={product._id}
                                                            className="border-b last:border-0 border-gray-200 hover:bg-gray-100/80 font-medium"
                                                        >
                                                            <td className="th-td">
                                                                <span className="text-sm font-semibold px-2.5 py-0.5 rounded-md bg-[#12A53B] text-zinc-100">
                                                                    {
                                                                        product.productId
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="th-td">
                                                                {product.name}
                                                            </td>
                                                            <td className="th-td">
                                                                {
                                                                    product
                                                                        ?.category
                                                                        .name
                                                                }
                                                            </td>
                                                            <td className="th-td">
                                                                {product?.price}
                                                            </td>
                                                            <td className="th-td !text-center">
                                                                {new Date(
                                                                    product.createdAt
                                                                ).toLocaleString(
                                                                    "th",
                                                                    {
                                                                        dateStyle:
                                                                            "short",
                                                                        timeStyle:
                                                                            "short",
                                                                        hour12: false,
                                                                    }
                                                                )}
                                                            </td>
                                                            <td className="th-td !text-center">
                                                                <span
                                                                    className={
                                                                        "text-sm font-medium px-2.5 py-0.5 rounded-md" +
                                                                        (product.isActive
                                                                            ? " bg-green-600 text-green-100"
                                                                            : "bg-red-600 text-red-100")
                                                                    }
                                                                >
                                                                    {product.isActive
                                                                        ? "เปิดใช้งาน"
                                                                        : "ปิดใช้งาน"}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-6 text-center">
                                                                <div className="flex item-center justify-center gap-x-2">
                                                                    <Link
                                                                        href={`/products/${product._id}`}
                                                                        className="transform hover:text-[#12A53B] hover:scale-110 transition-all border hover:border-[#12A53B] rounded-full p-2"
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
                                                                        href={`/dashboard/products/${product._id}`}
                                                                        className="transform hover:text-[#12A53B] hover:scale-110 transition-all border hover:border-[#12A53B] rounded-full p-2"
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
                                                                        onClick={() => {
                                                                            setSelectedProduct(
                                                                                product
                                                                            );
                                                                            setShowDeleteModal(
                                                                                (
                                                                                    prev
                                                                                ) =>
                                                                                    !prev
                                                                            );
                                                                        }}
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
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <p>
                                            แสดง{" "}
                                            <span className="font-medium">
                                                {
                                                    products?.filteredProductsCount
                                                }
                                            </span>{" "}
                                            จาก
                                            <span className="font-medium">
                                                {" "}
                                                {products?.productsCount}
                                            </span>{" "}
                                            รายการ
                                        </p>
                                        <div
                                            id="pagination"
                                            className="flex items-center justify-center md:justify-end"
                                        >
                                            <Pagination
                                                currentPage={page}
                                                totalPage={
                                                    products?.totalPageCount
                                                }
                                                onPageChange={(page) =>
                                                    setPage(page)
                                                }
                                            />
                                        </div>
                                    </div>
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

export { getServerSideProps } from "@/utils/get-init-props";
