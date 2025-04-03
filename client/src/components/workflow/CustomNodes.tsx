/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from '@xyflow/react';
import { Mail, Clock, Users } from 'lucide-react';
import useStore from '../../store/useStore';

export const EmailNode = ({ data, id }: { data: any; id: string }) => {
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const selectedNode = useStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === id;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 border ${
        isSelected ? 'border-blue-500' : 'border-gray-200'
      } w-64 cursor-pointer`}
      onClick={() => setSelectedNode({ id, data, type: 'emailNode' } as any)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center mb-2">
        <Mail className="w-5 h-5 text-blue-500" />
        <span className="ml-2 font-medium">Cold Email</span>
      </div>
      <div className="text-sm">
        <p className="font-medium">Subject: {data.subject || 'Untitled'}</p>
        <p className="text-gray-600 truncate">{data.body || 'No content'}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const DelayNode = ({ data, id }: { data: any; id: string }) => {
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const selectedNode = useStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === id;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 border ${
        isSelected ? 'border-blue-500' : 'border-gray-200'
      } w-48 cursor-pointer`}
      onClick={() => setSelectedNode({ id, data, type: 'delayNode' } as any)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center mb-2">
        <Clock className="w-5 h-5 text-orange-500" />
        <span className="ml-2 font-medium">Wait</span>
      </div>
      <p className="text-sm">{data.delay || '1'} day(s)</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const SourceNode = ({ data, id }: { data: any; id: string }) => {
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const selectedNode = useStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === id;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 border ${
        isSelected ? 'border-blue-500' : 'border-gray-200'
      } w-56 cursor-pointer`}
      onClick={() => setSelectedNode({ id, data, type: 'sourceNode' } as any)}
    >
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center mb-2">
        <Users className="w-5 h-5 text-green-500" />
        <span className="ml-2 font-medium">Lead Source</span>
      </div>
      <p className="text-sm">{data.source || 'All Leads'}</p>
    </div>
  );
};