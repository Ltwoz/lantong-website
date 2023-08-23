import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function About() {
  const [showFullContent, setShowFullContent] = useState(false);
  return (
    <Layout>
      <div className="w-fit mx-auto bg-neutral-700">
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
            <p className="text-black text-xl md:text-2xl text-left leading-normal">
              ขอบคุณทุกความไว้วางใจที่ทำให้ลานทองเชียงใหม่ (พ่วงข้างลานทอง)
              <br />
              อยู่คู่พ่อค้าแม่ค้า กว่า 20 ปีด้วยคำมั่นสัญญาที่
              จะผลิตรถที่ใช้งานกับธุรกิจทุกประเภทที่แข็งแรงสวยงาม
              ทนทานจากวัสดุเกรด A ที่รับประกันคุณภาพ โดยลานทองเชียงใหม่
              สินค้าของเราไม่ใช่สินค้าที่ราคาถูกที่สุด
            </p>
            <br />
            <p className="text-[30px] p-5 font-bold">
              แต่สินค้าของเรา สวยงามทนทาน ปลอดภัย และใช้งานได้ยาวนานที่สุด
            </p>
            <br />
            <br />
            <h1 className="text-black text-center font-bold text-[40px] p-10">
              ประวัติของห้างหุ้นส่วนจำกัด
            </h1>
            <p className="text-left">
              ลานทองเชียงใหม่จุดเริ่มต้นของการเดินทางสู่เส้นทางของลานทองเชียงใหม่
              (พ่วงข้างลานทอง) <br />
              เกิดขึ้นในปี พ.ศ.2547 คุณพ่อสถิตย์ แก้วดวงดี
              ที่มองเห็นปัญหาของรถพ่วงมอไซค์ทุกคันในสมัยนั้น
              <br />
              จะเจาะรถมอไซค์และยึดติดโครงพ่วงทำให้รถมอไซค์เสียหายขายต่อก็ราคาตกเพราะเคยติดพ่วงมา
              <br />
              และเห็นโอกาสทางธุรกิจที่ พ่อค้า-แม่ค้า เจ้าของธุรกิจส่วนใหญ่
              ต้องการประหยัดในการขนส่งเพราะค่าน้ำมันแพงขึ้นเรื่อยๆ ไม่ว่าจะเป็น
              การขนส่งคน หรือ การขนส่งของ และ ร้านค้าพ่วงข้างเคลื่อนที่
              จึงได้คิดและออกแบบพ่วงข้างแบบไม่ต้องเจาะรถให้เสียหายกับหลายชายที่จบการออกแบบและช่างเชื่อม
              <br />
              ตลอดระยะเวลา 20
              ปีที่ผ่านมาเราได้ผลิตพ่วงข้างติดรถมอไซค์หลากหลายรุ่นแบบมากกว่า
              10,000 คัน <br />
              ส่งตรงถึงลูกค้าทั่วประเทศและต่างประเทศ
              ดังนั้นเราจึงได้จดสิทธิบัตรพ่วงข้างแบบน๊อคดาวน์
              <br />
              ที่เป็นความรู้ที่เราคิดค้นขึ้นเป็นแห่งแรกและแห่งเดียวในประเทศไทย
            </p>
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-[18px] md:text-2xl text-white p-2 font-bold underline cursor-pointer bg-[#b8000f] no-underline rounded my-5 md:mx-[42%] content-center  "
            >
              {showFullContent ? "Read less" : "Read more"}
            </button>
            <div
              className={`text-fade transition-all duration-300 ${
                showFullContent ? "h-auto opacity-100" : "h-0 opacity-0"
              }`}
            >
              <p>
                <br />
                จากจุดเริ่มต้นที่ พ่วงข้างลานทอง
                เป็นพ่วงข้างมอไซค์ที่แตกต่างจากพ่วงข้างทั่วไป
                ที่เราใส่ใจในการผลิตทุกขั้นตอน ตั้งแต่วัสดุในการผลิตต้องเกรด A
                เหล็กที่เราใช้ในการผลิตต้องได้มาตรฐาน ม.อ.ก เท่านั้น
                ลูกปืนที่ใช้ในล้อ
                ต้องเป็นลูกปืนขนาดใหญ่กว่ามาตรฐานและต้องเป็นเกรดอุตสาหกรรมเท่านั้น
                <br />
                และการดัดเหล็กโครงพ่วงให้โค้งสวยงามเหล็กไม่คดไม่ฉีก
                ต้องใช้เครื่องดัดเหล็กอุตสหกรรม
                <br />
                เราพ่นสีกันสนิมก่อนและค่อยทำสีจริง นอกจากนั้น
                การติดพ่วงต้องมีการตั้งศูนย์
                <br />
                เพื่อให้ขับขี่อย่างมั่นใจปลอดภัยบนท้องถนน
                และเมื่อรถพ่วงข้างลานทองออกสู่ลูกค้ามากขึ้น
                <br />
                เสียงจากลูกค้าสะท้อนกับมาให้เรา “พ่วงข้างลานทอง ใช้ดี ทนทาน”
                <br />
                เพราะเหล็กที่เราใช้คือเหล็กอย่างหนามี ม.อ.ก ทุกคัน
                และรถคันแรกปัจจุบันยังใช้งานได้ดีอยู่
                <br />
                นั่นคือสิ่งที่เราภาคภูมิใจที่เราได้ผลิตสินค้าดี
                ทนทานและปลอดภัยให้กับลูกค้าของเรา
              </p>
              <p>
                <br />
                และจากจุดเริ่มต้นของการผลิตพ่วงข้างที่ผลิตมาอย่างมากมาย
                ทายาทรุ่นที่ 2 ซึ่งเป็นลูกสาวคนรองและสามี
                ได้เข้ามาช่วยคุณพ่อสถิตย์ ดูแลธุรกิจ
                จึงได้เพิ่มสินค้าที่ลูกค้าต้องการนอกเหนือจากพ่วงข้าง มอไซค์
                <br />
                อาทิเช่น side car ,รถเข็นขายของทุกประเภท,สามล้อวิเทจ ,รถเทลเลอร์
                หรือ รถฟู๊ดทรักซ์
                <br />
                และได้เป็นตัวแทนจำหน่ายรถ จักรยานยนต์ 3 ล้อ ยี่ห้อ STC และ SEV
                ซึ่งเป็นรถสามล้อเพื่อธุรกิจขนส่ง
                <br />
                และลานทองได้ต่อเติมรถสามล้อ STC ให้เป็นสามล้อขายของเคลื่อนที่
                FOOD TRUCK ในราคาประหยัด ที่ถูกกว่ารถยนต์ถึง 5 เท่า
              </p>
              <p>
                <br />
                จากธุรกิจเล็กๆ จากความตั้งใจที่จะผลิตรถที่ดีให้กับลูกค้า
                และเสียงจากลูกค้าตอบรับกับสินค้าของเรา
                <br />
                ลานทองจึงได้ขยายธุรกิจ สร้างอาคารใหม่ขนาด 1200 ตรม
                บนที่ดินของตนเองที่ใกล้สาขาเดิม
                <br />
                ห่างจากสาขาเดิมเพียง 500 เมตร
                เพื่อเป็นโชว์รูมแสดงสินค้าเพื่อบริการลูกค้า
                <br />
                โดยตั้งเป็นสาขาสำนักงานใหญ่ขึ้นที่ ถ.วังสิงห์คำ ต.ช้างม่อย อ.
                เมือง จ.เชียงใหม่เมื่อปี 2565 และหลังจากเปิดโชว์รูมสำนักงานใหญ่
                2565
                <br />
                ลานทองได้ซื้อรถจักรยานยนต์จากตัวแทนจำหน่ายรถจักรยานยนต์ฮอนด้า
                <br />
                อันดับ 1 ของภาคเหนือและอันดับ 1 ของจังหวัดเชียงใหม่
                มาจัดชุดพร้อมพ่วงข้างที่ลูกค้าต้องการในราคาพิเศษและดอกเบี้ยพิเศษ
                โดยให้ลูกค้าสามารถผ่อน
                จักรยานยนต์พร้อมพ่วงข้างได้โดยไม่ต้องมีเงินดาวน์
                <br />
                ซึ่งได้รับเสียงตอบรับจากพ่อค้าและแม่ค้ามากมาย ที่มีเงินทุนไม่มาก
                เก็บเงินทุนไว้ลงทุนกับวัตถุดิบในการขายของ
                สามารถมาติดต่อของเป็นเข้าของร้านค้าเคลื่อนที่ได้โดยไม่ต้องดาวน์
              </p>
              <p>
                <br />
                จากประสบการณ์ผลิตรถกว่า 20 ปี ผลิตรถกว่า 10,000 คัน และมากกว่า
                1,000 แบบ
                เราขอเป็นส่วนหนึ่งที่ทำให้คุณเติบโตอย่างมั่นคงไปพร้อมๆกันกับเรา
                และเราสัญญาว่าเราจะผลิตรถที่ดี จากวัสดุเกรด A
                ด้วยมือช่างที่มากประสบการณ์
              </p>
            </div>
            

          </div>
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
                  className="w-[300px] h-auto md:w-[466px] md:h-[800px] rounded-lg"
                  src="/466x800.png"
                  width={466}
                  height={800}
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
                  className="w-[300px] h-auto md:w-[466px] md:h-[800px] rounded-lg"
                  src="/466x800.png"
                  width={466}
                  height={800}
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
                  className="w-[300px] h-auto md:w-[466px] md:h-[800px] rounded-lg rounded-xl"
                  src="/466x800.png"
                  width={466}
                  height={800}
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
                  className="w-[300px] h-auto md:w-[466px] md:h-[800px] rounded-lg opacity-60"
                  src="/466x800.png"
                  width={466}
                  height={800}
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
    </Layout>
  );
}

export { getServerSideProps } from "@/utils/get-init-props";
