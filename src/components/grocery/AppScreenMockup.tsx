import React, { ReactNode } from "react";

interface AppScreenMockupProps {
  children: ReactNode;
}

const AppScreenMockup: React.FC<AppScreenMockupProps> = ({ children }) => {
  return (
    <div className="bg-[#f8f8f8] shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-5 rounded-[20px]">
      <header className="mb-5">
        <div className="flex justify-between items-center px-[15px] py-[5px]">
          <div className="text-sm">9:41</div>
          <div className="flex gap-[5px]">
            <i className="ti ti-wifi" aria-hidden="true" />
            <i className="ti ti-battery" aria-hidden="true" />
          </div>
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
};

export default AppScreenMockup;
