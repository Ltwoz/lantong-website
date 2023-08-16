import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <Layout>
      <div className="w-full mx-auto bg-neutral-700">
        {/* Banner */}
        <div className="md:w-full relative">
          <Image
            className="w-full fit-object"
            src="/about_bg.png"
            width={1920}
            height={806}
          />
          {/* text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-white text-[18px] md:text-6xl font-bold leading-tight">
                เลือกพ่วงข้างทำไมต้อง
              </h1>
              <h1 className="md:text-[96px] text-[28px] text-[#FF5A60] font-bold">
                ทำไมต้องลานทอง
              </h1>
              {/* button */}
              <div className="mt-4">
                <button className="py-4 px-8 bg-red-700 text-white text-[18px] md:text-3xl font-bold rounded-full">
                  ดูสินค้าลานทอง
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        {/* set */}
        <div className="bg-white py-12">
          <div className="max-w-screen-lg mx-auto px-4">
            {/* tittle */}
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-20 text-center bg-red-500 rounded-full p-5">
              ทำไมต้องเลือกพ่วงข้างลานทอง
            </h2>
            {/* content */}
            <p className="text-black text-xl md:text-2xl text-center p-5">
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment, so blinded by desire, that they cannot
              foresee the pain and trouble that are bound to ensue; and equal
              blame belongs to those who fail in their duty through weakness of
              will, which is the same as saying through shrinking from toil and
              pain. These cases are perfectly simple and easy to distinguish. In
              a free hour, when our power of choice is untrammelled and when
              nothing prevents our being able to do what we like best, every
              pleasure is to be welcomed and every pain avoided. But in certain
              circumstances and owing to the claims of duty or the obligations
              of business it will frequently occur that pleasures have to be
              repudiated and annoyances accepted. The wise man therefore always
              holds in these matters to this principle of selection: he rejects
              pleasures to secure other greater pleasures, or else he endures
              pains to avoid worse pains.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        {/* set */}
        <div className="py-12 bg-neutral-700">
          <div className=" mx-auto px-4">
            {/* tittle */}
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 text-center bg-[#B53326] p-5">
              สินค้าและบริการ
            </h2>
            {/* image set */}
            <div className="md:flex md:justify-center md:space-x-4 p-10 mt-10">
              <div className="flex flex-col items-center mb-8">
                {/*image click*/}
                <button className="btn-1">
                <Image
                  className="w-[300px] h-auto md:w-[466px] md:h-[906px] rounded-lg"
                  src="/466x906.png"
                  width={463}
                  height={906}
                />
                </button>
                {/* button below */}
                <button className="text-white text-2xl md:text-3xl font-bold mt-4 bg-[#282828] p-3 rounded-xl">
                  มอเตอร์ไซด์มีพ่วงข้าง
                </button>
              </div>
              <div className="flex flex-col items-center mb-8">
                {/*image click*/}
                <button className="btn-2">
                <Image
                  className="w-[300px] h-auto md:w-[466px] md:h-[906px] rounded-lg"
                  src="/466x906.png"
                  width={466}
                  height={906}
                />
                </button>
                {/* button below */}
                <button className="text-white text-2xl md:text-3xl font-bold mt-4 bg-[#282828] p-3 rounded-xl">
                  พ่วงข้างขายของ
                </button>
              </div>
              <div className="flex flex-col items-center mb-8">
                {/* image click */}
                <button className="btn-3">
                <Image
                  className="w-[300px] h-auto md:w-[466px] md:h-[906px] rounded-lg rounded-xl"
                  src="/466x906.png"
                  width={466}
                  height={906}
                />
                </button>
                {/*button below*/}
                <button className="text-white text-2xl md:text-3xl font-bold mt-4 bg-[#282828] p-3 rounded-xl">
                  พ่วงข้างวินเทจ
                </button>
              </div>
              <div className="flex flex-col items-center mb-8">
                {/*image click*/}
                <button className="btn-4">
                <Image
                  className="w-[300px] h-auto md:w-[466px] md:h-[908px] rounded-lg opacity-60"
                  src="/466x906.png"
                  width={466}
                  height={906}
                />
                </button>
                {/*button below*/}
                <button className="text-white text-2xl md:text-3xl font-bold mt-4 bg-[#282828] p-3 rounded-xl">
                  หมวดหมู่อื่นๆ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="py-12 bg-red-700">
          <div className="max-w-screen-lg mx-auto px-4 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ช่องทางการติดต่อต่างๆ
            </h2>
            <div className="mb-8">
              <Link href={"/contact"}>
                <button className="py-4 px-8 bg-zinc-800 bg-opacity-80 text-2xl md:text-3xl font-bold rounded-full">
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