import Layout from "@/components/layouts/Layout";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookMessenger } from 'react-icons/fa';
const productDetail = () => {
  return (
    <Layout>
      <section className="md:w-[1200px] mx-auto mt-[40px] pl-4 pr-4">
        {/* first section */}
        <div className="mb-[28px]">
          <a href="#">หน้าแรก สินค้า ชื่อสินค้า นามสมมุติ</a>
        </div>
        <div className="max-w-[1200px] md:flex ">
          <Splide
            className="rounded-md overflow-hidden md:w-[502px] mr-6"
            hasTrack={false}
            options={{
              perPage: 1,
              flickPower: 100,
              type: "loop",
            }}
          >
            <SplideTrack>
              <SplideSlide>
                <div className=" aspect-[16/9]  flex items-center">
                  <Image
                    alt="property-image"
                    src={`https://dummyimage.com/261x261`}
                    unoptimized
                    draggable="false"
                    fill
                    className="select-none object-contain"
                  />
                </div>
              </SplideSlide>
            </SplideTrack>
          </Splide>
          <div className="md:w-[674px]">
            <h1 className="text-[36px] font-semibold mb-[20px]">
              ชื่อสินค้า นามสมมุติ
            </h1>
            <div className="border" />
            <div className="flex justify-between mt-[20px]">
              <p className="text-[24px] font-semibold">#A084</p>
              <p className="text-[24px] font-semibold">9,500฿</p>
            </div>
            <div className="mt-[24px] flex text-center justify-end">
            <Link
                    href={"#"}
                    className="h-[50px] inline-flex items-center bg-[#4267B2] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium bg-[#0082FA] text-white hover:backdrop-brightness-95 py-2 px-4">
                        <FaFacebookMessenger className="mr-3" /> 
                        <span className="block">{"ติดต่อเรา"}</span>
                    </div>
                </Link>
              
            </div>
          </div>
        </div>
        <hr className="border border-1px mt-[28px] mb-[28px]" />

        {/* detail */}
        <div className="flex flex-col gap-y-3">
          <h1 className="text-[20px] font-bold">รายละเอียด</h1>
          <div className="grid grid-cols-2 justify-between">
            <p>
              <span className="font-semibold">ความกว้าง :</span> 60 ซม.
            </p>
            <p>
              <span className="font-semibold">ความยาว :</span> 120 ซม.
            </p>
            <p>
              <span className="font-semibold">ความสูง :</span> 40 ซม.
            </p>
            <p>
              <span className="font-semibold">ความรับน้ำหนัก :</span> 300 กก.
            </p>
          </div>
        </div>
        <hr className="border border-1px mt-[28px] mb-[28px]" />

        {/* คำอธิบาย */}
        <div className="mt-[28px]">
          <h1 className="font-bold text-[20px] mb-[12px]">คำอธิบาย</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidi labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <hr className="border border-1px mt-[28px] mb-[28px]" />
        {/* ของแถม */}
        <h1 className="font-bold text-[20px] flex flex-col gap-y-3">ของแถม</h1>
        <p className="font-semibold">หม้อหุงข้าว</p>
      </section>
    </Layout>
  );
};

export default productDetail;
