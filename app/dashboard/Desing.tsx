"use client";

import { useState } from "react";

export default function Desing() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-violet-700 rounded-lg p-2 w-[200px] justify-center text-white flex gap-2">
        generar post
        <button onClick={() => setOpen(true)} className={`${!open ? "flex" : "hidden"}`}>
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
        </button>
        <button onClick={() => setOpen(false)} className={`${!open ? "hidden" : "flex"}`}>
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          !open ? "hidden" : "w-[200px]"
        } bg-violet-600 rounded-md p-2 flex justify-between text-white`}
      >
        <span className="flex flex-col gap-1 items-start">
          <button>Mensaje de amor</button>
          <button>Promocion de producto</button>
          <button>Post inspiracional</button>
          <button>Anuncio de evento</button>
        </span>
      </div>
      
    </div>
  );
}
