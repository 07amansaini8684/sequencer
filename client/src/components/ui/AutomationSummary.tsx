/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useAutomationStore, Attachment } from '@/store/useAutomationStore';
import {
  Mail,
  Calendar,
  Clock,
  Users,
  Paperclip,
  Globe,
  Tag,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface AutomationSummaryProps {
  onExecute?: () => void; // Optional callback for closing dialog
}

const AutomationSummary: React.FC<AutomationSummaryProps> = ({ onExecute }) => {
  const {
    finalData,
    sendDataToBackend
  } = useAutomationStore();
  const [isOpen, setIsOpen] = React.useState(true);
  const [isExecuting, setIsExecuting] = React.useState(false);

  // Format the date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not scheduled';

    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error: any) {
      return dateStr;
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    // console.log("Executing automation with data:", finalData);

    try {
      await sendDataToBackend();

      // Show success toast
      toast.success("Automation executed successfully!", {
        description: `Email sequence sent to ${finalData.leads.length} leads.`,
        descriptionClassName: "text-zinc-800",
      });

      // Call optional onExecute callback (for closing dialog)
      if (onExecute) {
        setTimeout(() => {
          onExecute();
        }, 1500); // Small delay to show success state
      }
    } catch (error) {
      toast.error("Failed to execute automation", {
        description: "Please try again or contact support.",
        descriptionClassName: "text-zinc-800",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Calculate stats
  const totalLeads = finalData.leads.length;
  const hasAttachments = finalData.email.attachments.length > 0;
  const isScheduled = !!finalData.delay.delayDate;

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-900/20">
      {/* Header */}
      <div
        className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Automation Summary</h3>
            <p className="text-sm text-gray-500">Email sequence for {totalLeads} leads</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isScheduled && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Scheduled
            </span>
          )}
          {isOpen ?
            <ChevronUp className="h-5 w-5 text-gray-500" /> :
            <ChevronDown className="h-5 w-5 text-gray-500" />
          }
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Leads</p>
              </div>
              <p className="text-2xl font-semibold text-gray-800">{totalLeads}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Language</p>
              </div>
              <p className="text-2xl font-semibold text-gray-800">{finalData.email.language}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Scheduled For</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {isScheduled ? (
                  <>
                    {formatDate(finalData.delay.delayDate)}
                    <span className="block text-sm text-gray-600">
                      {finalData.delay.formattedTimeWithPeriod}
                    </span>
                  </>
                ) : (
                  "Send Immediately"
                )}
              </p>
            </div>
          </div>

          {/* Email details */}
          <div className="mb-6 bg-white border border-gray-100 rounded-lg">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium text-gray-800">Offer Type</p>
              </div>
              <p className="text-base text-gray-700 ml-6">
                {finalData.email.offerType || "No offer type specified"}
              </p>
            </div>

            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium text-gray-800">Subject Line</p>
              </div>
              <p className="text-base text-gray-700 ml-6">
                {finalData.email.subject || "No subject specified"}
              </p>
            </div>

            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-blue-500">📝</div>
                <p className="text-sm font-medium text-gray-800">Message</p>
              </div>
              <div className="ml-6 p-3 bg-gray-50 rounded-md text-gray-700 text-sm max-h-32 overflow-y-auto">
                {finalData.email.message ? (
                  <p className="whitespace-pre-wrap">{finalData.email.message}</p>
                ) : (
                  <p className="text-gray-500 italic">No message content</p>
                )}
              </div>
            </div>

            {hasAttachments && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Paperclip className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium text-gray-800">Attachments</p>
                </div>
                <div className="ml-6">
                  {finalData.email.attachments.map((attachment: Attachment, index: number) => (
                    <div key={index} className="flex items-center gap-2 mb-2 text-sm">
                      <div className="bg-blue-100 p-1 rounded">
                        {attachment.type === 'image' ? '🖼️' : '📹'}
                      </div>
                      <span className="text-gray-700">{attachment.name}</span>
                      <span className="text-gray-500 text-xs">
                        ({(attachment.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Execute button */}
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className={`w-full py-3 font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${isExecuting ?
                'bg-green-600 text-white' :
                'bg-gray-900 hover:bg-gray-950 text-white'
              }`}
          >
            {isExecuting ? (
              <>
                <CheckCircle className="h-5 w-5 animate-pulse" />
                Automation in Progress...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Execute Automation
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AutomationSummary;