import Layout from "@/components/layouts/Layout";

export default function About() {
  return (
    <Layout>
      <div className="w-96 h-96 bg-neutral-700 flex flex-col justify-center items-center">
        <img
          className="w-96 h-96"
          src="https://via.placeholder.com/1920x624"
          alt="Banner"
        />
        <div className="w-96 h-48 bg-neutral-500 opacity-60 rounded-3xl mt-4">
          <div className="text-center text-white text-5xl font-bold leading-10">
            เลือกพ่วงข้างทำไมต้อง
          </div>
          <div className="text-center text-rose-500 text-8xl font-bold leading-10">
            พ่วงข้างลานทอง
          </div>
        </div>
        <div className="w-52 h-16 bg-slate-100 rounded-3xl mt-4">
          <div className="text-center text-slate-500 text-4xl font-bold leading-10 pt-3">
            Button
          </div>
        </div>
      </div>

      <div className="mt-8 w-96 h-96 bg-orange-200 flex flex-col justify-center items-center">
        <div className="w-96 h-96 bg-orange-200" />
        <div className="w-96 h-96 px-11 pt-5 pb-96 flex flex-col justify-center items-center">
          <div className="text-center text-black text-4xl font-bold">
            (ข้อมูลประวัติความเป็นมาของลานทอง)
          </div>
        </div>
      </div>

      <div className="mt-8 w-96 h-96 bg-neutral-700 flex flex-col justify-center items-center">
        <div className="w-96 h-32 bg-zinc-800" />
        <div className="text-center text-white text-4xl font-bold mt-4">
          สินค้าและบริการ
        </div>
        <div className="w-96 h-96 flex justify-center items-center mt-4 space-x-4">
          <img className="w-96 h-96" src="https://via.placeholder.com/506x906" alt="Product 1" />
          <img className="w-96 h-96" src="https://via.placeholder.com/485x906" alt="Product 2" />
          <img className="w-96 h-96" src="https://via.placeholder.com/463x906" alt="Product 3" />
          <img
            className="w-96 h-96 opacity-60"
            src="https://via.placeholder.com/466x906"
            alt="Product 4"
          />
        </div>
        <div className="text-white text-4xl font-bold mt-4 space-x-8">
          <div>มอเตอร์ไซด์มีพ่วงข้าง</div>
          <div>พ่วงข้างขายของ</div>
          <div>พ่วงข้างวินเทจ</div>
          <div>หมวดหมู่อื่นๆ</div>
        </div>
      </div>

      <div className="mt-8 w-96 h-36 bg-slate-100 flex flex-col justify-center items-center">
        <div className="w-96 h-20 bg-zinc-800 bg-opacity-80 rounded-3xl" />
        <div className="text-white text-4xl font-bold leading-10 mt-2">
          ช่องทางการติดต่อต่างๆ
        </div>
      </div>
    </Layout>
  );
}
