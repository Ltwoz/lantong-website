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
import { z } from "zod";

export default function Register({ config }) {
    const { register, isAuthenticated, error, clearErrors, dispatch } =
        useUser();

    const router = useRouter();

    // Auth State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateSchema = z
        .object({
            name: z.string().min(1, { message: "ใส่ชื่อผู้ใช้" }),
            email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
            password: z
                .string()
                .min(8, { message: "รหัสผ่านต้อง 8 ตัวขึ้นไป" }),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "รหัสผ่านไม่ตรงกัน",
            path: ["confirmpassword"],
        });

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

        const validatedForm = validateSchema.safeParse({
            name,
            email,
            password,
            confirmPassword,
        });

        if (!validatedForm.success) {
            validatedForm.error.issues.map((err) => {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
            return false;
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
                <title>ลงทะเบียน - {config.website_title}</title>
            </Head>
            <div className="flex justify-center mx-auto xl:max-w-[1200px] w-full md:w-1/2 xl:w-full h-fit xl:h-[800px] p-4 xl:px-0 xl:py-20">
                <div className="flex flex-row border w-full rounded-lg overflow-hidden">
                    <div id="login-banner" className="hidden xl:block w-1/2">
                        <div className="w-full h-full relative flex items-center">
                            <div className="absolute z-[1] right-0 bottom-0 left-0 w-full h-[70%] overflow-hidden bg-gradient-to-t from-black/80 to-white/0 opacity-100" />
                            <Image
                                alt="property-image"
                                src={
                                    "https://media.discordapp.net/attachments/609919287024680961/1152189833570156554/image.png"
                                }
                                draggable="false"
                                fill
                                className="select-none object-cover object-top"
                            />
                        </div>
                    </div>
                    <div
                        id="login-form"
                        className="w-full xl:w-1/2 p-6 xl:px-24 xl:py-0 bg-white flex flex-col justify-center"
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
                                    type="email"
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
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center bg-primary rounded-lg transition-all overflow-hidden"
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
                                href="/auth/login"
                                className="text-sm ml-1 text-primary hover:brightness-95 hover:underline"
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

export { getServerSideProps } from "@/utils/get-init-props";
