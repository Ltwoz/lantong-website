import Layout from "@/components/layouts/Layout";
import Accordian from "@/components/ui/homepage/Accordian";
import BannerSlider from "@/components/ui/homepage/BannerSlider";
import FeaturedBlogs from "@/components/ui/homepage/FeaturedBlogs";
import FeaturedProducts from "@/components/ui/homepage/FeaturedProducts";
import Menu from "@/components/ui/homepage/Menu";
import PurchaseStep from "@/components/ui/homepage/PurchaseStep";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function Home({ config }) {
    return (
        <Layout>
            <div className="flex flex-col">
                {/* แบนเนอร์และเมนู */}
                <section
                    id="header"
                    className="h-full md:pb-8 xl:h-[1000px] bg-[#3A3A3A] relative"
                >
                    <div className="md:mb-[-6.5%] mb-0">
                        <BannerSlider />
                    </div>
                    <div className="relative">
                        <Menu />
                    </div>
                </section>

                {/* สินค้าแนะนำ */}
                <section id="featured-products" className="bg-[#B53326]">
                    <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center pt-12 px-4 xl:px-0">
                        <h1 className="font-semibold text-[26px] text-white mb-9 text-center">
                            เลือกซื้อสินค้าที่ได้คุณภาพผ่านการรับรองจากลานทอง
                        </h1>
                        <FeaturedProducts />
                        <p className="text-white text-sm my-8">
                            รับประกันทุกสินค้าจาก หจก.ลานทองเชียงใหม่
                        </p>
                    </div>
                </section>

                {/* วิดีโอ */}
                <section id="video" className="bg-[#E0DADA]">
                    <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center py-12 xl:py-20 px-4 xl:px-0">
                        <h1 className="font-semibold text-[40px] text-black mb-9 text-center">
                            ทำไมต้องลานทอง ?
                        </h1>
                        <div className="overflow-hidden rounded-xl relative pb-[56.25%] w-full">
                            <iframe
                                className="overflow-hidden border-0 self-center absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/-G0mepYTPXE"
                                title="พ่วงข้างลานทอง"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>

                {/* ลานทองพาเที่ยว */}
                <section id="featured-products" className="bg-[#3A3A3A]">
                    <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center pt-12 px-4 xl:px-0">
                        <h1 className="font-semibold text-[26px] text-white mb-9 text-center">
                            ลานทองพาเที่ยว
                        </h1>
                        <FeaturedBlogs />
                        <p className="text-white text-sm my-8">
                            การันตีร้านค้าแนะนำจากลานทอง
                        </p>
                    </div>
                </section>

                {/* ขั้นตอนการซื้อ */}
                <section id="purchase-step" className="bg-[#E0DADA]">
                    <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center py-12 xl:py-20 px-4 xl:px-0">
                        <h1 className="font-semibold text-[40px] text-black mb-9 text-center">
                            ขั้นตอนการซื้อสินค้าจากลานทอง
                        </h1>
                        <PurchaseStep />
                    </div>
                </section>

                {/* เกี่ยวกับ */}
                <section
                    id="about"
                    className="bg-[#E0DADA] relative xl:h-[480px]"
                >
                    {/* รูป Background */}
                    <div className="absolute inset-0 w-full h-full z-[1]">
                        <Image
                            alt="property-image"
                            src={
                                config?.about_bg.url
                                    ? config?.about_bg[0].url
                                    : `/about-bg.png`
                            }
                            draggable="false"
                            fill
                            className="absolute select-none object-cover z-[-1]"
                        />
                    </div>
                    {/* ข้อความ */}
                    <div className="w-full h-full relative flex items-center">
                        {/* Overlay */}
                        <div className="absolute z-[1] inset-0 w-full h-full overflow-hidden bg-black/70" />
                        {/* เนื้อหา */}
                        <div className="w-full h-fit max-w-[1200px] mx-auto flex flex-col xl:flex-row justify-between items-center xl:items-start py-10 xl:py-0 px-4 xl:px-0 z-[2] gap-4">
                            <div className="flex flex-col items-center xl:items-start gap-2 xl:gap-4">
                                <p className="text-white text-base xl:text-2xl font-semibold">
                                    เกี่ยวกับเรา
                                </p>
                                <h2 className="text-white text-2xl xl:text-[40px] font-semibold">
                                    พ่วงข้างลานทอง
                                </h2>
                            </div>
                            <div className="flex flex-col items-center xl:items-start gap-4 xl:gap-8 xl:w-[530px] text-center xl:text-start">
                                <div
                                    className="text-white text-sm xl:text-base font-normal"
                                    dangerouslySetInnerHTML={{
                                        __html: config.website_desc,
                                    }}
                                />
                                {/* Button */}
                                <Link
                                    href={config?.social.facebook_url}
                                    target="_blank"
                                    className="xl:h-[50px] w-fit inline-flex items-center bg-[#4267B2] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white text-sm xl:text-base hover:backdrop-brightness-95 py-2 px-4 xl:px-6">
                                        <FaFacebook className="mr-2" />
                                        <span className="block">
                                            {"พ่วงข้างลานทอง"}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* คำถามที่พบบ่อย */}
                <section id="purchase-step" className="bg-[#F4F6F8]">
                    <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center py-12 xl:py-20 px-4 xl:px-0">
                        <h1 className="font-semibold text-[40px] text-black mb-9 text-center">
                            คำถามที่พบบ่อย
                        </h1>
                        <div className="w-full">
                            <Accordian
                                title="หจก.ลานทองเชียงใหม่อยู่ที่ไหน"
                                content={
                                    "ห้างหุ้นส่วนจำกัด ลานทองเชียงใหม่ เลขที่ 207/3 ถ.วังสิงห์คำ ต.ช้างม่อย อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50300"
                                }
                            />
                            <Accordian
                                title="สินค้ามีการรับประกันไหม"
                                content={
                                    "สินค้าทุกชิ้น มีการันตีการรับประกันจากลานทอง"
                                }
                            />
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export { getServerSideProps } from "@/utils/get-init-props";
