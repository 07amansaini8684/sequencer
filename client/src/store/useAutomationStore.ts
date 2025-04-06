import { create } from "zustand";
// import axios from "axios";
import { axiosInstance } from "@/lib/axios";

// Attachments type
export interface Attachment {
  name: string;
  size: number;
  type: "image" | "video";
}

// Final data structure
interface FinalData {
  clerkId: string;
  leads: string[];
  email: {
    offerType: string;
    subject: string;
    message: string;
    language: string;
    attachments: Attachment[];
  };
  delay: {
    finalTime: string;
    delayDate: string;
    delayTime: string;
    formattedTimeWithPeriod: string;
    timePeriod: "AM" | "PM";
  };
}

// Combined Zustand Store
interface AutomationStore {
  // clerk id of the user
  clerkId: string;
  setClerkId: (id: string) => void;

  // lead selection
  selectedLeads: string[];
  setSelectedLeads: (leads: string[]) => void;

  // email fields
  offerType: string;
  subject: string;
  message: string;
  language: string;
  attachments: Attachment[];
  setOfferType: (val: string) => void;
  setSubject: (val: string) => void;
  setMessage: (val: string) => void;
  setLanguage: (val: string) => void;
  addAttachment: (val: Attachment[]) => void;
  removeAttachment: (name: string) => void;

  // delay state
  finalTime: string;
  delayDate: string;
  delayTime: string;
  formattedTimeWithPeriod: string;
  timePeriod: "AM" | "PM";
  setDelay: (date: string, time: string, period: "AM" | "PM") => void;

  // final data (auto-updated)
  finalData: FinalData;
  sendDataToBackend: () => Promise<void>;
}

export const useAutomationStore = create<AutomationStore>((set, get) => {
  const updateFinalData = () => {
    const {
      clerkId,
      selectedLeads,
      offerType,
      subject,
      message,
      language,
      attachments,
      finalTime,
      delayDate,
      delayTime,
      formattedTimeWithPeriod,
      timePeriod,
    } = get();

    const updatedData: FinalData = {
      clerkId,
      leads: selectedLeads,
      email: {
        offerType: offerType || "",
        subject: subject || "",
        message: message || "",
        language: language || "English",
        attachments: attachments || [],
      },
      delay: {
        finalTime,
        delayDate,
        delayTime,
        formattedTimeWithPeriod,
        timePeriod,
      },
    };

    set({ finalData: updatedData });
  };


  // 
  const sendDataToBackend = async () => {
    try {
      updateFinalData(); // make sure the latest data is captured
      const finalData = get().finalData;

      const response = await axiosInstance.post('/automation/automationData', finalData);
      console.log("✅ Data sent successfully:", response.data);
    } catch (error) {
      console.error("❌ Error sending data:", error);
    }
  };

  return {
    // Initial state
    clerkId: "",
    setClerkId: (id) => {
      set({ clerkId: id });
      updateFinalData();
    },

    selectedLeads: [],
    setSelectedLeads: (leads) => {
      set({ selectedLeads: leads });
      updateFinalData();
    },

    offerType: "",
    subject: "",
    message: "",
    language: "English",
    attachments: [],
    setOfferType: (val) => {
      set({ offerType: val });
      updateFinalData();
    },
    setSubject: (val) => {
      set({ subject: val });
      updateFinalData();
    },
    setMessage: (val) => {
      set({ message: val });
      updateFinalData();
    },
    setLanguage: (val) => {
      set({ language: val });
      updateFinalData();
    },
    addAttachment: (files) => {
      const prev = get().attachments;
      set({ attachments: [...prev, ...files] });
      updateFinalData();
    },
    removeAttachment: (name) => {
      const filtered = get().attachments.filter((a) => a.name !== name);
      set({ attachments: filtered });
      updateFinalData();
    },

    finalTime: "",
    delayDate: "",
    delayTime: "",
    formattedTimeWithPeriod: "",
    timePeriod: "AM",
    setDelay: (date, time, period) => {
      set({
        delayDate: date,
        delayTime: time,
        timePeriod: period,
        formattedTimeWithPeriod: `${time} ${period}`,
      });
      updateFinalData();
    },

    finalData: {
      clerkId: "",
      leads: [],
      email: {
        offerType: "",
        subject: "",
        message: "",
        language: "English",
        attachments: [],
      },
      delay: {
        finalTime: "",
        delayDate: "",
        delayTime: "",
        formattedTimeWithPeriod: "",
        timePeriod: "AM",
      },
    },
    sendDataToBackend,
  };
});
