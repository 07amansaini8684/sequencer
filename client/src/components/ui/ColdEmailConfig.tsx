import React, { useState, useRef } from 'react';
import { Mail, CheckCircle, Hourglass, Filter, GitBranch, Paperclip } from 'lucide-react';

const EmailWorkflowSidebar = () => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessOffer: '',
    language: 'English',
    subjectLine: '',
    message: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const blocks = [
    {
      id: 'coldEmail',
      section: 'Outreach',
      title: 'Cold Email',
      description: 'Send an email to a lead.',
      icon: Mail,
      color: '#d4c4f1',
      iconColor: '#8338ec'
    },
    {
      id: 'task',
      section: 'Outreach',
      title: 'Task',
      description: 'Schedule a manual task.',
      icon: CheckCircle,
      color: '#d4c4f1',
      iconColor: '#8338ec'
    },
    {
      id: 'wait',
      section: 'Conditions',
      title: 'Wait',
      description: 'Add a delay between blocks.',
      icon: Hourglass,
      color: '#c4e3f1',
      iconColor: '#3a86ff'
    },
    {
      id: 'ifElse',
      section: 'Conditions',
      title: 'If/Else (Rules)',
      description: 'Route leads through the sequence based on events.',
      icon: Filter,
      color: '#c4e3f1',
      iconColor: '#3a86ff'
    },
    {
      id: 'split',
      section: 'Conditions',
      title: 'Split 50/50',
      description: 'Equally split contacts into two separate flows.',
      icon: GitBranch,
      color: '#c4e3f1',
      iconColor: '#3a86ff'
    }
  ];

  const handleBlockClick = (blockId: string) => {
    if (activeBlock === blockId) {
      setActiveBlock(null);
    } else {
      setActiveBlock(blockId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    console.log('Attached Files:', files);
    // Here you could add additional logic to process the form and files
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      console.log('Files selected:', newFiles);
    }
  };

  const renderBlocks = () => {
    const sections: Record<string, typeof blocks> = {};
    
    blocks.forEach(block => {
      if (!sections[block.section]) {
        sections[block.section] = [];
      }
      sections[block.section].push(block);
    });
    
    return Object.entries(sections).map(([sectionName, sectionBlocks]) => (
      <div key={sectionName} className="mb-6">
        <h2 className="text-lg font-medium mb-3">{sectionName}</h2>
        <div className="space-y-3">
          {sectionBlocks.map(block => (
            <div key={block.id}>
              <div 
                className="p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 flex gap-3 items-start"
                onClick={() => handleBlockClick(block.id)}
              >
                <div 
                  className="p-2 rounded transition-all duration-200" 
                  style={{ backgroundColor: block.color }}
                >
                  <block.icon size={24} color={block.iconColor} />
                </div>
                <div>
                  <h3 className="font-medium">{block.title}</h3>
                  <p className="text-sm font-medium text-zinc-600">{block.description}</p>
                </div>
              </div>
              
              {block.id === 'coldEmail' && (
                <div 
                  className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeBlock === block.id ? 'h-auto' : 'h-0'
                  }`}
                  style={{
                    opacity: activeBlock === block.id ? 1 : 0,
                    transform: `translateY(${activeBlock === block.id ? '0' : '-10px'})`,
                    marginBottom: activeBlock === block.id ? '12px' : '0'
                  }}
                >
                  <div className="border border-zinc-300 rounded p-4 bg-white">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Business offer, what are you seeing  Language</p>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          name="businessOffer"
                          value={formData.businessOffer}
                          onChange={handleInputChange}
                          placeholder="Enter Subject Line" 
                          className="flex-1 border border-zinc-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border border-zinc-300-blue-400 outline-none transition-all duration-200"
                        />
                        <select 
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          className="border border-zinc-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border border-zinc-300-blue-400 outline-none transition-all duration-200"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Subject Line</p>
                      <input 
                        type="text" 
                        name="subjectLine"
                        value={formData.subjectLine}
                        onChange={handleInputChange}
                        placeholder="Enter Subject Line" 
                        className="w-full border border-zinc-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border border-zinc-300-blue-400 outline-none transition-all duration-200"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Write your msg</p>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your thoughts" 
                        className="w-full border border-zinc-300 rounded p-2 text-sm h-24 focus:ring-2 focus:ring-blue-200 focus:border border-zinc-300-blue-400 outline-none transition-all duration-200"
                      />
                    </div>
                    
                    {files.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Attached Files:</p>
                        <div className="space-y-1">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center text-sm bg-gray-50 p-2 rounded">
                              <Paperclip size={14} className="mr-2 text-gray-500" />
                              <span className="truncate">{file.name}</span>
                              <span className="ml-2 text-xs text-gray-500">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSave}
                        className="bg-gray-900 text-white py-2 px-4 rounded text-sm flex-1 hover:bg-gray-800 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                        className="hidden"
                        multiple
                      />
                      <button 
                        onClick={handleFileClick}
                        className="border border-zinc-300 rounded p-2 hover:bg-gray-100 transition-colors duration-200"
                        title="Attach files"
                      >
                        <Paperclip size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="w-96 bg-white p-4 max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Add Blocks</h1>
          <p className="text-sm text-zinc-600 font-medium">Click on a block to configure and add it in sequence.</p>
        </div>
      </div>
      
      {renderBlocks()}
    </div>
  );
};

export default EmailWorkflowSidebar;