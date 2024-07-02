import React from "react";

const Layer = React.forwardRef(function Layer(props, ref) {
  return (
    <div
      className="job_req-layer absolute top-0 bottom-0 left-0 right-0 scale-0 bg-sec flex justify-center
       z-10 rounded-md duration-150"
      ref={ref}
    ></div>
  );
});

export default Layer;
