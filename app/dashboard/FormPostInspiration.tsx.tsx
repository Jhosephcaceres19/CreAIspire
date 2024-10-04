import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function FormPostInspiration() {

  const[editorContent, setEditorContent]= useState("");
  const getValidationSchema = () => {
    return Yup.object({
      title: Yup.string()
        .max(50, "El título no debe tener más de 50 caracteres")
        .required("El título es requerido"),
      category: Yup.string().required("La categoría es requerida"),
      message: Yup.string()
        .max(300, "El mensaje no debe tener más de 300 caracteres")
        .required("El mensaje es requerido"),
      hashtags: Yup.string()
        .matches(
          /^#(\w+ )*(#\w+)$/,
          "Los hashtags deben estar separados por espacios y comenzar con #"
        )
        .optional(),
    });
  };

  const handleSubmit = async (values) => {
    // Crear un objeto JSON con los valores del formulario
    const postData = {
      title: values.title,
      category: values.category,
      message: values.message,
      hashtags: values.hashtags,
    };

    const prompt = `Crea un post para: ${postData.title}, para la categoria ${postData.category},el mensaje de inspiracion ${postData.message}, hashtags ${postData.hashtags}`

    console.log("Prompt generado:", prompt);

    try {
      
      // Hacer la solicitud a la API de Gemini
      const response = await axios.post("/api/generate", { prompt });
      
      // Limpiar el contenido recibido (opcional)
      const cleanedContent = response.data.answer
        .replace(/[*]/g, "") // Eliminar caracteres no deseados
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
    <div className="flex justify-center items-center">
      <Formik
        initialValues={{
          title: "",
          category: "motivacional", // valor predeterminado
          message: "",
          hashtags: "",
        }}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        <Form className="form-fields-container p-4 bg-sky-500 rounded-lg ">
          <h2 className="text-xl font-semibold text-center text-violet-600">Generador de post de inspiracion</h2>
          <div>
            <label htmlFor="title" className="block text-gray-700">Título del post</label>
            <Field id="title" name="title" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700">Categoría</label>
            <Field as="select" id="category" name="category" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="motivacional">Motivacional</option>
              <option value="superación personal">Superación Personal</option>
              <option value="bienestar">Bienestar</option>
              <option value="positividad">Positividad</option>
              <option value="reflexión">Reflexión</option>
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700">Mensaje Inspiracional</label>
            <Field as="textarea" id="message" name="message" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="hashtags" className="block text-gray-700">Hashtags (opcional)</label>
            <Field
              id="hashtags"
              name="hashtags"
              type="text"
              placeholder="#inspiracion #positividad"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="hashtags"
              component="div"
              className="text-red-500"
            />
          </div>

          <button type="submit" className="w-full py-2 mt-5 bg-violet-600 text-white rounded-e-md hover:bg-violet-700 transition duration-200">Publicar Post Inspiracional</button>
        </Form>
      </Formik>
    </div>
  );
}
