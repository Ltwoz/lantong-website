import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const DashboardSidebarContext = createContext();

export const DashboardSidebarContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DashboardSidebarContext.Provider
            value={{
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </DashboardSidebarContext.Provider>
    );
};

export const useDashboardSidebar = () => useContext(DashboardSidebarContext);
