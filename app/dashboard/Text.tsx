"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Text() {
  const [editorContent, setEditorContent] = useState(""); // Guarda el contenido del editor
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [copiado, setCopiado] = useState(false); // Estado para mostrar si se copió correctamente

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setEditorContent("");
    setSubmittedQuestion(question);
    setQuestion("");
    setShowQuestion(true);

    const prompt = `Busca un post sobre ${question}`; // Modificar según tus necesidades

    try {
      const response = await axios.post("/api/generate", { prompt });
      // Limpiar el contenido recibido
      const cleanedContent = response.data.answer
        .replace(/[*#]/g, '') // Eliminar caracteres no deseados
        .trim();
      setEditorContent(cleanedContent);
    } catch (error) {
      console.error("Error generating content:", error);
      setEditorContent("Error generating content."); // Mostrar error en el editor
    } finally {
      setLoading(false);
    }
  };

  // Función para copiar el contenido del editor de ReactQuill
  const copiarAlPortapapeles = async () => {
    // Crear un elemento temporal para extraer el texto sin etiquetas HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = editorContent; // Poner el contenido HTML en el elemento temporal

    // Extraer el texto sin etiquetas HTML
    const textoSinEtiquetas = tempElement.innerText;
    try {
      await navigator.clipboard.writeText(textoSinEtiquetas); // Copia el contenido del editor
      setCopiado(true);

      // Mostrar un estado de copiado por unos segundos
      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch (error) {
      console.error("Error al copiar el texto: ", error);
    }
  };

  // Función para generar otro mensaje basado en el contenido actual del editor
  const handleAnotherMessage = async () => {
    if (!editorContent) return; // Asegurarse de que haya contenido en el editor

    setLoading(true);
    const prompt = `Mejora el siguiente contenido para un post llamativo: ${editorContent}`; // Usar el contenido del editor como base

    try {
      const response = await axios.post("/api/generate", { prompt });
      // Limpiar el contenido recibido
      const cleanedContent = response.data.answer
        .replace(/[*#]/g, '') // Eliminar caracteres no deseados
        .trim();
      setEditorContent(cleanedContent);
    } catch (error) {
      console.error("Error generating another message:", error);
      setEditorContent("Error generating content."); // Mostrar error en el editor
    } finally {
      setLoading(false);
    }
  };

  const handleHashtack = async () => {
    if (!editorContent) return; // Asegurarse de que haya contenido en el editor

    setLoading(true);
    const prompt = `Agregar hashtack en base al mensaje que tienes y mostrar debajo del mensaje : ${editorContent}`; // Usar el contenido del editor como base

    try {
      const response = await axios.post("/api/generate", { prompt });
      // Limpiar el contenido recibido
      const cleanedContent = response.data.answer
        .replace(/[*]/g, '') // Eliminar caracteres no deseados
        .trim();
      setEditorContent(cleanedContent);
    } catch (error) {
      console.error("Error generating another message:", error);
      setEditorContent("Error generating content."); // Mostrar error en el editor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:w-[700px] gap-5">
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

      <div className="h-[400px] p-2 shadow-md shadow-violet-800 rounded-md max-w-[700px] overflow-auto">
        {showQuestion && submittedQuestion && (
          <p className="mb-2 text-violet-600 text-lg">Pregunta: {submittedQuestion}</p>
        )}
        <ReactQuill
          value={editorContent} // El contenido del editor
          onChange={setEditorContent}
          theme="snow"
        />

        <div className="flex justify-around mt-2">
          {/* Botón para copiar el contenido del editor */}
          <button
            onClick={copiarAlPortapapeles}
            className="p-1 shadow-lg rounded-md text-center border-2 hover:bg-violet-400 hover:text-white"
          >
            📋 Copiar
          </button>
          {/* Mostrar mensaje de copiado */}
          {copiado && (
            <span style={{ color: "green", marginLeft: "0px" }}>
              ¡Texto copiado!
            </span>
          )}

          {/* Botón para generar otro mensaje */}
          <button
            onClick={handleAnotherMessage}
            className="p-1 shadow-lg rounded-md text-center border-2 hover:bg-violet-400 hover:text-white"
            disabled={loading} // Deshabilitar si se está cargando
          >
            {loading ? "Cargando..." : "Otro Mensaje"}
          </button>

          <button
          onClick={handleHashtack}
          className="p-1 shadow-lg rounded-e-md text-center border-2 hover:bg-violet-400 hover:text-white" 
          disabled={loading}
          >{loading ? "Cargando...":"Generar hashtack"}</button>

          
        </div>
      </div>
    </div>
  );
}
