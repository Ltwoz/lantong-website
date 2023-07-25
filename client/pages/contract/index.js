import Layout from "@/components/layouts/Layout";
import { useState } from "react";
const ContractUs = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((current) => !current);
  return (
    <Layout>
      <div className="md:w-[1200px] mx-auto border">
        <div className="md:">
          <h1 className="text-[48px] text-[#E32C2C] text-center border-bottom">
            ติดต่อสอบถามปัญหาต่างๆ
          </h1>

          <button className="bg-[#4E4E4E] flex p-2 text-lg text-white rounded-md mx-auto">
            081 952 1342
          </button>

          <hr className="border-2 border-black opacity-50 mt-5" />
        </div>

        {/* hover ให้แสดงข้อมูลทั้งหมด */}
        <div className="my-5 grid grid-cols-3 ml-[6rem]">
          {/* Facebook */}
          <div
            className="bg-[#4267B2] w-[250px] cursor-pointer "
            onClick={toggleExpanded}
          >
            <div className="text-white text-center h-fit mt-2 mb-2 ">
              Facebook
            </div>
            <div
              className={`px-6 pt-0 overflow-y-scroll md:overflow-hidden transition-[max-height] duration-300 ease-in ${
                expanded ? "max-h-50" : "max-h-0"
              }`}
            >
              <p className="text-white pb-2 text-left w-[250px]">
                ลานทองพ่วงข้าง
              </p>
            </div>
          </div>
          {/* Line */}
          <div
            className="bg-[#06C755] w-[250px] cursor-pointer "
            onClick={toggleExpanded}
          >
            <div className="text-white text-center h-fit mt-2 mb-2 ">
              Facebook
            </div>
            <div
              className={`px-6 pt-0 overflow-y-scroll md:overflow-hidden transition-[max-height] duration-300 ease-in ${
                expanded ? "max-h-50" : "max-h-0"
              }`}
            >
              <div className="bg-[#06C755]">
                <img src="https://digitalpress.fra1.cdn.digitaloceanspaces.com/b7uv0cn/2023/04/ChatGPT-preview.jpg"  className="w-[118px] h-[112px] mb-2 ml-10"/>
                <p className="text-white  pb-2 opacity-100 ml-12 w-[250px]">
                  lantongshop
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="bg-[#FF5A60] w-[250px] cursor-pointer "
            onClick={toggleExpanded}
          >
            <div className="text-white text-center h-fit mt-2 mb-2 ">
              Facebook
            </div>
            <div
              className={`px-6 pt-0 overflow-y-scroll md:overflow-hidden transition-[max-height] duration-300 ease-in ${
                expanded ? "max-h-50" : "max-h-0"
              }`}
            >
              <p className="text-white pb-2 text-left w-[250px]">
                lantongshop@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <h1 className="text-center">Google Maps</h1>
        </div>
      </div>
    </Layout>
  );
};

export default ContractUs;
