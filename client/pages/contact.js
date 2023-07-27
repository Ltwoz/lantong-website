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
      <div className="md:w-[1200px] mx-auto md:flex md:border md:p-8 w-[375px]">
        <div className="md:ml-8 ">
          <h1 className="text-[36px] max-[375px]:text-center font-semibold text-[#B53326]">
            ติดต่อเรา
          </h1>

          <div className="">
            <p className="bg-[#4E4E4E] md:w-[200px] text-white md:h-[50px] justify-center items-center text-[24px] rounded-[6px] flex ">
              <AiOutlinePhone className="mr-2 rotate-90" />
              081 952 1342
            </p>
          </div>

          {/* Facebook */}
          <Link href={"##"}>
            <div className="md:hover:bg-slate-50 max-[375px]:text-center max-[375px]:bg-[#4267B2]">
              <h1 className="mt-8 font-bold md:text-[18px] text-[28px] text-[#4267B2] max-[375px]:text-white">
                Facebook
              </h1>

              <div className="flex items-center max-[375px]:justify-center max-[375px]:flex-col mt-2">
                <BsFacebook className="md:w-[50px] md:h-[50px] mr-2 w-[100px] h-[100px]" />
                <p className="font-semibold max-[375px]:text-[24px] text-[#4267B2] mt-2 max-[375px]:text-white">
                  ลานทองพ่วงข้าง
                </p>
              </div>
            </div>
          </Link>

          {/* Line */}
          <Link href={"#"}>
            <div className="md:hover:bg-slate-50 max-[375px]:text-center max-[375px]:bg-[#06C755]">
              <h1 className="mt-8 font-bold md:text-[18px] text-[28px] text-[#06C755] max-[375px]:text-white">
                Line
              </h1>
              <div className="flex items-center max-[375px]:justify-center max-[375px]:flex-col mt-2">
                <FaLine className="md:w-[50px] md:h-[50px] md:mr-2  w-[100px] h-[100px]" />
                <p className="font-semibold max-[375px]:text-[24px] md:text-[#06C755] text-white">
                  ลานทองพ่วงข้าง
                </p>
              </div>
            </div>
          </Link>

          {/* Email */}
          <Link href={"#"}>
            <div className="md:hover:bg-slate-50 max-[375px]:text-center max-[375px]:bg-[#FF5A60]">
              <h1 className="mt-8 font-bold md:text-[18px] text-[28px] text-[#FF5A60] max-[375px]:text-white">
                Email us
              </h1>
              <div className="flex items-center max-[375px]:justify-center max-[375px]:flex-col mt-2">
                <HiOutlineMail className="md:w-[50px] md:h-[50px] md:mr-2 w-[100px] h-[100px]" />
                <p className="font-semibold md:text-[#FF5A60] text-white max-[375px]:text-[24px]">
                  lantongshop@gmail.com
                </p>
              </div>
            </div>
          </Link>

          <div className="mt-8">
            <h1 className="font-semibold">
              ห้างหุ้นส่วนจำกัด ลานทองธุรกิจยนต์
            </h1>
            <div className="flex items-center">
              <FaRoad className="md:w-[50px] md:h-[50px] w-[100px] h-[100px] mr-2 md:mr-2 mt-2" />
              <p>
                4/4 ถ.รัตนโกสินทร์ ต.ช้างม่อย อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200
              </p>
            </div>
          </div>
        </div>
        <hr/>
        <div className="md:w-full w-[375px] mt-4">
          <h1 className="text-center">GOOGLE MAP</h1>
          <div className="bg-slate-500 h-[500px]"></div>
        </div>
      </div>
    </Layout>
  );
}
