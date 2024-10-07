"use client";
import React, {  useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import Text from "./Text";
import FormProduct from "./FormProduct";
import FormLove from "./FormLove";
import FormEventAnnoun from "./FormEventAnnoun";
import FormPostInspiration from "./FormPostInspiration.tsx";
import { MessageProvider } from "./context/MessageContext";


export default function Dashboard() {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const handlePromocionClick = (formType: string) => {
    setActiveForm(formType);
  };

  const closeForm = () => {
    setActiveForm(null); // Para cerrar cualquier formulario
  };

  return (
    <MessageProvider>
      
      <div className="bg-gradient-to-b from-black via-violet-800 to-violet-600 min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center w-full">
        {/* Mostrando el formulario seleccionado */}
        {activeForm && (
          <div className="absolute z-50 top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
            {activeForm === "product" && <FormProduct />}
            {activeForm === "love" && <FormLove />}
            {activeForm === "event" && <FormEventAnnoun />}
            {activeForm === "inspiration" && <FormPostInspiration />}
            <button
              onClick={closeForm}
              className="text-white  p-2  bg-red-600 rounded mt-4"
            >
              Cerrar
            </button>
          </div>
        )}

        <div className="flex flex-col items-start xl:flex-row-reverse gap-1 mt-32 md:mt-40 max-w-screen-lg w-full px-2">
          {/* Sidebar */}
          <Sidebar onPromocionClick={handlePromocionClick} />

          {/* Contenido principal */}
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-white rounded-xl p-4">
              <div className="flex justify-center">
                <Text />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MessageProvider>
  );
}
