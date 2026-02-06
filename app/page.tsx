import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center max-w-4xl mx-auto">
      {/* Scanlines Effect */}
      <div className="scanlines"></div>

      <Navbar />

      <section className="w-full mt-4">
        <h1 className="text-xl mb-6 font-bold">
          <span className="mr-2 text-[#00ff00]">*</span>
          CURLS OS - System Index
        </h1>

        <ul className="space-y-4 ml-6 list-disc">
          <li>
            <strong>Architecture:</strong> x86 (32-bit)
          </li>
          <li>
            <strong>Status:</strong> <span className="text-yellow-500">Alpha</span>
          </li>
          <li>
            <strong>Latest Build:</strong> v0.4
          </li>
          <li>
            <strong>Kernel Core:</strong> CORE_V1 (Frozen)
          </li>
        </ul>

        <div className="mt-8 border border-[#333] p-4 bg-[#111]">
          <p className="mb-2 text-[#00ff00]">$ cat motd</p>
          <p className="whitespace-pre-wrap opacity-80">
            Welcome to Curls OS.
            This is a capability-based, microkernel-inspired system running in your browser.

            Click "Emulator" above to boot the kernel.
          </p>
          <p className="mt-2 text-[#00ff00]"><span className="cursor-blink">_</span></p>
        </div>

        <div className="mt-12 text-sm opacity-60">
          <p>System ready.</p>
          <p>Memory: 32MB / VGA: 2MB</p>
          <p className="mt-2 text-yellow-500">This is a live kernel emulator running a frozen CORE_V1 build.
            Behavior reflects ABI guarantees, not implementation details.</p>
        </div>

      </section>
    </main>
  );
}
