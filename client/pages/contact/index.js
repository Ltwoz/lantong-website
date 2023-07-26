import Layout from "@/components/layouts/Layout";
import { BsFacebook } from "react-icons/bs";
import { FaLine } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import Link from "next/link";

export default function ContactUs() {
  return (
    <Layout>
      <div className="bg-[#B53326] md:w-full h-[450px] flex flex-col items-center justify-center">
        <h1 className="text-center font-semibold text-white text-[70px]">
          ติดต่อเรา
        </h1>
        <button className="mt-4 text-white bg-[#4E4E4E] w-[421px] h-[94px] font-semibold text-[36px] rounded-[6px] flex justify-center items-center">
          <AiOutlinePhone className="mr-2 rotate-90" />
          081 952 1342
        </button>
      </div>

      <div className="md:w-[1200px] border mx-auto">
        {/* Facebook */}
        <Link href="#">
          <div className="bg-[#4267B2] h-[300px] flex items-center mt-[125px]">
            <BsFacebook className="md:w-[200px] md:h-[200px] ml-[56px]" />
            <h1 className="text-white text-[74px] ml-[182px]">
              ลานทองพ่วงข้าง
            </h1>
          </div>
        </Link>

        {/* Line */}
        <Link href="#">
          <div className="bg-[#06C755] h-[300px] flex items-center mt-[35px]">
            <FaLine className="md:w-[200px] md:h-[200px] ml-[56px]" />
            <h1 className="text-white text-[74px] ml-[182px]">lantongshop</h1>
          </div>
        </Link>

        {/* Email */}
        <Link href="#">
          <div className="bg-[#FF5A60] h-[300px] flex items-center mt-[35px]">
            <HiOutlineMail className="md:w-[200px] md:h-[200px] ml-[56px]" />
            <h1 className="text-white text-[65px] ml-[182px] mr-[24px]">
              lantongshop@gmail.com
            </h1>
          </div>
        </Link>

        <div>
          <h1 className="text-center mt-10 mb-10">GOOGLE MAP</h1>
          <div className="border border-2px h-[500px] mb-[97px] bg-slate-500"></div>
        </div>
      </div>
    </Layout>
  );
}
