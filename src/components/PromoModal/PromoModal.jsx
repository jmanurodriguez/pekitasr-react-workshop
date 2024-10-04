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
    onOpen();
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Promoción</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
              }}
              src="https://www.canva.com/design/DAGSoxJUfvU/FIEQzereMBlX2wO673G6ag/view?embed"
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
