import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import  MessageContext  from "./context/MessageContext";
import { LoveFormValues } from "./interface/FormInterface";

export default function FormLove() {

  const [editorContent, setEditorContent] = useState(""); 
  const context = useContext(MessageContext);

  
  const getValidationSchema = () => {
    return Yup.object({
      name: Yup.string()
        .max(10, 'El nombre no debe ser más de 10 caracteres')
        .required('Requerido'),
      memory: Yup.string()
        .max(30, 'El mensaje no debe ser más de 30 caracteres'),
      
    });
  };

  const handleSubmit = async (values:LoveFormValues, {resetForm}:{resetForm: ()=>void}) => {
    const postData = {
      name: values.name,
      relationship: values.relationship,
      feeling: values.feeling,
      occasion: values.occasion,
      memory: values.memory,
      lenght: values.lenght,
      type: values.type,
      
    };
    const prompt = `Crear un post para: ${postData.name},tipo de relacion ${postData.relationship},sentimiento principal ${postData.feeling}, motivo del mensaje ${postData.occasion}, recuerdo especial ${postData.memory},tamaño del post ${postData.lenght}, tipo de post ${postData.type}`;
    
    console.log("Prompt generado", prompt);

    // Verifica que el contexto esté definido
    if (!context) {
      throw new Error("MessageContext must be used within a MessageProvider");
    }

    const { setMessage } = context; // Extrae setMessage del contexto
    try {
      
      const response = await axios.post("/api/generate", { prompt });
      
      const cleanedContent = response.data.answer
        .replace(/[*#]/g, "") 
        .trim();
      
      setEditorContent(cleanedContent);
      console.log(editorContent)
      console.log("Respuesta de la API de Gemini:", cleanedContent);
      setMessage(cleanedContent)
      resetForm();
    } catch (error) {
      console.error("Error generando contenido:", error);
      setEditorContent("Error generando contenido.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={{
          name: "",
          relationship:"pareja",
          feeling:"amor romantico",
          occasion:"aniversario",
          memory: "",
          lenght:"corto",
          type:"romantico",
          
          
        }}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        <Form className="form-fields-container bg-sky-500 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-center text-violet-600">Generador de Mensajes de Amor</h2>
          
          <div>
            <label htmlFor="name" className="block text-gray-700">Nombre de la persona</label>
            <Field id="name" name="name" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
          </div>

          <div>
            <label htmlFor="relationship" className="block text-gray-700">Seleccionar tipo de relación</label>
            <Field as="select" id="relationship" name="relationship" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="pareja">Pareja</option>
              <option value="amigo">Amigo</option>
              <option value="familiar">Familiar</option>
            </Field>
          </div>

          <div>
            <label htmlFor="feeling" className="block text-gray-700">Sentimiento principal</label>
            <Field as="select" id="feeling" name="feeling" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="amor romantico">Amor Romántico</option>
              <option value="gratitud">Gratitud</option>
              <option value="carino">Cariño</option>
              <option value="nostalgia">Nostalgia</option>
            </Field>
          </div>

          <div>
            <label htmlFor="occasion" className="block text-gray-700">Motivo del mensaje</label>
            <Field as="select" id="occasion" name="occasion" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="aniversario">Aniversario</option>
              <option value="cumpleanos">Cumpleaños</option>
              <option value="dia comun">Día Común</option>
              <option value="reconciliacion">Reconciliación</option>
            </Field>
          </div>

          <div>
            <label htmlFor="memory" className="block text-gray-700">Recuerdo especial</label>
            <Field id="memory" name="memory" as="textarea" className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24"/>
            <ErrorMessage name="memory" component="div" className="text-red-500 text-sm"/>
          </div>

          <div>
            <label htmlFor="length" className="block text-gray-700">Tamaño del mensaje</label>
            <Field as="select" id="length" name="length" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="corto">Corto</option>
              <option value="mediano">Mediano</option>
              <option value="largo">Largo</option>
            </Field>
          </div>

          <div>
            <label htmlFor="type" className="block text-gray-700">Tipo de mensaje</label>
            <Field as="select" id="type" name="type" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="romantico">Romántico</option>
              <option value="divertido">Divertido</option>
              <option value="emotivo">Emotivo</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </Field>
          </div>

         

          <button type="submit" className="w-full py-2 mt-5 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200">Generar mensaje de amor</button>
        </Form>
      </Formik>
    </div>
  );
}
