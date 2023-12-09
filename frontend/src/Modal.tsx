import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
        <h2>モーダルウィンドウ</h2>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default Modal;