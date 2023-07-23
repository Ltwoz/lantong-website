import Layout from "@/components/layouts/Layout";
import Head from "next/head";

const DashboardPage = () => {
    return (
        <Layout isDashboard={true}>
            <Head>
                <title>จัดการหลังบ้าน - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">ภาพรวมของเว็บไซต์</h2>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
