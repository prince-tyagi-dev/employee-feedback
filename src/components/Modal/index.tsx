import "./index.css";

const Modal = ({
  title,
  children,
  isOpen,
  toggle,
  showFooter,
}: {
  title: string;
  children: JSX.Element;
  isOpen: boolean;
  toggle: any;
  showFooter?: boolean;
}): JSX.Element => {
  return (
    <>
      {isOpen ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={toggle}>
                &times;
              </span>
              <h2>{title}</h2>
            </div>
            <div className="modal-body">{children}</div>
            {showFooter ? <div className="modal-footer"></div> : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
