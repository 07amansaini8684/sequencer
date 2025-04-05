/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AutomationSummary from "@/components/ui/AutomationSummary";

const Navbar = () => {
  const navLinks = [
    { name: "Dashboard", path: "#" },
    { name: "Sequences", path: "#" },
    { name: "Templates", path: "#" },
    { name: "Settings", path: "#" }
  ];
  
  const [open, setOpen] = React.useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div className='w-full'>
      <nav className="flex items-center justify-between px-6 py-3 bg-[#EDF2F8] border-b-[1px] border-[#DFE9F6]">
        {/* Logo */}
        <div className="flex items-center">
          <div className="mr-1 relative h-8 w-8 rotate-20">
            <img src="https://i.pinimg.com/736x/19/9f/3a/199f3aec53adb71a342504be9957562f.jpg" alt="" className="w-full h-full rounded-full" />
          </div>
          <span className="font-bold text-gray-800 text-xl">MERN</span>
        </div>

        {/* Navigation */}
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

        {/* Save Button + User Avatar */}
        <div className="flex items-center space-x-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="relative px-6 group py-2 text-sm font-semibold border-[1px] border-zinc-700 rounded-full overflow-hidden transition-all duration-300 cursor-pointer">
                <span className="relative z-10">Save</span>
              </button>
            </DialogTrigger>

            <DialogContent className="w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center">Automation Summary</DialogTitle>
                <DialogDescription className="text-center text-sm">
                  Review your selections before executing.
                </DialogDescription>
              </DialogHeader>

              <AutomationSummary onExecute={handleDialogClose} />
            </DialogContent>
          </Dialog>

          <UserButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;