import Layout from "@/components/layouts/Layout";
import { BsFacebook } from "react-icons/bs";
import { FaLine } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import Link from "next/link";

export default function ContactUs() {
  return (
    <Layout>
        <div className="bg-[#B53326] md:w-full h-[450px] flex flex-col items-center justify-center w-[375px]">
          <h1 className="text-center font-semibold text-white text-[70px]">
            ติดต่อเรา
          </h1>
          <button className="mt-4 text-white bg-[#4E4E4E] md:w-[421px] md:h-[94px] font-semibold text-[36px] rounded-[6px] flex justify-center items-center w-[375px] h-[94px] ">
            <AiOutlinePhone className="mr-2 rotate-90" />
            081 952 1342
          </button>
        </div>

        <div className="md:w-[1200px] border mx-auto w-[375px]">
          {/* Facebook */}
          <Link href="#">
            <div className="bg-[#4267B2] md:h-[300px] h-fit md:flex items-center md:mt-[125px] mt-[35px] p-5 ">
              <BsFacebook className="md:w-[200px] md:h-[200px] md:ml-[56px] max-[376px]:ml-auto max-[376px]:mr-auto w-[100px] h-[100px]" />
              <h1 className="text-white md:text-[74px] md:ml-[182px] text-[24px] text-center">
                ลานทองพ่วงข้าง
              </h1>
            </div>
          </Link>

          {/* Line */}
          <Link href="#">
            <div className="bg-[#06C755] md:h-[300px] h-fit  md:flex items-center md:mt-[125px] mt-[35px] p-5 ">
              <FaLine className="md:w-[200px] md:h-[200px] md:ml-[56px] w-[100px] max-[376px]:ml-auto max-[376px]:mr-auto h-[100px]" />
              <h1 className="text-white md:text-[74px] md:ml-[182px] text-[24px] text-center">
                lantongshop
              </h1>
            </div>
          </Link>

          {/* Email */}
          <Link href="#">
            <div className="bg-[#FF5A60] md:h-[300px] h-fit  md:flex items-center md:mt-[125px] mt-[35px] p-5 ">
              <HiOutlineMail className="md:w-[200px] md:h-[200px] md:ml-[56px] max-[376px]:ml-auto max-[376px]:mr-auto w-[100px] h-[100px]" />
              <h1 className="text-white md:text-[65px] text-[24px] md:ml-[182px] md:mr-[24px] text-center">
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