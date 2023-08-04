import Layout from "@/components/layouts/Layout";
import { REGISTER_FAIL } from "@/constants/user-constants";
import { useUser } from "@/contexts/user-context";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const { register, isAuthenticated, error, clearErrors, dispatch } =
        useUser();

    const router = useRouter();

    // Auth State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Toastify
    useEffect(() => {
        if (isAuthenticated) {
            toast.success("ลงทะเบียนสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });

            router.push("/");
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            clearErrors();
        }
    }, [isAuthenticated, error, clearErrors, router]);

    async function registerSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            return dispatch({
                type: REGISTER_FAIL,
                payload: "กรุณากรอกข้อมูลให้ครบ",
            });
        }

        if (password !== confirmPassword) {
            return dispatch({
                type: REGISTER_FAIL,
                payload: "รหัสผ่านไม่ตรงกัน",
            });
        }

        register({
            name,
            email,
            password,
        });
    }

    return (
        <Layout>
            <Head>
                <title>ลงทะเบียน - หจก.ลานทองเชียงใหม่</title>
            </Head>
            <div className="flex justify-center mx-auto md:max-w-[1200px] w-full h-fit md:h-[800px] p-4 md:px-0 md:py-20">
                <div className="flex flex-row border w-full rounded-lg overflow-hidden">
                    <div
                        id="login-banner"
                        className="hidden md:block w-1/2 bg-gray-600"
                    ></div>
                    <div
                        id="login-form"
                        className="w-full md:w-1/2 p-6 md:px-24 md:py-0 bg-white flex flex-col justify-center"
                    >
                        <div className="mb-7 text-center">
                            <h3 className="font-semibold text-2xl text-gray-800">
                                ลงทะเบียน
                            </h3>
                        </div>
                        <form className="space-y-4" onSubmit={registerSubmit}>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-white focus:bg-gray-50 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    placeholder="ชื่อผู้ใช้"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                            <div className="relative">
                                <input
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-white focus:bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="ยืนยันรหัสผ่าน"
                                    type="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center bg-[#BC1F1F] rounded-lg transition-all overflow-hidden"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-3 px-4">
                                        <span className="block tracking-wide">
                                            ลงทะเบียน
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-400 text-center text-sm mt-8">
                            มีบัญชีอยู่แล้ว ?{" "}
                            <Link
                                href="/auth/register"
                                className="text-sm ml-1 text-[#BC1F1F] hover:brightness-95 hover:underline"
                            >
                                เข้าสู่ระบบ
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
