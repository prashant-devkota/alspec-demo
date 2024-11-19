import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface DrawerData {
    ContainerClass: string;
    ComponentTitle: string;
    ItemId?: any;
    Item?: any;
}

interface DrawerContextType {
    drawerData: DrawerData | null;
    drawerOpen: boolean;
    openDrawer: (data: DrawerData) => void;
    closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = (): DrawerContextType => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

interface DrawerProviderProps {
    children: ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerData, setDrawerData] = useState<DrawerData | null>(null);

    const openDrawer = (data: DrawerData) => {
        setDrawerData(data);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        // Clean up drawer state on component unmount or refresh
        return () => {
            setDrawerOpen(false);
            setDrawerData(null);
        };
    }, []);
    
    return (
        <DrawerContext.Provider value={{ drawerData, drawerOpen, openDrawer, closeDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};
