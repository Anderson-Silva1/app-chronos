import { Bounce, ToastContainer } from "react-toastify";

interface MessegesContainerProps {
  children: React.ReactNode;
}

const MessegesContainer = ({ children }: MessegesContainerProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default MessegesContainer;
