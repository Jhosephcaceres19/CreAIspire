import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function FormEventAnnoun() {
  const [editorContent, setEditorContent] = useState(""); // Guarda el contenido del editor

  const getValidationSchema = () => {
    return Yup.object({
      eventName: Yup.string()
        .max(100, "El nombre del evento no debe tener más de 100 caracteres")
        .required("El nombre del evento es requerido"),
      eventDate: Yup.date()
        .required("La fecha del evento es requerida"),
      location: Yup.string().required("La ubicación es requerida"),
      eventType: Yup.string().required("Selecciona el tipo de evento"),
      description: Yup.string()
        .max(500, "La descripción no debe tener más de 500 caracteres")
        .required("La descripción del evento es requerida"),
    });
  };

  const handleSubmit = async (values) => {
    // Crear el postData con los valores del formulario
    const postData = {
      eventName: values.eventName,
      eventDate: values.eventDate,
      location: values.location,
      eventType: values.eventType,
      description: values.description,
    };

    // Generar el prompt para la API de Gemini
    const prompt = `Crea un post para: ${postData.eventName}, que será en fecha ${postData.eventType} en el lugar ${postData.location} el tipo de evento es ${postData.eventDate}. la descripción del evento es: ${postData.description}`;

    console.log("Prompt generado:", prompt); // Verificar que el prompt se genera correctamente

    try {
      
      // Hacer la solicitud a la API de Gemini
      const response = await axios.post("/api/generate", { prompt });
      
      // Limpiar el contenido recibido (opcional)
      const cleanedContent = response.data.answer
        .replace(/[*#]/g, "") // Eliminar caracteres no deseados
        .trim();
      
      // Actualizar el contenido del editor o mostrarlo en la consola
      setEditorContent(cleanedContent);
      console.log("Respuesta de la API de Gemini:", cleanedContent); // Mostrar en la consola
    } catch (error) {
      console.error("Error generando contenido:", error);
      setEditorContent("Error generando contenido.");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <Formik
        initialValues={{
          eventName: "",
          eventDate: "",
          location: "",
          eventType: "conferencia",
          description: "",
          isFree: false,
        }}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        <Form className="form-fields-container p-4 bg-sky-500 rounded-lg ">
          <h2 className="text-xl font-semibold text-center text-violet-700">
            Generador de anuncio para evento
          </h2>

          <div className="form-field">
            <label htmlFor="eventName" className="block text-slate-900">
              Nombre del evento
            </label>
            <Field
              id="eventName"
              name="eventName"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="eventName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="form-field">
            <label htmlFor="eventDate" className="block text-slate-900">
              Fecha del evento
            </label>
            <Field
              id="eventDate"
              name="eventDate"
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="eventDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="form-field">
            <label htmlFor="location" className="block text-slate-900">
              Ubicación
            </label>
            <Field
              id="location"
              name="location"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="form-field">
            <label htmlFor="eventType" className="block text-slate-900">
              Tipo de evento
            </label>
            <Field
              as="select"
              id="eventType"
              name="eventType"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="conferencia">Conferencia</option>
              <option value="taller">Taller</option>
              <option value="seminario">Seminario</option>
              <option value="networking">Networking</option>
              <option value="concierto">Concierto</option>
            </Field>
            <ErrorMessage
              name="eventType"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="form-field">
            <label htmlFor="description" className="block text-slate-900">
              Descripción del evento
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200"
          >
            Publicar Anuncio del Evento
          </button>

          
        </Form>
      </Formik>
    </div>
  );
}
