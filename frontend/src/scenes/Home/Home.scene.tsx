import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const width = 300;
const height = 300;

const lock = {
  selectable: false
  // hasControls: false,
  // lockMovementX: true,
  // lockMovementY: true,
  // lockScalingX: true,
  // lockScalingY: true,
  // lockUniScaling: true,
  // lockRotation: true
};

const isIframeView = () => {
  return window.location.hash.substr(0, 9) === "#/iframe/";
};

const Home = () => {
  const mirror = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isIframeView()) {
      return;
    }

    const canvas = new fabric.Canvas("canvas", {});

    const bg = new fabric.Rect({
      width,
      height,
      top: 0,
      left: 0,
      fill: "blue",
      ...lock
    });
    canvas.add(bg);

    const firstText = new fabric.Text("Thank you", {
      top: 40,
      fontFamily: "sans",
      fill: "orange",
      fontSize: 40,
      ...lock
    });
    canvas.add(firstText);
    firstText.centerH();

    if (mirror && mirror.current && mirror.current.src) {
      mirror.current.src = canvas.toDataURL();
      mirror.current.crossOrigin = "anonymous";
      mirror.current.addEventListener("click", () => {
        window.location.href = `#/iframe/${canvas.toDataURL()}`;
        window.location.reload();
      });
    }
  }, []);

  if (isIframeView()) {
    return (
      <div>
        <iframe
          title="image"
          src={window.location.hash.substr(9)}
          frameBorder="0"
          allowFullScreen
          style={{ border: 0, width, height }}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Home</h1>
      <div id="canvas_container" style={{ position: "relative" }}>
        <canvas id="canvas" width="300" height="300" />
        <img
          id="canvas_mirror"
          src=""
          alt="GeneroUS Generator"
          ref={mirror}
          style={{
            width: 300,
            height: 300,
            position: "absolute",
            top: 0,
            left: 0
          }}
        />
      </div>
    </div>
  );
};

export default Home;
