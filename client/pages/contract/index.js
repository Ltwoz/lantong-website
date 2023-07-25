import Layout from "@/components/layouts/Layout";
import Accordian from "@/components/ui/contract/Accordian";
const ContractUs = () => {
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
          <div className="bg-[#4267B2] w-[250px] cursor-pointer ">
            <div className="text-white text-center h-fit mt-2 mb-2 ">
              Facebook
            </div>
          </div>

          <div className="bg-[#06C755] w-[250px] cursor-pointer ">
            <div className="text-white text-center h-fit mt-2 mb-2 ">Line</div>
          </div>

          <div className="bg-[#FF5A60] w-[250px] cursor-pointer hover:">
            <div className="text-white text-center h-fit mt-2 mb-2 ">Email</div>
          </div>
          <Accordian title={"Facebook"} content={<img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/07/03/20/semicolon.jpg" />} />
        </div>

        <div className="mx-auto">
          <h1 className="text-center">Google Maps</h1>
        </div>
      </div>
    </Layout>
  );
};

export default ContractUs;
