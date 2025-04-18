/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axios";
import {create }from "zustand"


interface AuthStore {
    isAdmin: boolean;
    error: string | null;
    isLoading: boolean;

    checkAdminStatus: () => Promise<void>;
    reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    error: null,
    isLoading: false,

    checkAdminStatus: async () =>{
        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/admin/check");
            set({isAdmin: response.data, isLoading: false, error: null})
        } catch (error: any) {
            set({error: error.response.data.message,isAdmin: false, isLoading: false})
        }finally{
            set({isLoading: false})
        }
    },
    reset: () => set({isAdmin: false, error: null, isLoading: false})
}))