import { DashboardSidebarContextProvider } from "@/contexts/dashboard-sidebar-context";
import { SidebarContextProvider } from "@/contexts/sidebar-context";
import { UserContextProvider } from "@/contexts/user-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <UserContextProvider>
                <DashboardSidebarContextProvider>
                    <SidebarContextProvider>
                        <Component {...pageProps} />
                    </SidebarContextProvider>
                </DashboardSidebarContextProvider>
            </UserContextProvider>
        </>
    );
}
