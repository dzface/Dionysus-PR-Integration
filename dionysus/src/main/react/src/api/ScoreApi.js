import React, { useEffect } from "react";
import ReactModal from "react-modal";
import styles from "../style/liststyle/ListModalApi.module.css";
import scoresuccess from "../img/modal/scoresuccess.gif"; // 별점 입력 성공 이미지
import loginneed from "../img/modal/loginneed.gif"; // 로그인 필요 이미지
import styled from "styled-components";
const Image = styled.img`
  width: 150px;
  height: 150px;
`;

// 별점 모달 컴포넌트 주석은 ModalApi와 동일 이미지만 다름.
const ScoreApi = {
  SuccessModal: ({ isOpen, onClose, modalTitle, modalText }) => {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          onClose();
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <div className={styles.container}>
          <div>
            <h2 className={styles.modalTitle}>{modalTitle}</h2>
          </div>
          <div>
            <Image src={scoresuccess} />
          </div>
          <div>
            <h2 className={styles.modalText}>{modalText}</h2>
          </div>
          <div>
            <button className={styles.closeButton} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </ReactModal>
    );
  },
  FailModal: ({ isOpen, onClose, modalTitle, modalText }) => {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          onClose();
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <div className={styles.container}>
          <div>
            <h2 className={styles.modalTitle}>{modalTitle}</h2>
          </div>
          <div>
            <Image src={loginneed} />
          </div>
          <div>
            <h2 className={styles.modalText}>{modalText}</h2>
          </div>
          <div>
            <button className={styles.closeButton} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </ReactModal>
    );
  },
};

export default ScoreApi;
