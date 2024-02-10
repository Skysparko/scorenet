"use client";
import React, { SetStateAction, useRef, useState } from "react";
import CropperModal from "./modal";
import NextImage from "next/image";

type TProps={
  croppedImage:string,
  setCroppedImage:React.Dispatch<React.SetStateAction<string>>
}

const ImageCropper = (props:TProps) => {
  const {croppedImage,setCroppedImage} = props;
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  
  const [showCropperModal, setShowCropperModal] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      setShowCropperModal(true);
    }
  };

  const handleModalHide = () => {
    setShowCropperModal(false);
    setImage(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <>
      <CropperModal
        image={image}
        show={showCropperModal}
        onHide={handleModalHide}
        setCroppedImage={setCroppedImage}
      />
      <div className="flex flex-col justify-center items-center">
        <label
          htmlFor="image"
          className="border border-gray-300 rounded-xl shadow cursor-pointer"
        >
          {croppedImage ? (
            <NextImage
              src={croppedImage}
              alt="Cropped"
              height={100}
              width={100}
            />
          ) : (
            <NextImage
              height={100}
              width={100}
              src={"/auction.png"}
              alt="Default"
            />
          )}
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          id="image"
          className="hidden"
          ref={inputFileRef}
        />
      </div>
    </>
  );
};

export default ImageCropper;
