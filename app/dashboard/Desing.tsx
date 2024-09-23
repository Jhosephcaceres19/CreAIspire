"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";

export default function Desing() {
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "proyectofinal"); 

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcyr5qkhg/image/upload", 
        formData
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Input de archivo oculto */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      {/* Botón personalizado para subir la imagen */}
      <button
        className="bg-violet-700 hover:bg-violet-400 rounded-lg p-2 text-white"
        onClick={handleButtonClick} // Al hacer clic, simula el clic en el input
      >
        Subir imagen
      </button>

      {imageUrl && (
        <div className="mt-4 w-full h-64 relative overflow-hidden"> {/* Ajusta el contenedor de la imagen */}
          <Image
            src={imageUrl}
            // layout="fill" // Hace que la imagen llene el contenedor
            width={500}
            height={500}
            objectFit="cover" // Mantiene la relación de aspecto de la imagen
            alt="Imagen subida"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
