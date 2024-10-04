import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function FormProduct() {

  const[editorContent, setEditorContent]= useState("");

  const getValidationSchema = () => {
    return Yup.object({
      productName: Yup.string()
        .max(50, "El nombre del producto no debe tener más de 50 caracteres")
        .required("El nombre del producto es requerido"),
      description: Yup.string().max(
        200,
        "La descripción no debe tener más de 200 caracteres"
      ),
      price: Yup.number()
        .min(0, "El precio debe ser mayor o igual a 0")
        .required("El precio es requerido"),
      category: Yup.string().required("La categoría es requerida"),
      startDate: Yup.date().required("La fecha de inicio es requerida"),
      endDate: Yup.date()
        .min(
          Yup.ref("startDate"),
          "La fecha de fin debe ser posterior a la de inicio"
        )
        .required("La fecha de fin es requerida"),
    });
  };
  const handleSubmit = async (values) => {
    // Crear un objeto JSON con los valores del formulario
    const postData = {
      productName: values.productName,
      description: values.description,
      price: values.price,
      category: values.category,
      startDate:values.startDate,
      endDate:values.endDate,
    };
    const prompt = `Generar un post para: ${postData.productName}, descripcion del producto ${postData.price}, categoria ${postData.category}, fecha de inicio ${postData.startDate}, fecha de fin ${postData.endDate}`
    console.log("Pormpot generado", prompt);

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
    <div className="flex justify-center items-center">
      <Formik
        initialValues={{
          productName: "",
          description: "",
          price: "",
          category: "electronica", // valor predeterminado para los selects
          startDate: "",
          endDate: "",
        }}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        <Form className="form-fields-container p-4 bg-sky-500 rounded-lg">
          <h2 className="text-xl font-semibold text-center text-violet-600">Generador para post de productos</h2>
          <div>
            <label htmlFor="productName" className="block text-gray-700">Nombre del producto</label>
            <Field id="productName" name="productName" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="productName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">Descripción del producto</label>
            <Field as="textarea" id="description" name="description" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700">Precio</label>
            <Field id="price" name="price" type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700">Categoría</label>
            <Field as="select" id="category" name="category" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="electronica">Electrónica</option>
              <option value="ropa">Ropa</option>
              <option value="hogar">Hogar</option>
              <option value="juguetes">Juguetes</option>
              <option value="alimentos">Alimentos</option>
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-gray-700">Fecha de inicio</label>
            <Field id="startDate" name="startDate" type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-gray-700">Fecha de fin</label>
            <Field id="endDate" name="endDate" type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="endDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button type="submit" className="w-full py-2 bg-violet-600 mt-5 text-white rounded-md hover:bg-violet-700 transition duration-200">Enviar promoción</button>
        </Form>
      </Formik>
    </div>
  );
}
