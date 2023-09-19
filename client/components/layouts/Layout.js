import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { motion } from "framer-motion";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar-context";
import DashboardNavbar from "./DashboardNavbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { useConfig } from "@/contexts/config-context";
import { getAccessibleColor, getRGBColor } from "@/utils/color";
import MessengerCustomerChat from "react-messenger-customer-chat";

const Layout = ({ children, isDashboard }) => {
    const { isOpen, isMobile } = useDashboardSidebar();
    const { config } = useConfig();

    const primaryColor = getRGBColor(config.style?.primary_color, "primary");
    const allyColor = getRGBColor(
        getAccessibleColor(config.style?.primary_color),
        "ally"
    );

    return (
        <>
            <Head>
                <title>{config.website_title}</title>
                <meta name="description" content={config.website_desc} />
                <meta
                    name="keywords"
                    content="พ่วงข้าง, ลานทอง, ขายรถเชียงใหม่"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={config.website_title} />
                <meta property="og:description" content={config.website_desc} />
                <meta
                    property="og:image"
                    content={
                        config.about_bg?.length
                            ? config.about_bg[0].url
                            : "https://scontent.fbkk3-5.fna.fbcdn.net/v/t39.30808-6/267397068_7121185127895374_5976241779719606896_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=52f669&_nc_eui2=AeFwKDUAhYt4ClTfTl1FrrLKQw3kcRXQlkBDDeRxFdCWQG6AK2Jshkd8jf-93ik1C9ouWsxqn94LMr2VkZbK1DiF&_nc_ohc=f5IhJAHNhSsAX8cwgXB&_nc_zt=23&_nc_ht=scontent.fbkk3-5.fna&oh=00_AfCWIGMIPNH7nSvTKsM0qQLFTE9tpg63E6SdMGYIpwTS4w&oe=650E611B"
                    }
                />
                <link rel="icon" href="/favicon.ico" />
                <style>:root {`{${primaryColor} ${allyColor}}`}</style>
            </Head>
            <ToastContainer toastClassName="!font-noto" />
            {typeof window !== "undefiend" && !isDashboard && (
                <MessengerCustomerChat
                    pageId={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
                    appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                />
            )}
            <div
                id="page-wrapper"
                className={`min-h-screen flex flex-col text-gray-900`}
            >
                {isDashboard ? (
                    // Layout หน้า Dashboard
                    <>
                        <DashboardNavbar />
                        <div className="flex-grow">
                            <DashboardSidebar />
                            <motion.div
                                id="page-body"
                                className={`px-6 mt-20`}
                                animate={isOpen ? "mount" : "unmount"}
                                initial={isMobile ? "unmount" : "mount"}
                                exit="unmount"
                                variants={{
                                    unmount: {
                                        marginLeft: 0,
                                        transition: { duration: 0.5 },
                                    },
                                    mount: {
                                        marginLeft: isMobile ? 0 : "280px",
                                        transition: { duration: 0.5 },
                                    },
                                }}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </>
                ) : (
                    // Layout ทั่วไป
                    <>
                        <Navbar />
                        <div className="flex-grow">
                            <Sidebar />
                            {children}
                        </div>
                        <Footer />
                    </>
                )}
            </div>
        </>
    );
};

export default Layout;
