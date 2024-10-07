import Navbar from "./Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black via-violet-800 to-violet-600 min-h-screen">
      <Navbar />
      <main className="flex flex-col lg:flex-row-reverse place-items-center px-8 h-full gap-4 pt-20 md:pt-40 lg:pt-50 lg:pr-0">
        <Image
          src="/image.png"
          width={400}
          height={400}
          alt="Logo"
          className=" lg:w-[500px] lg:h-[600px]  xl:w-[1000px] 2xl:w-[4000px]"
        />
        <span className="flex-col items-center justify-center lg:flex-col pb-8">
          <h1 className="text-4xl text-white text-center font-bold md:text-6xl lg:text-7xl xl:text-8xl">
            creAIspire
          </h1>
          <div className="bg-violet-800 rounded-2xl p-4 shadow-2xl shadow-black hover:shadow-cyan-600 hover:p-3 text-justify text-white text-lg mt-10 ">
            En un mundo digital donde cada segundo cuenta, el contenido que
            compartes no puede pasar desapercibido. Nosotros transformamos tus
            ideas en estrategias creativas y visuales que capturan la atención y
            generan conexiones reales con tu audiencia. Desde diseños
            impactantes hasta mensajes que inspiran, te ayudamos a destacar en
            las redes sociales y hacer que lo que ofreces sea inolvidable. ¡Tu
            historia merece ser contada de manera única y poderosa!
          </div>
        </span>
      </main>
    </div>
  );
}
