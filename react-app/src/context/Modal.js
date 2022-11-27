import React, { useContext, useRef, useState, useEffect } from "react";
import "./Modal.css";
import SignUpForm from "../components/auth/SignUpForm";
import CreatePost from "../components/CreatePost"
export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={{ value, modalType, setModalType }}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function SelectedModals() {
  const { modalType, setModalType } = useContext(ModalContext);
  if (modalType === "Signup") {
    return (
      <div className="modal">
        <SignUpForm />
        <div
          onClick={() => setModalType(null)}
          className="modal-background"
        ></div>
      </div>
    );
  }
  if (modalType === "CreatePost") {
    return (
      <div className="modal">
        <CreatePost />
        <div
          onClick={() => setModalType(null)}
          className="modal-background"
        ></div>
      </div>
    );
  }

  return null;
}
