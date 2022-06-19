const Modal = ({
  title,
  children,
  isOpen,
  toggle,
}: {
  title: string;
  children: JSX.Element;
  isOpen: boolean;
  toggle: any;
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
            <div className="modal-footer"></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
