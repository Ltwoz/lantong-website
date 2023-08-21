import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import instanceApi from "@/config/axios-config";
import { useUser } from "@/contexts/user-context";
import NoPermission from "@/components/ui/custom-pages/403";
import { withInitProps } from "@/utils/get-init-props";

const EditUserPage = ({ id }) => {
    const router = useRouter();

    const [user, setUser] = useState({});

    // State ของ Category
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

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
            router.replace(`/dashboard/users/${id}`);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isSuccess, error, router, id]);

    // Fetch Category
    useEffect(() => {
        const getUserById = async () => {
            const { data } = await instanceApi.get(`/api/admin/user/${id}`);
            setUser(data?.user);
        };

        getUserById().catch(() => {
            console.error;
        });
    }, [id]);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }, [user]);

    async function submitForm(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("email", email);
        formData.set("role", role);

        const config = { headers: { "Content-Type": "application/json" } };

        try {
            setLoading(true);

            const { data } = await instanceApi.put(
                `/api/admin/user/${id}`,
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

    const { user: currentUser, isAuthenticated } = useUser();

    if (!currentUser || currentUser.role !== "admin" || !isAuthenticated) {
        return <NoPermission />;
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>แก้ไขผู้ใช้ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">
                            แก้ไขผู้ใช้ {user.name}
                        </h2>
                    </div>
                </div>
            </div>
            {/* Form สร้างสินค้า */}
            <section id="main" className="w-full mb-6 flex flex-col gap-4">
                <div
                    id="user-main"
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
                                    ชื่อ
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    อีเมล
                                </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    บทบาท
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
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
                                    {loading ? "กำลังแก้ไข" : "แก้ไขผู้ใช้"}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default EditUserPage;

export const getServerSideProps = withInitProps(async (ctx) => {
    const id = ctx.params.uid;

    return {
        props: {
            id,
        },
    };
});
