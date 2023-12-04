import { useEffect } from "react";

const Overlay = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);
    return (
        <div
            className={`linear fixed left-0 top-0 z-50 flex h-full w-full items-center transition-all duration-500 ${
                isOpen
                    ? "bg-black/60 backdrop-blur-sm"
                    : " pointer-events-none opacity-0"
            }`}
            onClick={onClose}
        >
            {children}
        </div>
    );
};

export default Overlay;
