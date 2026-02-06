# 🥞 Curls OS - Virtual Engine v0.4

Curls OS is an experimental, strictly architected operating system kernel designed for the **32-bit x86 architecture**. This project hosts the kernel in a high-performance web environment, allowing for interactive exploration of low-level systems concepts directly in the browser via the [V86](https://github.com/copy/v86) emulation engine.

![Curls OS Banner](https://img.shields.io/badge/Status-Alpha-yellow?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Arch-x86_32--bit-blue?style=for-the-badge)


## Project Vision
To build a verifiable, strictly architected operating system kernel that serves as a pedagogical foundation for systems programming, to build a base OS and a stable K-ABI and U-ABI that can be used as a foundation for fast and secure prototyping of niche operating systems. Curls OS adheres to strict architectural contracts, demonstrating that "hobby" systems can still maintain internal purity and robust invariants.

## Key Features

### Kernel Core
*   **Preemptive Multitasking**: Round-robin scheduler with task prioritization.
*   **Virtual Memory Management**: Robust Paging, Physical Memory Manager (PMM), and Kernel Heap.
*   **Strict Ring Isolation**: Hard boundary between Kernel (Ring 0) and User (Ring 3) using specialized trampolines. All user-kernel transitions occur via explicit syscall or interrupt gates. The kernel never implicitly trusts user pointers or stack data.
*   **Virtual File System (VFS)**: Integrated initrd (RAMFS) supporting standard file operations.

### Web Environment
*   **V86 Terminal Bridge**: Direct serial COM1 integration for reliable keyboard input and high-speed text rendering.
*   **Interactive Command Panel**: Side-panel shortcuts for common shell commands (HELP, LS, CAT, PS, MEM).
*   **Retro Aesthetics**: CRT-inspired UI with subtle scanlines, pixelated rendering, and glow effects.
*   **Automated Scaling**: Fluid layout engine that keeps the emulator constrained and responsive.

## Technical Stack
*   **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router), React 19, TypeScript.
*   **Styling**: [Tailwind CSS 4.0+](https://tailwindcss.com/) with custom retro-design tokens.
*   **Emulation**: [V86 Engine](https://github.com/copy/v86) (WASM-based x86 emulation).
*   **Deployment**: Optimized for Vercel/Static hosting.

## System Invariants & Testing
Curls OS is built around the `CORE_V1` invariant suite. The system continuously verifies:
*   **Memory Integrity**: Page table validity and heap boundary checks.
*   **Task State**: Verified context switching and stack isolation.
*   **ABI Stability**: Frozen K-ABI/U-ABI contracts to ensure long-term binary compatibility.

## Development

### Prerequisites
*   Node.js 18.x or later
*   npm / yarn / pnpm

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the emulator at `http://localhost:3000/emulator`.

## Roadmap & Open Source
Curls OS is currently closed source. We are holding back the source repository until we achieve stability in our primary ABIs:
1.  **Stable K-ABI**: Finalized interface for kernel modules/drivers.
2.  **Stable U-ABI**: Frozen syscall table and process lifecycle contract.

*Once these milestones are met, the full kernel source will be released under an open-source license. The kernel binary (`os-image.bin`) is prebuilt and shipped as part of this repository. Curls OS is a research and educational kernel. It is not intended for production use.*

---
**Curls OS Virtual Engine v0.4**
*Behavior reflects ABI guarantees, not implementation details.*
