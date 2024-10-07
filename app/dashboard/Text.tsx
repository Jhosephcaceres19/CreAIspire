"use client";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import  MessageContext  from "./context/MessageContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Text() {
  const [editorContent, setEditorContent] = useState(""); 
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Asegúrate de que el contexto no sea undefined antes de desestructurarlo
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("MessageContext must be used within a MessageProvider");
  }

  const { message } = context; // Desestructura el mensaje y la función setMessage
  // Efecto para actualizar el contenido del editor cuando cambia el mensaje del contexto
  useEffect(() => {
    if (message) {
      setEditorContent(message); // Actualizar el contenido del editor con el mensaje del contexto
    }
  }, [message]); // Solo se ejecuta cuando 'message' cambia

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setEditorContent("");
    setSubmittedQuestion(question);
    setQuestion("");
    setShowQuestion(true);

    const prompt = `Dame un post unico con emoticon sobre ${question}`;

    try {
      const response = await axios.post("/api/generate", { prompt });
      const cleanedContent = response.data.answer
        .replace(/[*#]/g, '') 
        .trim();
      setEditorContent(cleanedContent);
    } catch (error) {
      console.error("Error generating content:", error);
      setEditorContent("Error generating content."); 
    } finally {
      setLoading(false);
    }
  };

  const copiarAlPortapapeles = async () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = editorContent;
    const textoSinEtiquetas = tempElement.innerText;
    try {
      await navigator.clipboard.writeText(textoSinEtiquetas);
      setCopiado(true);
      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch (error) {
      console.error("Error al copiar el texto: ", error);
    }
  };

  const handleAnotherMessage = async () => {
    if (!editorContent) return;

    setLoading(true);
    const prompt = `Dame otro post llamativo: ${editorContent}`;

    try {
      const response = await axios.post("/api/generate", { prompt });
      const cleanedContent = response.data.answer
        .replace(/[*#]/g, '')
        .trim();
      setEditorContent(cleanedContent);
    } catch (error) {
      console.error("Error generating another message:", error);
      setEditorContent("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  const handleImproveMessage = async () => {
    if (!editorContent) return;

    setLoading(true);
    const prompt = `Mejora el mensaje con esos datos importante y dale emoticones: ${editorContent}`;

    try {
      const response = await axios.post("/api/generate", { prompt });
      const cleanedContent = response.data.answer
        .replace(/[*#]/g, '')
        .trim();
      setEditorContent(cleanedContent);
    } catch (error) {
      console.error("Error generating another message:", error);
      setEditorContent("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  const handleHashtack = async () => {
    if (!editorContent) return;

    setLoading(true);
    const prompt = `Agregar hashtack en base al mensaje que tienes y mostrar debajo del mensaje : ${editorContent}`;

    try {
      const response = await axios.post("/api/generate", { prompt });
      const cleanedContent = response.data.answer
        .replace(/[*]/g, '')
        .trim();
      setEditorContent(cleanedContent);
    } catch (error) {
      console.error("Error generating another message:", error);
      setEditorContent("Error generating content.");
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
          <button
            onClick={copiarAlPortapapeles}
            className="p-1 shadow-lg rounded-md text-center border-2 hover:bg-violet-400 hover:text-white"
          >
            📋 Copiar
          </button>
          {copiado && (
            <span style={{ color: "green", marginLeft: "0px" }}>
              ¡Texto copiado!
            </span>
          )}

          <button
            onClick={handleImproveMessage}
            className="p-1 shadow-lg rounded-md text-center border-2 hover:bg-violet-400 hover:text-white"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Mejorar mensaje"}
          </button>

          <button
            onClick={handleAnotherMessage}
            className="p-1 shadow-lg rounded-md text-center border-2 hover:bg-violet-400 hover:text-white"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Otro Mensaje"}
          </button>

          <button
            onClick={handleHashtack}
            className="p-1 shadow-lg rounded-e-md text-center border-2 hover:bg-violet-400 hover:text-white"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Generar hashtack"}
          </button>
        </div>
      </div>
    </div>
  );
}
