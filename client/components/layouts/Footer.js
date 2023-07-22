import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full p-4 py-6 bg-[#380303]">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div id="logo">
                        <Link
                            scroll={false}
                            href={`/`}
                            className="flex md:w-auto justify-center items-center"
                        >
                            <div className="relative h-8 w-8 mr-2">
                                <Image
                                    alt="logo_img"
                                    src={"/lantong_logo.png"}
                                    draggable="false"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h2 className="text-xl md:text-2xl font-semibold text-white">
                                หจก.ลานทองเชียงใหม่
                            </h2>
                        </Link>
                    </div>
                    <div
                        id="footer-items-group"
                        className="flex flex-row items-center gap-3 md:gap-6 text-white text-xs md:text-sm"
                    >
                        <Link href="/about">เกี่ยวกับ</Link>
                        <Link href="#">เงื่อนไขการใช้บริการ</Link>
                        <Link href="#">นโยบายความเป็นส่วนตัว</Link>
                        <Link href="/contact">ติดต่อเรา</Link>
                    </div>
                </div>
            </div>
            <hr className="w-full border-gray-500/30 my-6" />
            <span class="block text-sm text-white/70 text-center">
                © 2023{" "}
                <a href="https://lantongshop.com" class="hover:underline">
                    หจก.ลานทองเชียงใหม่
                </a>
                . สงวนลิขสิทธิ์.
            </span>
        </footer>
    );
};

export default Footer;
