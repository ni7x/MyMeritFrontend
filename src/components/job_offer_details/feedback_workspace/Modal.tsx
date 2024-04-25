const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className='absolute w-screen h-screen bg-black bg-opacity-60 fixed z-[1001] top-0 left-0 justify-center items-center z-[1001] flex'>
            <div className="flex flex-col  justify-center items-center bg-main-bg-color p-5 rounded">
                {children}
            </div>
        </div>
    );
}
export default Modal;