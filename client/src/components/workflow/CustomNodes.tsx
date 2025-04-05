/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from '@xyflow/react';
import { Mail, Clock, Users } from 'lucide-react';
import useStore from '../../store/useStore';
import { useAutomationStore } from '@/store/useAutomationStore';

export const EmailNode = ({ data, id }: { data: any; id: string }) => {
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const selectedNode = useStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === id;
  // here instead of use the data i will use the store cuz it is global now!! keeping it simple and staright forword
  const { subject, message, language } = useAutomationStore()


  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 border ${isSelected ? 'border-blue-500' : 'border-gray-200'
        } w-64 cursor-pointer`}
      onClick={() => setSelectedNode({ id, data, type: 'emailNode' } as any)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center mb-2">
        <div className='bg-blue-100 rounded-lg p-2'>
          <Mail className="w-5 h-5 text-blue-500" />
        </div>
        <span className="ml-2 font-medium">Cold Email</span>
        {/* <span className="ml-2 text-xs text-gray-500">{language.slice(0, 2).toUpperCase()}</span> // doing something */}
        <span className="ml-2 text-xs text-gray-500">{language}</span>
      </div>
      <div className="text-sm">
        <p className="font-medium">Subject: {subject || 'Untitled'}</p>
        <p className="text-gray-600 truncate">{message || 'No content'}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const DelayNode = ({ data, id }: { data: any; id: string }) => {
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const selectedNode = useStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === id;

  // here instead of use the data i will use the store cuz it is global now!! keeping it simple and staright forword
  const { formattedTimeWithPeriod, delayDate } = useAutomationStore()
  // console.log('Delay time', delayTime);
  // console.log('Formatted Time:', formattedTimeWithPeriod);
  // console.log('Delay Date:', delayDate);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 border ${isSelected ? 'border-blue-500' : 'border-gray-200'
        } w-48 cursor-pointer`}
      onClick={() =>
        setSelectedNode({ id, type: 'delayNode' } as any)
      }
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center mb-2">
        <div className="bg-orange-100 rounded-lg p-2">
          <Clock className="w-5 h-5 text-orange-500" />
        </div>
        <span className="ml-2 font-medium">Wait</span>
      </div>
      <div className="text-sm text-gray-700">
        <p><strong>Date:</strong> {delayDate || 'N/A'}</p>
        <p><strong>Time:</strong> {formattedTimeWithPeriod || 'N/A'}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const SourceNode = ({ data, id }: { data: any; id: string }) => {
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const selectedNode = useStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === id;

  // console.log('Source Node Data:', data);
  // here instead of use the data i will use the store cuz it is global now!! keeping it simple and staright forword

  const { selectedLeads } = useAutomationStore()
  // console.log('Selected Leads:', selectedLeads);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 border ${isSelected ? 'border-blue-500' : 'border-gray-200'
        } w-56 cursor-pointer`}
      onClick={() => setSelectedNode({ id, data, type: 'sourceNode' } as any)}
    >
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center mb-2 ">
        <div className='bg-green-100 rounded-lg p-2'>
          <Users className="w-5 h-5 text-green-500" />
        </div>
        <span className="ml-2 font-medium">Lead Source from</span>
      </div>
      <div className="text-xs">{selectedLeads.map((lead: string) => (
        <h4 key={lead}>{lead}</h4>
      ))}</div>
    </div>
  );
};