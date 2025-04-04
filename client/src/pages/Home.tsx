
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';
import NodeEditor from '../components/workflow/NodeEditor';
import FlowCanvas from '../workflow/workflow';
import { ChartNetwork } from 'lucide-react';
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import useStore from '@/store/useStore';
import OnboardingPage from './OnboardingPage';
const Home = () => {
    const { nodes, edges } = useStore();

    const handleSaveSequence = () => {
      const sequence = {
        nodes,
        edges,
      };
      console.log('Saving sequence:', sequence);
      alert('Sequence saved! Check console for details.');
    };
  
    return (
        <div className="flex flex-col h-screen bg-[#EDF2F8] py-4 px-6">
           <OnboardingPage />
            <Navbar onSave={handleSaveSequence} />
            <div className="flex flex-1 py-4 overflow-hidden gap-5">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="p-6 ">
                        <div className="flex items-center">
                            <h1 className="text-3xl font-semibold text-gray-900">Email Sequence Builder</h1>
                            <div className="ml-4 flex items-center gap-2">
                                <span><ChartNetwork /></span>
                                <span className="text-md font-semibold text-gray-500">Nodes</span>
                            </div>
                        </div>
                    </div>
                    <FlowCanvas />
                </div>
                <NodeEditor />
            </div>
        </div>
    )
}

export default Home