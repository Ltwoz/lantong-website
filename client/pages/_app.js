import { DashboardSidebarContextProvider } from "@/contexts/dashboard-sidebar-context";
import { SidebarContextProvider } from "@/contexts/sidebar-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <DashboardSidebarContextProvider>
                <SidebarContextProvider>
                    <Component {...pageProps} />
                </SidebarContextProvider>
            </DashboardSidebarContextProvider>
        </>
    );
}
