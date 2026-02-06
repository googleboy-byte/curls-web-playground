'use client';

import V86Emulator from '../components/V86Emulator';
import Navbar from '../components/Navbar';
import React from 'react';

export default function EmulatorPage() {
    const sendCommand = (cmd: string) => {
        const emulator = (window as any).emulator_instance;
        if (emulator) {
            // Send each character
            for (let i = 0; i < cmd.length; i++) {
                emulator.serial0_send(cmd[i]);
            }
            // Send newline to execute
            emulator.serial0_send('\n');
        }
    };

    const CommandItem = ({ cmd, desc, shortcut = '' }: { cmd: string, desc: string, shortcut?: string }) => (
        <li
            className="group cursor-pointer hover:bg-[#00ff00]/10 py-0.5 px-1 -ml-1 rounded transition-colors"
            onClick={() => sendCommand(cmd)}
            title={desc}
        >
            <span className="text-[#00ff00] font-bold group-hover:drop-shadow-[0_0_5px_#00ff00] transition-all">
                $ {cmd}
            </span>
            <span className="opacity-50 ml-2">
                - {shortcut || desc.split('.')[0].slice(0, 10)}
            </span>
        </li>
    );

    return (
        <main className="h-screen bg-[#000] text-[#ccc] flex flex-col overflow-hidden">
            {/* Minimal Navbar - Very thin */}
            <div className="w-full px-4 py-1 shrink-0 flex justify-center border-b border-[#222] bg-[#050505] z-20">
                <Navbar />
            </div>

            {/* Content Area - Grows to fill screen */}
            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden relative">

                {/* Left Panel: Help Menu - Compact */}
                <div className="lg:w-64 w-full shrink-0 border-r border-[#222] bg-[#050505] flex flex-col border-b lg:border-b-0 overflow-y-auto">
                    <div className="p-4">
                        <h2 className="text-sm font-bold mb-3 border-b border-[#222] pb-1 text-[#00ff00] flex justify-between items-center">
                            <span>:: SYSTEM ::</span>
                            <span className="text-[8px] opacity-30 font-mono anim-pulse">READY</span>
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs text-white font-bold mb-1 opacity-70 border-b border-[#222]/50 pb-0.5">Shell</h3>
                                <ul className="text-[10px] space-y-1 opacity-80 font-mono">
                                    <CommandItem cmd="HELP" desc="Display a brief summary of commands in the terminal." shortcut="Summarize" />
                                    <CommandItem cmd="LS" desc="List files in the root directory (RAMFS)." shortcut="List Files" />
                                    <CommandItem cmd="CAT" desc="Print the contents of a file. (Example: CAT test.txt)" shortcut="Read File" />
                                    <CommandItem cmd="CLEAR" desc="Clear the screen." shortcut="Clear SCR" />
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xs text-white font-bold mb-1 opacity-70 border-b border-[#222]/50 pb-0.5">Process</h3>
                                <ul className="text-[10px] space-y-1 opacity-80 font-mono">
                                    <CommandItem cmd="RUN" desc="Execute a binary program from the ramdisk." shortcut="Exec bin" />
                                    <CommandItem cmd="PS" desc="List all active processes and their states." shortcut="Task list" />
                                    <CommandItem cmd="KILL" desc="Terminate a process by its Process ID." shortcut="Kill PID" />
                                    <CommandItem cmd="USER" desc="Switch to Ring 3 (User Mode) via trampoline." shortcut="Ring 3" />
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xs text-white font-bold mb-1 opacity-70 border-b border-[#222]/50 pb-0.5">System</h3>
                                <ul className="text-[10px] space-y-1 opacity-80 font-mono">
                                    <CommandItem cmd="MEM" desc="Display memory stats (Heap, PMM)." shortcut="Heap stats" />
                                    <CommandItem cmd="KLOG" desc="Replay the last 16 lines from kernel trace." shortcut="Trace buf" />
                                    <CommandItem cmd="REBOOT" desc="Initiate a soft reboot." shortcut="Restart" />
                                    <CommandItem cmd="TEST" desc="Enter the Paging & Core Test Menu." shortcut="Invariants" />
                                </ul>
                            </div>

                            <div className="border-t border-[#222] pt-3 mt-4">
                                <ul className="text-[10px] space-y-1 opacity-50 font-mono">
                                    <li>CPU: Intel x86</li>
                                    <li>RAM: 32MB / VGA</li>
                                    <li>ABI: CORE_V1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Emulator - NO PADDING */}
                <div className="flex-grow flex flex-col relative bg-[#000] overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                        <V86Emulator />
                    </div>
                </div>
            </div>
        </main>
    );
}
