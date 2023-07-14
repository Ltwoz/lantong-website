import { SidebarContextProvider } from "@/contexts/sidebar-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <SidebarContextProvider>
                <Component {...pageProps} />
            </SidebarContextProvider>
        </>
    );
}
