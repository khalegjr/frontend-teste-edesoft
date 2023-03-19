import React from "react";

type LoadingButtonProps = {
  loading: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  textColor = "text-white",
  btnColor = "bg-blue-700",
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={`w-full py-3 font-semibold ${btnColor} rounded-lg outline-none border-none flex justify-center`}
    >
      {loading ? (
        <div className="text-white inline-block">Loading...</div>
      ) : (
        <span className={`text-lg font-normal ${textColor}"`}>{children}</span>
      )}
    </button>
  );
};
