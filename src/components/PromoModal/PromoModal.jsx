// src/components/PromoModal/PromoModal.jsx
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export const PromoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Abrir el modal automáticamente al cargar la página
    onOpen();
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Promoción</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "0",
              paddingTop: "83.8298%",
              paddingBottom: "0",
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
              overflow: "hidden",
              borderRadius: "8px",
              willChange: "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                border: "none",
                padding: "0",
                margin: "0",
              }}
              src="https://www.canva.com/design/DAGL-VNhq5Q/Ohu39Dtysbmp8haQCHFsew/view?embed"
              allowFullScreen
            ></iframe>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="pink" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
