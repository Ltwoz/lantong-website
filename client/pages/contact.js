import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BsFacebook } from "react-icons/bs";
import { FaLine } from "react-icons/fa";
import { FaRoad } from "react-icons/fa";
import Layout from "@/components/layouts/Layout";
import Link from "next/link";
export default function ContactUs() {
  return (
    <Layout>
      <div className="md:w-[1200px] mx-auto md:flex md:border rounded shadow md:p-8 w-full px-4 gap-10">
        <div className="flex flex-col ">
          <h1 className="text-[36px] md:text-start text-center font-semibold text-[#B53326]">
            ติดต่อเรา
          </h1>

          <div className="flex flex-col gap-4">
            <div className="">
              <p className="bg-[#4E4E4E] md:w-[200px] text-white md:h-[50px] justify-center items-center text-[24px] rounded-md flex ">
                <AiOutlinePhone className="mr-2 rotate-90" />
                081 952 1342
              </p>
            </div>
            {/* Facebook */}
            <Link
              href={"#"}
              className="md:hover:bg-slate-50 md:text-start text-center md:bg-transparent bg-[#4267B2] rounded-md p-4 "
            >
              <h1 className=" font-bold md:text-[18px] text-[28px] md:text-[#4267B2] text-white">
                Facebook
              </h1>
              <div className="flex items-center md:justify-start justify-center md:flex-row flex-col mt-2">
                <BsFacebook className="md:w-[50px] md:h-[50px] mr-2 w-[100px] h-[100px] md:text-[#4267B2] text-white" />
                <p className="font-semibold text-[24px] md:text-[#4267B2] mt-2 text-white">
                  ลานทองพ่วงข้าง
                </p>
              </div>
            </Link>

            {/* Line */}
            <Link
              href={"#"}
              className="md:hover:bg-slate-50 md:text-start text-center md:bg-transparent bg-[#06C755] rounded-md  p-4"
            >
              <h1 className="font-bold md:text-[18px] text-[28px] md:text-[#06C755] text-white">
                Line
              </h1>
              <div className="flex items-center md:justify-start justify-center md:flex-row flex-col mt-2">
                <FaLine className="md:w-[50px] md:h-[50px] md:mr-2  w-[100px] h-[100px] text-white md:text-[#06C755]" />
                <p className="font-semibold text-[24px] md:text-[#06C755] text-white">
                  ลานทองพ่วงข้าง
                </p>
              </div>
            </Link>

            {/* Email */}
            <Link
              href={"#"}
              className="md:hover:bg-slate-50 md:text-start text-center md:bg-transparent bg-[#FF5A60] rounded-md  p-4"
            >
              <h1 className="font-bold md:text-[18px] text-[28px] md:text-[#FF5A60] text-white">
                Email us
              </h1>
              <div className="flex items-center md:justify-start justify-center md:flex-row flex-col mt-2">
                <HiOutlineMail className="md:w-[50px] md:h-[50px] md:mr-2 w-[100px] h-[100px] text-white md:text-[#FF5A60]" />
                <p className="font-semibold md:text-[#FF5A60] text-white text-[24px]">
                  lantongshop@gmail.com
                </p>
              </div>
            </Link>

            <div className="flex flex-col pl-4">
              <h1 className="font-semibold md:text-[18px]">Address</h1>
              <div className="flex items-center">
                <FaRoad className=" w-[100px] h-[100px] mr-2 md:block hidden" />
                <p>
                  ห้างหุ้นส่วนจำกัด ลานทองธุรกิจยนต์ 4/4 ถ.รัตนโกสินทร์
                  ต.ช้างม่อย อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="md:hidden" />
        <div className="w-full mt-4">
          <h1 className="text-center">GOOGLE MAP</h1>
          <div className="bg-slate-500 h-[500px]"></div>
        </div>
      </div>
    </Layout>
  );
}

export { getServerSideProps } from "@/utils/get-init-props";