import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail, HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsFacebook } from "react-icons/bs";
import { FaLine } from "react-icons/fa";
import Layout from "@/components/layouts/Layout";
import Link from "next/link";

export default function ContactUs({ config }) {
    return (
        <Layout>
            <section className="mx-auto max-w-[1200px] px-4 xl:px-0 flex flex-col md:flex-row gap-4 xl:gap-6 py-10">
                <div className="mx-auto xl:flex xl:border xl:rounded xl:shadow xl:p-8 w-full px-4 gap-10">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[36px] xl:text-start text-center font-semibold">
                            ติดต่อเรา
                        </h1>

                        <div className="flex flex-col gap-4">
                            <div className="gap-4 flex flex-col xl:flex-row justify-between">
                                <p className="bg-[#4E4E4E] w-full text-white xl:h-[50px] justify-center items-center text-[24px] rounded-md flex ">
                                    <AiOutlinePhone className="mr-2 rotate-90" />
                                    053 876 109
                                </p>
                                <p className="bg-[#4E4E4E] w-full text-white xl:h-[50px] justify-center items-center text-[24px] rounded-md flex ">
                                    <AiOutlinePhone className="mr-2 rotate-90" />
                                    081 952 1342
                                </p>
                            </div>
                            {/* Facebook */}
                            <Link
                                href={config.social?.facebook_url}
                                className="flex flex-row p-4 gap-3 hover:bg-slate-50 xl:rounded-md"
                            >
                                <div className="flex items-center justify-center">
                                    <BsFacebook className="xl:w-[50px] xl:h-[50px] mr-2 w-[100px] h-[100px] xl:text-[#4267B2] text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className=" font-bold text-base xl:text-[#4267B2] text-white">
                                        Facebook
                                    </h3>
                                    <p className="font-semibold text-xl xl:text-[#4267B2] text-white">
                                        พ่วงข้างลานทอง
                                    </p>
                                </div>
                            </Link>

                            {/* Line */}
                            <Link
                                href={config.social?.line_url}
                                className="flex flex-row p-4 gap-3 hover:bg-slate-50 xl:rounded-md"
                            >
                                <div className="flex items-center justify-center">
                                    <FaLine className="xl:w-[50px] xl:h-[50px] mr-2 w-[100px] h-[100px] xl:text-[#06C755] text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className=" font-bold text-base xl:text-[#06C755] text-white">
                                        Line
                                    </h3>
                                    <p className="font-semibold text-xl xl:text-[#06C755] text-white">
                                        lantongshop
                                    </p>
                                </div>
                            </Link>

                            {/* Email */}
                            <Link
                                href={"mailto:lantongshop@gmail.com"}
                                className="flex flex-row p-4 gap-3 hover:bg-slate-50 xl:rounded-md"
                            >
                                <div className="flex items-center justify-center">
                                    <HiOutlineMail className="xl:w-[50px] xl:h-[50px] mr-2 w-[100px] h-[100px] xl:text-[#FF5A60] text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className=" font-bold text-base xl:text-[#FF5A60] text-white">
                                        Email us
                                    </h3>
                                    <p className="font-semibold text-xl xl:text-[#FF5A60] text-white">
                                        lantongshop@gmail.com
                                    </p>
                                </div>
                            </Link>

                            <Link
                                href={"#"}
                                className="flex flex-row p-4 gap-3 hover:bg-slate-50 xl:rounded-md"
                            >
                                <div className="flex items-start justify-center">
                                    <HiOutlineOfficeBuilding className="xl:w-[50px] xl:h-[50px] mr-2 w-[100px] h-[100px] xl:text-cyan-700 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className=" font-bold text-base xl:text-cyan-700 text-white">
                                        Address
                                    </h3>
                                    <p className="font-semibold text-xl xl:text-cyan-700 text-white">
                                        207/3 ถ.วังสิงห์คำ ต.ช้างม่อย
                                        อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50300
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <hr className="xl:hidden" />
                    <div className="w-full mt-4">
                        <h1 className="text-center">GOOGLE MAP</h1>
                        <div className="bg-slate-500 h-[500px]"></div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export { getServerSideProps } from "@/utils/get-init-props";
