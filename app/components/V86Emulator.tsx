'use client';

import React, { useEffect, useRef, useState } from 'react';

// Define the global window interface to include V86Starter
declare global {
    interface Window {
        V86Starter: any;
        V86: any;
    }
}

const V86Emulator = () => {
    const emulatorRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Effect for loading script
    useEffect(() => {
        const loadV86 = async () => {
            if (window.V86Starter || window.V86) {
                setIsLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = '/v86/libv86.js';
            script.async = true;
            script.onload = () => {
                setIsLoaded(true);
            };
            document.body.appendChild(script);
        };

        loadV86();
    }, []);

    // Effect for handling keyboard interception and bridging to Serial
    useEffect(() => {
        if (!isLoaded) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Keys to capture and prevent from scrolling the browser
            const keysToPrevent = [' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Tab', 'Enter'];

            // Re-check focus eligibility
            const isEmulatorFocused = emulatorRef.current && (document.activeElement === emulatorRef.current || emulatorRef.current.contains(document.activeElement));
            const isBodyFocused = document.activeElement === document.body;

            if (isEmulatorFocused || isBodyFocused) {
                if (keysToPrevent.includes(e.key) || keysToPrevent.includes(e.code)) {
                    e.preventDefault();
                }
            }

            const emulator = (window as any).emulator_instance;
            if (!emulator) return;

            // Bridge to serial port COM1 (serial0)
            // This bypasses PS/2 emulation to match -nographic setups and fix spacebar issues.
            // Handle Control Characters (Ctrl + Key)
            if (e.ctrlKey) {
                const key = e.key.toLowerCase();
                if (key === 'c') {
                    // Send PS/2 Scancodes for Ctrl+C to trigger the kernel's keyboard signal handler
                    // This avoids sending ASCII 3 (which looks like a heart in CP437 VGA)
                    // [LCtrl Make, C Make, C Break, LCtrl Break]
                    emulator.keyboard_send_scancodes([0x1D, 0x2E, 0xAE, 0x9D]);
                    return;
                } else if (key === 'l') {
                    emulator.serial0_send('\x0c'); // FF - Form Feed (Ctrl+L)
                    return;
                } else if (key === 'd') {
                    emulator.serial0_send('\x04'); // EOT - End of Transmission (Ctrl+D)
                    return;
                }
            }

            if (e.key.length === 1) {
                // Standard characters: alphabets, numbers, space, symbols
                emulator.serial0_send(e.key);
            } else if (e.key === 'Enter') {
                emulator.serial0_send('\n');
            } else if (e.key === 'Backspace') {
                emulator.serial0_send('\b'); // 0x08
            } else if (e.key === 'Tab') {
                emulator.serial0_send('\t');
            }
        };

        window.addEventListener('keydown', handleKeyDown, { capture: true });
        return () => {
            window.removeEventListener('keydown', handleKeyDown, { capture: true });
        };
    }, [isLoaded]);

    // Effect for initializing V86
    useEffect(() => {
        if (isLoaded && emulatorRef.current) {
            // Destroy previous instance if it exists
            if (emulatorRef.current.innerHTML !== '') return;

            const V86Constructor = window.V86Starter || window.V86;

            if (!V86Constructor) {
                console.error("V86 constructor not found");
                return;
            }

            const emulator = new V86Constructor({
                wasm_path: '/v86/v86.wasm',
                memory_size: 32 * 1024 * 1024,
                vga_memory_size: 2 * 1024 * 1024,
                screen_container: emulatorRef.current,
                disable_keyboard: true, // Disable PS/2 keyboard to use our Serial Bridge exclusively
                bios: {
                    url: '/bios/seabios.bin',
                },
                vga_bios: {
                    url: '/bios/vgabios.bin',
                },
                fda: {
                    url: '/os-image.bin',
                },
                autostart: true,
            });

            // Expose emulator instance for debugging and for the effect above
            (window as any).emulator_instance = emulator;

            // Auto-focus after init
            setTimeout(() => {
                emulatorRef.current?.focus();
            }, 500);
        }
    }, [isLoaded]);

    // Effect for auto-scrolling when content grows (for DOM-based terminals)
    useEffect(() => {
        const node = emulatorRef.current;
        if (!node) return;

        const observer = new MutationObserver(() => {
            node.scrollTop = node.scrollHeight;
        });

        observer.observe(node, { childList: true, subtree: true, characterData: true });

        return () => observer.disconnect();
    }, []);

    const handleContainerClick = () => {
        if (emulatorRef.current) {
            emulatorRef.current.focus();
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
            {!isLoaded && <div className="text-white mb-4 absolute z-10">Loading Emulator core...</div>}

            {/* Main Emulator Unit */}
            <div className="relative group">
                {/* Decorative border / Screen Frame */}
                <div className="absolute -top-6 -left-6 -right-6 -bottom-6 border-2 border-[#1a1a1a] rounded bg-[#0a0a0a] -z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"></div>

                <div
                    ref={emulatorRef}
                    tabIndex={0}
                    onClick={handleContainerClick}
                    className="emulator-container relative bg-black border-2 border-[#333] w-[800px] h-[600px] max-w-[90vw] max-h-[70vh] flex flex-col items-start justify-start focus:outline-none transition-all ring-1 ring-offset-8 ring-offset-black ring-transparent focus:ring-[#00ff00] overflow-y-auto overflow-x-hidden scrollbar-thin"
                ></div>

                {/* Status Indicator */}
                <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-1 text-[10px] font-mono text-[#444] uppercase tracking-widest">
                    <span>Power: ON</span>
                    <span>Status: IDLE</span>
                    <span>Port: COM1</span>
                </div>
            </div>

            <div className="mt-8 text-gray-500 text-[10px] opacity-30 uppercase tracking-[0.2em] pointer-events-none">
                Curls Virtual Engine v0.4
            </div>

            <style jsx global>{`
                .emulator-container canvas,
                .emulator-container > div {
                    max-width: 100% !important;
                    width: 100% !important;
                    height: auto !important;
                    min-height: 100%;
                    object-fit: contain !important;
                    cursor: text;
                    image-rendering: pixelated;
                    padding: 1.5rem;
                }
                .emulator-container::-webkit-scrollbar {
                    width: 4px;
                }
                .emulator-container::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 2px;
                }
                .emulator-container::-webkit-scrollbar-track {
                    background: transparent;
                }
            `}</style>
        </div>
    );
};

export default V86Emulator;
