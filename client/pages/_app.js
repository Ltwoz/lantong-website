import { ConfigContextProvider } from "@/contexts/config-context";
import { DashboardSidebarContextProvider } from "@/contexts/dashboard-sidebar-context";
import { SidebarContextProvider } from "@/contexts/sidebar-context";
import { UserContextProvider } from "@/contexts/user-context";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "@/utils/gtag";
import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    const { config } = pageProps;
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${gtag.GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
            </Head>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <ConfigContextProvider value={config}>
                <UserContextProvider>
                    <DashboardSidebarContextProvider>
                        <SidebarContextProvider>
                            <Component {...pageProps} />
                        </SidebarContextProvider>
                    </DashboardSidebarContextProvider>
                </UserContextProvider>
            </ConfigContextProvider>
        </>
    );
}
