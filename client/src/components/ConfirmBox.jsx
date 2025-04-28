import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await confirm();
    } catch (error) {
      console.error("Confirmation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-800/70 p-4 flex justify-center items-center animate-fade-in">
      <div className="bg-white w-full max-w-md p-4 rounded shadow-lg animate-slide-up">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold text-lg">Permanent Delete</h1>
          <button
            onClick={close}
            disabled={isLoading}
            className="hover:bg-gray-100 rounded-full p-1 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <p className="my-4 text-gray-600">
          Are you sure you want to delete this category ?
        </p>

        <div className="w-fit ml-auto flex gap-3">
          <button
            onClick={cancel}
            disabled={isLoading}
            className="px-4 py-2 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-t-transparent border-green-600 rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
