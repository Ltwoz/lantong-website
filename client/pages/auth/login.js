import Layout from "@/components/layouts/Layout";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    // Auth State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Toastify
    useEffect(() => {
        if (isSuccess) {
            toast.success("สร้างสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsSuccess(false);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isSuccess, error]);

    async function loginSubmit(e) {
        e.preventDefault();

        const config = { headers: { "Content-Type": "application/json" } };

        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/auth/login`,
                {
                    email,
                    password,
                },
                config
            );

            setIsSuccess(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    }

    return (
        <Layout>
            <Head>
                <title>เข้าสู่ระบบ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            <div className="flex flex-col md:flex-row items-center justify-center w-full py-20">
                {/* <div className="flex items-center justify-center w-full md:w-1/2">
                    <Image
                        src="/lantong_logo.png"
                        alt="Login Image"
                        width={800}
                        height={600}
                    />
                </div> */}
                {/* <div className="w-full h-full aspect-square relative flex items-center">
                    <Image
                        alt="property-image"
                        src={`/lantong_logo.png`}
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                </div> */}
                <div className="flex flex-col items-center justify-center w-full h-fit md:w-1/4 border p-8 shadow-lg rounded-xl ">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold">
                                ลานทองยินดีต้อนรับ
                            </h1>
                            <p className="mt-2 text-gray-600">
                                กรุณาเข้าสู่ระบบ
                            </p>
                        </div>
                        <form className="mt-8 space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block font-bold text-gray-700"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 border"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block font-bold text-gray-700 "
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 border"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                                >
                                    เข้าสู่ระบบ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
        // <div className="flex flex-col items-center md:flex-row md:h-screen">
        //     <div className="flex items-center justify-center w-full md:w-1/2">
        //         <Image
        //             src="/lantong_logo.png"
        //             alt="Login Image"
        //             width={800}
        //             height={600}
        //         />
        //     </div>
        //     <div className="flex flex-col items-center justify-center w-full md:w-1/4 border p-8 shadow-lg rounded-xl ">
        //         <div className="w-full max-w-md space-y-8">
        //             <div>
        //                 <h1 className="text-2xl font-bold">
        //                     ลานทองยินดีต้อนรับ
        //                 </h1>
        //                 <p className="mt-2 text-gray-600">กรุณาเข้าสู่ระบบ</p>
        //             </div>
        //             <form className="mt-8 space-y-6">
        //                 <div>
        //                     <label
        //                         htmlFor="email"
        //                         className="block font-bold text-gray-700"
        //                     >
        //                         Email address
        //                     </label>
        //                     <input
        //                         id="email"
        //                         type="email"
        //                         placeholder="Enter your email"
        //                         className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 border"
        //                         required
        //                     />
        //                 </div>
        //                 <div>
        //                     <label
        //                         htmlFor="password"
        //                         className="block font-bold text-gray-700 "
        //                     >
        //                         Password
        //                     </label>
        //                     <input
        //                         id="password"
        //                         type="password"
        //                         placeholder="Enter your password"
        //                         className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 border"
        //                         required
        //                     />
        //                 </div>
        //                 <div>
        //                     <button
        //                         type="submit"
        //                         className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
        //                     >
        //                         เข้าสู่ระบบ
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
}
