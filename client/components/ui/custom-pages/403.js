import Layout from "@/components/layouts/Layout";
import Head from "next/head";

const NoPermission = () => {
    return (
        <Layout>
            <Head>
                <title>ไม่มีสิทธิเข้าถึง - หจก.ลานทองเชียงใหม่</title>
            </Head>
            <div className="flex items-center justify-center w-full h-screen">
                <h1 className="text-3xl">ไม่มีสิทธิเข้าถึง</h1>
            </div>
        </Layout>
    );
};

export default NoPermission;
