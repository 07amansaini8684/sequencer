/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Search, List, Filter, Mail, Database } from 'lucide-react';
import { useAutomationStore } from '@/store/useAutomationStore';

/**
 * ----------------------------------------------
 * ⚠️ TEMPORARY STATIC MOCK LIST SETUP (IMPORTANT)
 * ----------------------------------------------
 * 
 * At the moment, we are using this `mockLists` array as a placeholder 
 * for the available lead list names a user can select during automation setup.
 * 
 * These list names are **static** and not fetched from the actual database 
 * or any dynamic user-created data because:
 * 
 * 🔧 The real integration with the lead management system (where list names
 * and associated lead details including emails would exist) is not yet set up.
 * 
 * Therefore, as a workaround:
 * - We are using these mock list names manually.
 * - And since we don't have real leads and their emails attached to these lists,
 *   we will inject **our own (developer/test) email address** in place of the 
 *   actual lead emails for testing and development purposes.
 * 
 * ✅ This allows us to continue building and testing the email automation system
 * (e.g., scheduling, email content formatting, attachments handling, etc.)
 * even though we are not connected to the actual data source yet.
 * 
 * ⚠️ Later when real lead data is available:
 * - This section will be replaced with dynamic list fetching (from DB).
 * - Each list name will be mapped to real leads with email addresses.
 * 
 * Example (future):
 *   - 'SalesBlink LTD Dec 2024' → fetch associated lead documents
 *   - extract their email fields → pass into the mailer function
 * 
 * For now, please treat this list and the emails injected as **placeholder only**.
 * 
 * 
 * For development/testing:
 * - We’re using mock list names like 'Mywork' and 'Mypersonal'.
 * - Instead of actual leads, we’ll manually assign test email addresses.
 * 
 * ✅ Only 'Mywork' and 'Mypersonal' are functional for now,
 *    because we’ll be adding mock email data only for these two lists.
 * 
 * 🚀 Once the real data is connected:
 * - Each list will dynamically pull associated lead emails from the database.
 */

const mockLists = [
  'Mywork',
  'Mypersonal',
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
  const [customEmail, setCustomEmail] = useState('');
  const { setSelectedLeads } = useAutomationStore();

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
      setSelectedLeads(updatedLists);
      return updatedLists;
    });
  };

  const handleAddCustomEmail = () => {
    if (validateEmail(customEmail)) {
      setSelectedLists(prev => {
        const updated = [...prev, customEmail];
        setSelectedLeads(updated);
        return updated;
      });
      setCustomEmail('');
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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
                
                {/* Custom email input */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 p-2 bg-yellow-50 rounded-md border border-yellow-100">
                    💡 Only 'Mywork' and 'Mypersonal' lists are functional in mock mode. 
                    Add test emails directly below:
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                    />
                    <button
                      onClick={handleAddCustomEmail}
                      className="px-3 py-2 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 disabled:opacity-50"
                      disabled={!validateEmail(customEmail)}
                    >
                      Add
                    </button>
                  </div>
                </div>

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