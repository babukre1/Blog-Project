"use client";
import { CldImage, CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  image: string;
  onChange: (value: string) => void;
}

const UploadImage = ({ image, onChange }: ImageUploadProps) => {
  return (
    <>
      <div className="w-36 h-36 border-2 border-muted-foreground rounded text-center my-6">
        <CldUploadButton
          className="w-full h-full"
          uploadPreset="r31janhr"
          onSuccess={(result: any) => {
            console.log(result.info.public_id);
            onChange(result.info.public_id);
          }}
        />
      </div>

      {image && (
        <div className="w-36 h-36 mt-4 relative pt-6 border-2">
          <CldImage src={image} className="object-cover" fill alt="an image" />
        </div>
      )}
    </>
  );
};

export default UploadImage;
