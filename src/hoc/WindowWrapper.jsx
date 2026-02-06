import useWindowStore from "#store/window";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={"absolute"}
      >
        <Component {...props} />
      </section>
    );
  };

  return <div>WindowWrapper</div>;
};

export default WindowWrapper;
