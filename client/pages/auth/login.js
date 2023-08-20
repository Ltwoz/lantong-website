import Layout from "@/components/layouts/Layout";
import { useUser } from "@/contexts/user-context";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const { login, isAuthenticated, error, clearErrors } = useUser();

    const router = useRouter();

    // Auth State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Toastify
    useEffect(() => {
        if (isAuthenticated) {
            toast.success("เข้าสู่ระบบ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });

            router.push("/")
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            clearErrors();
        }
    }, [isAuthenticated, error, clearErrors, router]);

    async function loginSubmit(e) {
        e.preventDefault();

        login(email, password);
    }

    return (
        <Layout>
            <Head>
                <title>เข้าสู่ระบบ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            <div className="flex justify-center mx-auto xl:max-w-[1200px] w-full md:w-1/2 xl:w-full h-fit xl:h-[800px] p-4 xl:px-0 xl:py-20">
                <div className="flex flex-row border w-full rounded-lg overflow-hidden">
                    <div id="login-banner" className="hidden xl:block w-1/2 bg-gray-600">

                    </div>
                    <div id="login-form" className="w-full xl:w-1/2 p-6 xl:px-24 xl:py-0 bg-white flex flex-col justify-center">
                        <div className="mb-7 text-center">
                            <h3 className="font-semibold text-2xl text-gray-800">
                                เข้าสู่ระบบ
                            </h3>
                        </div>
                        <form className="space-y-4" onSubmit={loginSubmit}>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-white focus:bg-gray-50 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    placeholder="อีเมล"
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

                            {/* <div className="flex items-center justify-end text-sm">
                                <a
                                    href="#"
                                    className="text-[#BC1F1F] hover:brightness-95 hover:underline"
                                >
                                    ลืมรหัสผ่าน ?
                                </a>
                            </div> */}

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
    );
}

export { getServerSideProps } from "@/utils/get-init-props";