/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import useStore from '../../store/useStore';
import SourceSidebar from '../ui/SourceSidebar';
import EmailWorkflowSidebar from '../ui/ColdEmailConfig';
import WaitDelayComponent from '../ui/WaitDelayComponent';
 

// Define TypeScript interfaces
interface NodeData {
  [key: string]: any;
  subject?: string;
  body?: string;
  sender?: string;
  finalTime?: string;
  delayDate?: string;
  delayTime?: string;
  source?: string;
  listName?: string;
  leadCount?: number | string;
}

interface Node {
  id: string;
  type: string;
  data?: NodeData;
}

const NodeEditor: React.FC = () => {
  const selectedNode = useStore((state) => state.selectedNode) as Node | null;
  // const updateNode = useStore((state) => state.updateNode) as (id: string, data: NodeData) => void;

  // // Local state to ensure input values are properly displayed
  // const [localData, setLocalData] = useState<NodeData>({});
  // const selectedLeads = useAutomationStore((state) => state.selectedLeads);
  // useEffect(() => {
  //   if (selectedNode && selectedNode.data) {
  //     setLocalData(selectedNode.data);
  
  //     if (selectedNode.type === 'sourceNode') {
  //       requestAnimationFrame(() => {
  //         updateNode(selectedNode.id, {
  //           ...selectedNode.data,
  //           leads: selectedLeads,
  //         });
  //       });
  //     }
  //   }
  // }, [selectedNode, selectedLeads]);
  
  


  // Update local state when selected node changes
  // useEffect(() => {
  //   if (selectedNode && selectedNode.data) {
  //     setLocalData(selectedNode.data);
  //   } else {
  //     setLocalData({});
  //   }
  // }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Edit Panel</h2>
        </div>
        <p className="text-gray-500 text-center">Select a node to edit its properties</p>
      </div>
    );
  }



  // Create a preview of the node's final message
  // const renderPreview = () => {
  //   switch (selectedNode.type) {
  //     case 'emailNode':
  //       return (
  //         <div className="mt-6 border-t pt-4 space-y-2 overfhlo">
  //           <h4 className="text-sm font-semibold text-gray-700">Message Preview</h4>
  //           <div className="bg-gray-50 p-3 rounded-md text-sm">
  //             <div className="font-medium">From: {localData.sender || 'Not set'}</div>
  //             <div className="font-medium">Subject: {localData.subject || 'Not set'}</div>
  //             <div className="mt-2 border-t pt-2 text-gray-600 whitespace-pre-line">
  //               {localData.body || 'No content'}
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     case 'delayNode':
  //       return (
  //         <div className="mt-6 border-t pt-4 space-y-2">
  //           <h4 className="text-sm font-semibold text-gray-700">Delay Details</h4>
  //           <div className="bg-gray-50 p-3 rounded-md text-sm">
  //             <div><span className="font-medium">Final Time:</span> {localData.finalTime || 'Not set'}</div>
  //             <div><span className="font-medium">Wait Until:</span> {localData.delayDate || 'Date not set'} at {localData.delayTime || 'Time not set'}</div>
  //           </div>
  //         </div>
  //       );
  //     case 'sourceNode':
  //       return (
  //         <div className="mt-6 border-t pt-4 space-y-2">
  //           <h4 className="text-sm font-semibold text-gray-700">Source Details</h4>
  //           <div className="bg-gray-50 p-3 rounded-md text-sm">
  //             <div><span className="font-medium">Source:</span> {localData.source || 'All Leads'}</div>
  //             <div><span className="font-medium">List:</span> {localData.listName || 'Not specified'}</div>
  //             <div><span className="font-medium">Lead Count:</span> {localData.leadCount || '0'}</div>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const renderEditor = () => {
    switch (selectedNode.type) {
      case 'emailNode':
        return (
          <EmailWorkflowSidebar />
        );

      case 'delayNode':
        return (
         <WaitDelayComponent/>
        );

      case 'sourceNode':
        return (
          <div>
            <SourceSidebar />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-96 bg-white rounded-lg overflow-hidden">
      {renderEditor()}
    </div>
  );
};

export default NodeEditor;