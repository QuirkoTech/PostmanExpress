import { Loader2 } from "lucide-react";

const Spinner = ({ height, width, stroke }) => {
    return (
        <Loader2
            className={`animate-spin-slow  ${
                height ? `h-${height}` : "h-[20px]"
            } ${width ? `w-${width}` : "w-[20px]"} text-white`}
            strokeWidth={stroke ? stroke : 2}
        />
    );
};

export default Spinner;
