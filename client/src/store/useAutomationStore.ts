import { create } from "zustand";
import axios from "axios"; 
// Attachments type
export interface Attachment {
  name: string;
  size: number;
  type: "image" | "video";
}

// Final data structure
interface FinalData {
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

  // final data (should auto update)
  finalData: FinalData;
  sendDataToBackend: () => Promise<void>;
}

export const useAutomationStore = create<AutomationStore>((set, get) => {
  const updateFinalData = () => {
    const {
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
      leads: selectedLeads,
      email: {
        offerType,
        subject,
        message,
        language,
        attachments,
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

  const sendDataToBackend = async () => {
    try {
      const finalData = get().finalData; // Get the final data from store

      const response = await axios.post("http://localhost:6060/api/automation/automationData", finalData);
      
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // initial state
  const initialState: Omit<AutomationStore, "finalData" | "sendDataToBackend"> = {
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
  };

  return {
    ...initialState,
    finalData: {
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
