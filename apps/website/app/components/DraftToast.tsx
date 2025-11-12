"use client";

import { useEffect, useState } from "react";

export default function DraftToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  useEffect(() => {
    // Check if user has already seen the toast
    const hasSeenToast = sessionStorage.getItem("hasSeenDraftToast");

    if (!hasSeenToast) {
      // Show toast after a brief delay
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        // Mark as seen only after it becomes visible
        sessionStorage.setItem("hasSeenDraftToast", "true");
      }, 500);

      // Auto-hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }, 5500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 animate-slide-up">
      <div
        className={`bg-white border border-gray-300 rounded-lg shadow-lg p-4 transition-all duration-300 ${
          isClosing ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Draft Specification - Work in Progress
            </h3>
            <p className="text-sm text-gray-700">
              This specification is in <strong>draft status</strong> and under active development.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
