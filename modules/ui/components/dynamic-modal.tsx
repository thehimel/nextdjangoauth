import React from "react";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DynamicModal({ children, title, isOpen, onClose }: ModalProps) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} scrollBehavior="outside" size="2xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            {title && <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                className="bg-default-foreground text-small font-medium text-background mx-6 mb-6"
                onPress={onClose}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
