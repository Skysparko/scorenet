import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

type TProps = {
  image: HTMLImageElement | null;
  show: boolean;
  onHide: () => void;
  setCroppedImage: React.Dispatch<React.SetStateAction<string>>;
  setShowImageError: React.Dispatch<React.SetStateAction<boolean>>;
};

const CropperModal = (props: TProps) => {
  const { image, show, onHide, setCroppedImage, setShowImageError } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (image) {
      handleCanvasDraw();
    }
  }, [image, scale, position]);

  const handleCanvasDraw = () => {
    const canvas = canvasRef.current;
    if (canvas && image) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          image,
          position.x,
          position.y,
          image.width * scale,
          image.height * scale
        );
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const offsetX = mouseX - position.x;
      const offsetY = mouseY - position.y;

      const onMouseMove = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - rect.left - offsetX,
          y: e.clientY - rect.top - offsetY,
        });
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const scaleIncrement = 0.1;
    const delta = e.deltaY < 0 ? 1 : -1;
    const newScale = scale + delta * scaleIncrement;
    setScale(Math.max(0.1, newScale));
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const croppedCanvas = document.createElement("canvas");
      const ctx = croppedCanvas.getContext("2d");
      if (ctx) {
        croppedCanvas.width = canvas.width;
        croppedCanvas.height = canvas.height;
        ctx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
        ctx.globalCompositeOperation = "destination-over";
        ctx.drawImage(canvas, 0, 0);
        setCroppedImage(croppedCanvas.toDataURL("image/png"));
        setShowImageError(false);
        onHide();
      }
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
  };

  return (
    <Modal
      backdrop={"blur"}
      className={`rounded-3xl p-5 max-xs:px-0 text-black`}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      isOpen={show}
      onClose={onHide}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>
          <h1>Crop Image</h1>
        </ModalHeader>
        <ModalBody className="flex flex-col justify-center items-center gap-4 bg-gray-400">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{ cursor: "grab" }}
            className="border bg-white shadow"
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          ></canvas>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button onClick={handleZoomIn} color="secondary">
              +
            </Button>
            <Button onClick={handleZoomOut} color="secondary">
              -
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCrop} color="primary">
              Crop Image
            </Button>
            <Button onClick={props.onHide} color="danger">
              Close
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CropperModal;
