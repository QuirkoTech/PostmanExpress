import { PackagePlus, PackageX, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const NoParcelData = ({ isSmallScreen, message, linkHistory }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {isSmallScreen ? (
                <PackageX size={100} strokeWidth="1px" />
            ) : (
                <PackageX size={200} strokeWidth="0.5px" />
            )}

            <h1 className="sm-max:text-xl mt-8 w-3/4 text-center text-2xl font-semibold">
                {message}
            </h1>

            {linkHistory ? (
                <Link
                    to="/history"
                    className="hover:text-green-active sm-max:text-sm mt-4 flex flex-row self-center transition-all duration-300"
                >
                    <p className="">See past shipments</p>
                    <ChevronRight
                        className="sm-max:w-4 sm-max:h-4 h-5 w-5 self-center"
                        strokeWidth={2}
                    />
                </Link>
            ) : null}
            <Link
                to="/new"
                className="hover:text-green-active sm-max:text-sm mt-4 flex flex-row self-center transition-all duration-300"
            >
                <p className="mr-1">Create new parcel</p>
                <PackagePlus
                    className="sm-max:w-4 sm-max:h-4 h-5 w-5 self-center"
                    strokeWidth={2}
                />
            </Link>
        </div>
    );
};

export default NoParcelData;
