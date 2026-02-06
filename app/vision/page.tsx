import Navbar from '../components/Navbar';

export default function Vision() {
    return (
        <main className="min-h-screen p-8 flex flex-col items-center max-w-4xl mx-auto">
            <Navbar />

            <div className="w-full">
                <h1 className="text-3xl mb-6 border-b border-[#333] pb-2">Project Vision</h1>

                <h2 className="text-2xl mb-4">The Goal</h2>
                <p className="mb-8">
                    To build a verifiable, strictly architected operating system kernel that serves as a pedagogical foundation for systems programming. Curls OS aims to demonstrate that a hobby OS can still adhere to professional-grade engineering standards and strict architectural contracts.
                </p>

                <h2 className="text-2xl mb-4">Open Source Roadmap</h2>
                <p className="mb-4">
                    Curls OS is currently being developed in a closed &quot;Incubation Phase&quot;. We are intentionally holding back the source code to ensure that the foundation is rock-solid before community contributions begin.
                </p>
                <p className="mb-6 font-bold text-white">
                    We pledge to fully open-source the Curls OS repository once the following milestones are met:
                </p>

                <div className="mb-8 pl-4 border-l-2 border-[#333]">
                    <div className="mb-4">
                        <h3 className="text-xl text-white">1. Stable K-ABI (Kernel ABI)</h3>
                        <p>A finalized, versioned interface for kernel modules and drivers. This ensures that internal components can interact without breaking changes in the core.</p>
                    </div>
                    <div>
                        <h3 className="text-xl text-white">2. Stable U-ABI (User ABI)</h3>
                        <p>A frozen syscall table and process lifecycle contract. This ensures that user-space binaries (like the shell or user programs) continue to run correctly as the kernel evolves.</p>
                    </div>
                </div>

                <p className="italic opacity-70 mb-8">*Until these ABIs are stable, the internal architecture is subject to breaking changes.*</p>

                <h2 className="text-2xl mb-4">Architecture Philosophy</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl text-white mb-2">1. The Sacred Core</h3>
                        <p>The kernel core is treated as a &quot;Sacred Layer.&quot; Changes to the core must pass the `CORE_V1` invariant suite. Performance optimizations are secondary to correctness and stability.</p>
                    </div>
                    <div>
                        <h3 className="text-xl text-white mb-2">2. Strict Ring Isolation</h3>
                        <p>We enforce a hard boundary between Kernel (Ring 0) and User (Ring 3) modes.</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li><strong>Memory:</strong> Kernel pages are Supervisor-only. User pages are strictly separated.</li>
                            <li><strong>Transitions:</strong> All user-to-kernel transitions occur via explicit trampolines or interrupt gates.</li>
                            <li><strong>Trust:</strong> The kernel never implicitly trusts user pointers or stack data.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl text-white mb-2">3. Client-Side First</h3>
                        <p>Why host an OS on the web? Till open sourced, the kernel still remains a shareable and open experience.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
