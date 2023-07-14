import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, isDashboard }) => {
    return (
        <>
            <Head>
                <title>หจก.ลานทองเชียงใหม่</title>
                <meta name="description" content="" />
                <meta
                    name="keywords"
                    content="พ่วงข้าง, ลานทอง, ขายรถเชียงใหม่"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Lantong Shop" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="" />
            </Head>
            <div
                id="page-wrapper"
                className={`min-h-screen flex flex-col text-gray-900`}
            >
                <>
                    <Navbar />
                    <div className="flex-grow">
                        <Sidebar />
                        {children}
                    </div>
                </>
            </div>
        </>
    );
};

export default Layout;
