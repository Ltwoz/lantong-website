import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import instanceApi from "@/config/axios-config";

const EditCategoryPage = ({ id }) => {
    const router = useRouter();

    const [category, setCategory] = useState({});

    // State ของ Category
    const [categoryId, setCategoryId] = useState("");
    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("แก้ไขสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsSuccess(false);
            router.reload();
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isSuccess, error, router]);

    // Fetch Category
    useEffect(() => {
        const getCategoryById = async () => {
            const { data } = await instanceApi.get(
                `/api/admin/category/${id}`
            );
            setCategory(data?.category);
        };

        getCategoryById().catch(() => {
            console.error;
        });
    }, [id]);

    useEffect(() => {
        setCategoryId(category.categoryId);
        setName(category.name);
        setIsActive(category.isActive);
    }, [category])

    async function submitForm(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.set("categoryId", categoryId);
        formData.set("name", name);
        formData.set("isActive", isActive);

        const config = { headers: { "Content-Type": "application/json" } };

        try {
            setLoading(true);

            const { data } = await instanceApi.put(
                `/api/admin/category/${id}`,
                formData,
                config
            );

            setIsSuccess(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>แก้ไขหมวดหมู่ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">แก้ไขหมวดหมู่ {category.name}</h2>
                    </div>
                </div>
            </div>
            {/* Form สร้างสินค้า */}
            <section id="main" className="w-full mb-6 flex flex-col gap-4">
                <div
                    id="property-main"
                    className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                >
                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            ข้อมูลทั่วไป
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    รหัสหมวดหมู่
                                </label>
                                <input
                                    type="text"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ชื่อหมวดหมู่
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            ตั้งค่าหมวดหมู่
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        แสดงหมวดหมู่
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-red-500 font-semibold">
                                            ปิด
                                        </span>
                                        สินค้าในหมวดหมู่จะไม่แสดงบนเว็บไซต์
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isActive}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsActive(!isActive);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div className="col-span-12 flex items-center justify-end gap-x-4">
                        <button
                            onClick={submitForm}
                            disabled={loading ? true : false}
                            className="inline-flex items-center bg-[#12A53B] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
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
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <span className="block">
                                    {loading ? "กำลังแก้ไข" : "แก้ไขหมวดหมู่"}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default EditCategoryPage;

export const getServerSideProps = async (ctx) => {
    const id = ctx.params.cid;

    return {
        props: {
            id,
        },
    };
};