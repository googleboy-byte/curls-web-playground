import React from 'react';

interface RetroCardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const RetroCard: React.FC<RetroCardProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`border-2 border-[#39ff14] p-6 relative bg-black/80 ${className} border-glow`}>
            {title && (
                <h3 className="text-xl md:text-2xl mb-4 text-glow font-bold border-b-2 border-[#39ff14] pb-2 inline-block">
                    {title}
                </h3>
            )}
            <div className="text-lg md:text-xl leading-relaxed">
                {children}
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>
        </div>
    );
};

export default RetroCard;
