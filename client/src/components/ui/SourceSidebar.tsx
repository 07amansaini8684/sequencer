/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Search, List, Filter, Mail, Database } from 'lucide-react';
import { useAutomationStore } from '@/store/useAutomationStore';

const mockLists = [
  'SalesBlink LTD Dec 2024',
  'SalesBlink LTD',
  '[GWA] Email Verification',
  'Demo List',
  '[Shopify] Trust Badges',
  '[Shopify] Announcement Bar',
  'SalesBlink All'
];

const sourceBlocks = [
  {
    id: 'lists',
    title: 'Leads from List(s)',
    description: 'Connect multiple lists as source for this sequence.',
    icon: <List className="h-5 w-5 text-blue-500" />,
    hasExpandableContent: true
  },
  {
    id: 'segment',
    title: 'Segment of List',
    description: 'Create a segment of leads which match SalesBlink Variables.',
    icon: <Filter className="h-5 w-5 text-purple-500" />,
    hasExpandableContent: false
  },
  {
    id: 'events',
    title: 'Segment by Events',
    description: 'Create a segment of leads who have engaged with emails previously.',
    icon: <Mail className="h-5 w-5 text-green-500" />,
    hasExpandableContent: false
  },
  {
    id: 'crm1',
    title: 'Lead from CRM Integration',
    description: 'Pulls leads from your CRM integrations.',
    icon: <Database className="h-5 w-5 text-orange-500" />,
    hasExpandableContent: false
  },
];

export default function SourceSidebar() {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  const { setSelectedLeads, selectedLeads } = useAutomationStore()
  // just checking if the selectedLeads is being updated
  // setSelectedLeads(selectedLists);
  // useEffect(() => {
  //   console.log('Selected Leads:', selectedLeads);

  // },[])
  const filteredLists = mockLists.filter(list =>
    list.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // one of most effecient way would be to directly update the store
  // we can use useEffect to update the store when selectedLists changes
  const handleCheckboxChange = (list: string) => {
    setSelectedLists(prev => {
      const updatedLists = prev.includes(list)
        ? prev.filter(l => l !== list)
        : [...prev, list];

      setSelectedLeads(updatedLists); // Update store immediately
      return updatedLists;
    });
  };


  const toggleBlock = (blockId: string) => {
    setExpandedBlock(prev => (prev === blockId ? null : blockId));
  };

  return (
    <div className="w-96 h-screen border-r border-gray-200 bg-white p-4 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Add a Source Block</h3>
        <p className="text-sm text-zinc-600 font-medium">
          Pick a block & configure, any new leads that match rules will be added to sequence automatically
        </p>
      </div>

      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3">
        {sourceBlocks.map((block) => (
          <div key={block.id}>
            <div
              className="p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 flex gap-3 items-start"
              onClick={() => block.hasExpandableContent && toggleBlock(block.id)}
            >
              <div className={`flex items-center justify-center p-3 rounded-lg ${block.hasExpandableContent ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {block.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{block.title}</h4>
                <p className="text-sm text-gray-500">{block.description}</p>
              </div>
            </div>

            {block.hasExpandableContent && expandedBlock === block.id && (
              <div className="flex flex-col gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 mt-1">
                <p className="text-sm text-gray-700">Select your List(s)</p>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for lists"
                    className="w-full pl-8 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredLists.map((list) => (
                    <div
                      key={list}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => handleCheckboxChange(list)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLists.includes(list)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onChange={() => { }}
                      />
                      <span className="text-sm text-gray-700">{list}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
