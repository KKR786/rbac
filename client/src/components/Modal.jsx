import {useEffect, useRef} from 'react'

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const modalRef = useRef(null);

    useEffect(()=> {
        function checkClickOutside (event) {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", checkClickOutside)
        return () => {
            document.removeEventListener("mousedown", checkClickOutside);
          };
        }, [onClose]);
      

    return (
        <div className="fixed inset-0 flex
                        items-center justify-center
                        bg-black bg-opacity-50 z-10">
            <div ref={modalRef} className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative">
                <button
                    className="absolute top-2 right-2
                               text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &#x2715;
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal
