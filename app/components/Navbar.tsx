import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="w-full border-b border-[#333] mb-8 pb-2 pt-4 flex gap-4 text-xl justify-center flex-wrap">
            <Link href="/" className="hover:underline text-[#00ff00]">[ Home ]</Link>
            <Link href="/about" className="hover:underline">[ About ]</Link>
            <Link href="/vision" className="hover:underline">[ Vision ]</Link>
            <Link href="/emulator" className="hover:underline text-[#00ff00]">[ Emulator ]</Link>
        </nav>
    );
};

export default Navbar;
