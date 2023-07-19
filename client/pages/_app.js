import { DashboardSidebarContextProvider } from "@/contexts/dashboard-sidebar-context";
import { SidebarContextProvider } from "@/contexts/sidebar-context";
import { ToastContainer } from 'react-toastify';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <DashboardSidebarContextProvider>
                <SidebarContextProvider>
                    <Component {...pageProps} />
                    <ToastContainer />
                </SidebarContextProvider>
            </DashboardSidebarContextProvider>
        </>
    );
}
