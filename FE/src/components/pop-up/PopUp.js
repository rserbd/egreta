import React, { useEffect } from "react";

const PopUp = ({ onClose, visible, displayMessage }) => {
  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(onClose, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [visible, onClose]);

  if (!visible) return null;
  else
    return (
      <section>
        <div className="fixed top-20 right-4">
          <div
            className={`bg-green-100 p-4 rounded-2xl border-2 border-black flex gap-4 justify-center items-center text-center`}
          >
            <p>{displayMessage}</p>
            <button className="btn btn-sm btn-black ml-auto" onClick={onClose}>
              x
            </button>
          </div>
        </div>
      </section>
    );
};

export default PopUp;
