"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[selectedImage]}
          alt={`${name} - Image ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 border-2 transition-all ${
                selectedImage === index
                  ? "border-indigo-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`${name} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

