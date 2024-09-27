import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormEventAnnoun() {
  const getValidationSchema = () => {
    return Yup.object({
      eventName: Yup.string()
        .max(100, "El nombre del evento no debe tener más de 100 caracteres")
        .required("El nombre del evento es requerido"),
      eventDate: Yup.date()
        .required("La fecha del evento es requerida")
        .min(new Date(), "La fecha no puede ser anterior a hoy"),
      location: Yup.string().required("La ubicación es requerida"),
      eventType: Yup.string().required("Selecciona el tipo de evento"),
      description: Yup.string()
        .max(500, "La descripción no debe tener más de 500 caracteres")
        .required("La descripción del evento es requerida"),
    });
  };

  const handleSubmit = (values) => {
    // Crear un objeto JSON con los valores del formulario
    const postData = {
      eventName: values.eventName,
      eventDate: values.eventDate,
      location: values.location,
      eventType: values.eventType,
      description: values.description,
    };
    console.log(postData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
        <Form>
          <h2 className="text-xl font-semibold text-center text-violet-600">Generador de anuncio para evento</h2>
          <div>
            <label htmlFor="eventName" className="block text-gray-700">Nombre del evento</label>
            <Field id="eventName" name="eventName" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="eventName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="eventDate" className="block text-gray-700">Fecha del evento</label>
            <Field id="eventDate" name="eventDate" type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="eventDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700">Ubicación</label>
            <Field id="location" name="location" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="eventType" className="block text-gray-700">Tipo de evento</label>
            <Field as="select" id="eventType" name="eventType" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
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

          <div>
            <label htmlFor="description" className="block text-gray-700">Descripción del evento</label>
            <Field as="textarea" id="description" name="description" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button type="submit" className="w-full py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200">Publicar Anuncio del Evento</button>
        </Form>
      </Formik>
    </div>
  );
}
