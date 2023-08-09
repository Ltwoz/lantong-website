import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import Link from "next/link";
import { GoLock } from 'react-icons/go'

const NoPermission = () => {
    return (
        <Layout>
            <Head>
                <title>ไม่มีสิทธิเข้าถึง - หจก.ลานทองเชียงใหม่</title>
            </Head>
            <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
                <GoLock className="w-[100px] h-[100px]" />
                <h1 className="text-3xl">Access Denied</h1>
                <p className="text-2xl">ขออภัยคุณไม่มีสิทธิ์เข้าถึงเนื้อหาหน้านี้</p>
                <Link href={"/"} className="bg-sky-500 p-3 rounded text-white hover:opacity-80">กลับหน้าหลัก</Link>
            </div>
        </Layout>
    );
};

export default NoPermission;
