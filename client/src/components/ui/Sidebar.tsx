import React from 'react';
import { Mail, Clock, Users } from 'lucide-react';

const nodeTypes = [
  {
    type: 'sourceNode',
    label: 'Source',
    icon: <Users className="w-6 h-6" />,
  },
  {
    type: 'emailNode',
    label: 'Cold Email',
    icon: <Mail className="w-6 h-6" />,
  },
  {
    type: 'delayNode',
    label: 'Wait/Delay',
    icon: <Clock className="w-6 h-6" />,
  },
];

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 rounded-xl">
      <div className="space-y-4">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center p-4 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
          >
            <div className="p-2 bg-white rounded-lg shadow-sm">
              {node.icon}
            </div>
            <span className="ml-3 font-medium">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;