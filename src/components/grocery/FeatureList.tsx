import React from "react";

interface FeatureItem {
  text: string;
}

interface FeatureListProps {
  features: FeatureItem[];
  screensCount?: string;
}

const FeatureList: React.FC<FeatureListProps> = ({
  features,
  screensCount,
}) => {
  return (
    <div className="flex flex-col gap-[15px]">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5 text-[#666] text-base"
        >
          <i className="ti ti-check text-[#4caf50]" aria-hidden="true" />
          <span>{feature.text}</span>
        </div>
      ))}

      {screensCount && (
        <div className="inline-flex items-center gap-2 bg-[#f0f0f0] text-sm mt-5 px-4 py-2 rounded-[20px]">
          <i className="ti ti-plus" aria-hidden="true" />
          <span>{screensCount}</span>
        </div>
      )}
    </div>
  );
};

export default FeatureList;
