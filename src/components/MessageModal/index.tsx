import { createPortal } from "react-dom";
import classes from "./MessageModal.module.css";

const MessageModal: React.FC<{ text: string; close: () => void }> = ({
  text,
  close,
}) => {
  const handleClose = () => {
    close();
  };
  return (
    <>
      {createPortal(
        <>
          <div className={classes.overlay} onClick={handleClose}></div>
          <section className={classes.wrapper}>
            <article className={classes.message}>
              <p className={classes.text}>{text}</p>
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </article>
          </section>
        </>,
        document.getElementById("modals")!
      )}
    </>
  );
};

export default MessageModal;
