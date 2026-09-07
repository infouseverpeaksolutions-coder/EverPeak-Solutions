import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState('');

  const openEnquiryModal = (service = '') => {
    setInitialService(service);
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
    setInitialService('');
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        initialService,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
