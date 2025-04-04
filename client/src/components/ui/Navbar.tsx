import { useAutomationStore } from '@/store/useAutomationStore';
import { UserButton } from '@clerk/clerk-react';
import React from 'react';

const Navbar = () => {
    const navLinks = [
        { name: "Dashboard", path: "#" },
        { name: "Sequences", path: "#" },
        { name: "Templates", path: "#" },
        { name: "Settings", path: "#" }
    ];

    const {finalData, sendDataToBackend} = useAutomationStore();
    const handleSaveAndExecute =() =>{
        console.log("the Execute button was clicked")
        console.log("Final Data:", finalData);
        sendDataToBackend();
    }

    return (
        <div className='w-full'>
            <nav className="flex items-center justify-between px-6 py-3 bg-[#EDF2F8] border-b-[1px] border-[#DFE9F6]">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <div className="mr-1 relative h-8 w-8 rotate-20">
                        <img src="https://i.pinimg.com/736x/19/9f/3a/199f3aec53adb71a342504be9957562f.jpg" alt="" className="w-full h-full rounded-full" />
                    </div>
                    <span className="font-bold text-gray-800 text-xl">MERN</span>
                </div>

                {/* Center - Navigation links */}
                <div className="flex space-x-6">
                    {navLinks.map((link, index) => (
                        <button
                            key={index}
                            className="relative text-gray-600 text-md font-semibold hover:text-gray-800 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Right side - Save button and avatar */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => handleSaveAndExecute()}
                        className="relative px-6 group py-2 text-sm font-semibold border-[1px] border-zinc-700 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                    >
                        <span className="relative z-10">Save</span>

                    </button>
                    <div>
                        {/* <img src="https://i.pinimg.com/736x/59/00/c8/5900c89da6ec955868e55a727c680db2.jpg"
                            alt="User avatar" className="w-full h-full object-cover" /> */}
                        <UserButton />
                    </div>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;