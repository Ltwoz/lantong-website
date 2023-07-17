import Layout from "@/components/layouts/Layout";
import BannerSlider from "@/components/ui/homepage/BannerSlider";
import FeaturedProducts from "@/components/ui/homepage/FeaturedProducts";
import Menu from "@/components/ui/homepage/Menu";

export default function Home() {
    return (
        <Layout>
            {/* แบนเนอร์และเมนู */}
            <section
                id="header"
                className="h-full md:h-screen bg-[#3A3A3A] relative"
            >
                <div className="md:mb-[-6.5%] mb-0">
                    <BannerSlider />
                </div>
                <div className="relative px-4 py-6">
                    <Menu />
                </div>
            </section>

            {/* สินค้าแนะนำ */}
            <section id="featured-products" className="bg-[#B53326]">
                <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center py-20 px-4 md:px-0">
                    <h1 className="font-semibold text-[40px] text-white mb-9 text-center">
                        เลือกซื้อสินค้าที่ได้คุณภาพผ่านการรับรองจากลานทอง
                    </h1>
                    <FeaturedProducts />
                </div>
            </section>

            {/* วิดีโอ */}
            <section id="video" className="bg-[#E0DADA]">
                <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center py-20 px-4 md:px-0">
                    <h1 className="font-semibold text-[40px] text-black mb-9 text-center">
                        ทำไมต้องลานทอง
                    </h1>
                    <div className="overflow-hidden rounded-xl relative pb-[56.25%] w-full">
                        <iframe
                            className="overflow-hidden border-0 self-center absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/-G0mepYTPXE"
                            title="พ่วงข้างลานทอง"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
}
