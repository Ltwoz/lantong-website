import Layout from "@/components/layouts/Layout";
import { useUser } from "@/contexts/user-context";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const { login } = useUser();

    // Auth State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Toastify
    useEffect(() => {
        if (isSuccess) {
            toast.success("เข้าสู่ระบบ", {
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

        login(email, password);
    }

    return (
        <Layout>
            <Head>
                <title>เข้าสู่ระบบ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            <div className="flex justify-center mx-auto md:max-w-[1200px] w-full h-fit md:h-[800px] p-4 md:px-0 md:py-20">
                <div className="flex flex-row border w-full rounded-lg overflow-hidden">
                    <div id="login-banner" className="hidden md:block w-1/2 bg-gray-600">

                    </div>
                    <div id="login-form" className="w-full md:w-1/2 p-6 md:px-24 md:py-0 bg-white flex flex-col justify-center">
                        <div className="mb-7 text-center">
                            <h3 className="font-semibold text-2xl text-gray-800">
                                เข้าสู่ระบบ
                            </h3>
                        </div>
                        <form className="space-y-4" onSubmit={loginSubmit}>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-white focus:bg-gray-50 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    placeholder="อัเมล"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <input
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-white focus:bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="รหัสผ่าน"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-end text-sm">
                                <a
                                    href="#"
                                    className="text-[#BC1F1F] hover:brightness-95 hover:underline"
                                >
                                    ลืมรหัสผ่าน ?
                                </a>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center bg-[#BC1F1F] rounded-lg transition-all overflow-hidden"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-3 px-4">
                                        <span className="block tracking-wide">
                                            เข้าสู่ระบบ
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-400 text-center text-sm mt-8">
                            ยังไม่มีบัญชี ?{" "}
                            <Link
                                href="/auth/register"
                                className="text-sm ml-1 text-[#BC1F1F] hover:brightness-95 hover:underline"
                            >
                                ลงทะเบียน
                            </Link>
                        </p>
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
