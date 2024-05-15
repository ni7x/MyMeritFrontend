const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen bg-black bg-opacity-60 fixed top-0 left-0 justify-center items-center z-[1001] flex">
      <div className="flex flex-col  justify-center items-center bg-main-bg-color p-5 rounded">
        {children}
      </div>
    </div>
  );
};
export default Modal;
