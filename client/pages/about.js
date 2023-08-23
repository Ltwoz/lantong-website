import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";

export default function About({ config }) {
    return (
        <Layout>
            <div className="w-full mx-auto bg-neutral-700">
                {/* Banner */}
                <div className="w-full max-h-[700px] aspect-[16/6] relative flex items-center">
                    <Image
                        alt="property-image"
                        src={"/about_bg.png"}
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                    <div className="absolute z-[1] inset-0 w-full h-full overflow-hidden bg-black/50" />
                    <div className="absolute left-0 right-0 mx-auto flex flex-col text-center w-[80%] xl:max-w-[1200px] text-white z-[2]">
                        <h2 className="font-semibold text-sm md:text-lg xl:text-[64px] xl:leading-relaxed mb-1">
                            ประวัติของห้างหุ้นส่วนจำกัด ลานทองเชียงใหม่
                        </h2>
                    </div>
                </div>

                {/* Section 2 */}
                <section className="bg-white">
                    <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center py-12 px-4 xl:px-0">
                        {/* tittle */}
                        <h2 className="text-2xl xl:text-4xl font-bold mb-6 xl:mb-10 text-center border-b-[6px] border-primary pb-2">
                            ทำไมต้องเลือกพ่วงข้างลานทอง
                        </h2>
                        {/* content */}
                        <div
                            className="text-base xl:text-lg"
                            dangerouslySetInnerHTML={{
                                __html: config.about_detail,
                            }}
                        />
                    </div>
                </section>

                {/* Section 4 */}
                <div className="py-12 bg-red-700">
                    <div className="max-w-screen-lg mx-auto px-4 text-white text-center">
                        <h2 className="text-xl md:text-3xl font-bold mb-4">
                            ช่องทางการติดต่อต่างๆ
                        </h2>
                        <div className="mb-8">
                            <Link href={"/contact"}>
                                <button className="py-4 px-8 bg-zinc-800 bg-opacity-80 text-lg md:text-xl font-bold rounded-full">
                                    ติดต่อเรา
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export { getServerSideProps } from "@/utils/get-init-props";
