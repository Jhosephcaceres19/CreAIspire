import React from "react";

export default function Sidebar() {
  return (
    <div className="text-white shadow-xl shadow-sky-800 flex flex-col w-44 gap-3 p-2 justify-center rounded-lg bg-sky-950 h-auto divide-y divide-sky-400">
      <div className="">
        <div className="flex flex-row-reverse gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            className="rounded-md p-1 w-28 border-black"
          />
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          Seleccionar
        </div>
      </div>
      <div className="flex-row-reverse">contenido de selecionado</div>
    </div>
  );
}
