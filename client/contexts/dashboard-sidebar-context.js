import { createContext, useContext, useEffect, useState } from "react";

const DashboardSidebarContext = createContext();

export const DashboardSidebarContextProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(true);
    const [isOpen, setIsOpen] = useState(isMobile ? false : true);

    const resize = () => {
        let currentHideNav = window.innerWidth <= 1280;
        setIsMobile(currentHideNav);
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        resize();
        setIsOpen(!isMobile);
    }, [isMobile])

    return (
        <DashboardSidebarContext.Provider
            value={{
                isOpen,
                setIsOpen,
                isMobile
            }}
        >
            {children}
        </DashboardSidebarContext.Provider>
    );
};

export const useDashboardSidebar = () => useContext(DashboardSidebarContext);
