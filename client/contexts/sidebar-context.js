import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
