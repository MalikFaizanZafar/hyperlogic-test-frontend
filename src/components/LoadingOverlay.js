import React from "react";

export default function LoadingOverlay() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-md z-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    </div>
  );
}
