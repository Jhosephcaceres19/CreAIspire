import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormLove() {
  
  const getValidationSchema = () => {
    return Yup.object({
      name: Yup.string()
        .max(10, 'El nombre no debe ser más de 10 caracteres')
        .required('Requerido'),
      memory: Yup.string()
        .max(30, 'El mensaje no debe ser más de 30 caracteres'),
      compliment: Yup.string()
        .max(20, 'El mensaje no debe ser más de 20 caracteres'),
      closing: Yup.string()
        .max(20, 'El mensaje no debe ser más de 20 caracteres')
        .required('Es requerido el mensaje')
    });
  };

  const handleSubmit = (values) => {
    // Crear un objeto JSON con los valores del formulario
    const postData = {
      name: values.name,
      relationship: values.relationship,
      feeling: values.feeling,
      occasion: values.occasion,
      memory: values.memory,
      lenght: values.lenght,
      type: values.type,
      compliment: values.compliment,
      closing: values.closing,
    };
    console.log(postData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Formik
        initialValues={{
          name: "",
          relationship:"pareja",
          feeling:"amor romantico",
          accasion:"aniversario",
          memory: "",
          lenght:"corto",
          type:"romantico",
          compliment: "",
          closing: "",
          
        }}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        <Form className="bg-sky-500 shadow-md rounded-lg p-6 w-96 space-y-4">
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

          <div>
            <label htmlFor="compliment" className="block text-gray-700">Elogio especial</label>
            <Field type="text" name="compliment" id="compliment" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage name="compliment" component="div" className="text-red-500 text-sm"/>
          </div>

          <div>
            <label htmlFor="closing" className="block text-gray-700">Cierre del mensaje</label>
            <Field type="text" id="closing" name="closing" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            <ErrorMessage name="closing" component="div" className="text-red-500 text-sm"/>
          </div>

          <button type="submit" className="w-full py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200">Generar mensaje de amor</button>
        </Form>
      </Formik>
    </div>
  );
}
