import { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }
}

type OptionType = {
    value: string | number;
    label: string;
};

interface StoreState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

interface Route {
    name: string;
    path: string;
}

interface ComparableSale {
    address: string;
    sale_price: number;
    square_footage: number;
    property_condition: string;
}

interface PropertyDetails {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    square_footage: number;
    property_condition: string;
    comparable_sales: ComparableSale[] | undefined;
}
