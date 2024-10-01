"use client"
import React, { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="text-white  flex flex-col p-2 items-center rounded-lg bg-sky-950 w-auto divide-y divide-sky-400">
      <div className="flex flex-col gap-4 ">
        <div className={`${!open ? "w-full" : "w-[200px]"} flex flex-col gap-4 lg:w-[200px]`}>
          <div className="bg-violet-700 rounded-lg p-2 w-[25px] lg:w-[200px] justify-center text-white flex gap-2">
            <p className="hidden lg:flex">Generar Post</p>
            <button
              onClick={() => setOpen(true)}
              className={`${!open ? "flex" : "hidden"}`}
            >
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
            <button
              onClick={() => setOpen(false)}
              className={`${!open ? "hidden" : "flex"}`}
            >
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
            <span className="flex flex-col gap-3 items-start">
              <button className="hover:underline">Mensaje de amor</button>
              <button className="hover:underline">Promocion de producto</button>
              <button className="hover:underline">Post inspiracional</button>
              <button className="hover:underline">Anuncio de evento</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
