import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <Image src="/lantong_logo.png" alt="Login Image" width={800} height={600} />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/4 border p-8 shadow-lg rounded-xl ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">ลานทองยินดีต้อนรับ</h1>
            <p className="mt-2 text-gray-600">
              กรุณาเข้าสู่ระบบ
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 border"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700 "
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 border"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}