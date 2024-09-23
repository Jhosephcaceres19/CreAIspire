"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

// Carga dinámica de ReactQuill para evitar problemas con SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Text() {
  const [editorContent, setEditorContent] = useState("");
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false); 


  // Manejador del input de la pregunta
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  // Manejador del envío del formulario
  const handleSubmit = async () => {
    setLoading(true);
    setEditorContent(""); // Limpiar editor antes de la búsqueda
    setSubmittedQuestion(question);
    setQuestion("");
    setShowQuestion(true)

    try {
      const response = await axios.post("/api/generate", { prompt: question });
      // Actualizamos el contenido del editor con la respuesta generada
      setEditorContent(response.data.answer);
    } catch (error) {
      console.error("Error generating content:", error);
      setEditorContent("Error generating content."); // Mostrar error en el editor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col lg:w-[700px]  gap-5">
      <div className="flex justify-end gap-4">
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={question}
          onChange={handleInputChange}
          className="p-1 shadow-lg rounded-md border-2 flex w-full"
        />
        <button
          className="p-1 shadow-lg rounded-md text-center border-2 hover:bg-violet-400 hover:text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Buscar"}
        </button>
      </div>

      <div className="h-[300px] p-2 shadow-md shadow-violet-800 rounded-md max-w-[700px]">
        {showQuestion && submittedQuestion && (
          <p className="mb-2">
            Pregunta: {submittedQuestion}
          </p>
        )}
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          theme="snow"
        />
      </div>
    </div>
  );
}
