import Navbar from '../components/Navbar';

export default function About() {
    return (
        <main className="min-h-screen p-8 flex flex-col items-center max-w-4xl mx-auto">
            <Navbar />

            <div className="w-full">
                <h1 className="text-3xl mb-6 border-b border-[#333] pb-2">About Curls OS</h1>

                <p className="mb-4">
                    <strong className="text-white">Curls OS</strong> is an experimental, lightweight operating system kernel designed for architectural purity and strict resource isolation. Built from scratch for the 32-bit x86 architecture, it prioritizes robust core invariants and deterministic behavior over feature bloat.
                </p>

                <p className="mb-6">
                    The project is designed to be hosted on a client-side frontend, allowing the OS to run natively in the browser via emulation. This accessibility allows developers to explore low-level systems concepts immediately without complex toolchains or hardware setup.
                </p>

                <h2 className="text-2xl mb-4 mt-8">Core Philosophy</h2>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li><strong className="text-white">Simplicity:</strong> The core kernel relies on a minimal set of primitives.</li>
                    <li><strong className="text-white">Robustness:</strong> Critical system invariants (memory, stack, scheduling) are verified at runtime by the `CORE_V1` test suite.</li>
                    <li><strong className="text-white">Transparency:</strong> Extensive tracing (ktrace) and debug capabilities are built-in, not bolted on.</li>
                </ul>

                <h2 className="text-2xl mb-4 mt-8">Current Status</h2>
                <p className="mb-4">The project is currently in the <strong className="text-yellow-500">Alpha</strong> phase.</p>
                <p>The system currently implements:</p>
                <ul className="list-disc ml-6 space-y-2 mt-2">
                    <li>Preemptive Multitasking (Round Robin Scheduler)</li>
                    <li>Virtual Memory Management (Paging, PMM, Heap)</li>
                    <li>Strict Ring 0 / Ring 3 Isolation</li>
                    <li>Virtual File System (VFS) with initrd support</li>
                </ul>
            </div>
        </main>
    );
}
