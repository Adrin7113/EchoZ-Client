"use client";
import Image from "next/image";
import { RiAttachment2 } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { genereate_music } from "./api/api";
import { useState } from "react";
export default function Home() {

  const [prompt, setprompt] = useState("")

  return (
    <main className="bg-black h-screen w-screen flex flex-col justify-between items-center pb-4">
      <header className="text-white px-[25%] py-10 pt-16 flex justify-between items-start header-bg w-screen">
        <h1 className="text-7xl">EchoZ</h1>
        <p className="text-3xl  pt-12">Where  <span className="text-[rgba(252,0,91,1)]">Music</span> <br />Meets Knowledge</p>
      </header>
      <div className="relative w-[80%] rounded-md p-2 md-10">
            <div className="focus-within:bg-gradient-to-r focus-within:from-red-500 focus-within:via-purple-500 focus-within:to-blue-500 p-[2px] rounded-md">
        <input
        value={prompt}
        onChange={(e) => setprompt(e.target.value)}
          type="text"
          placeholder="What would you like me to sing?.."
          className="w-full py-4 pl-4 pr-10 text-white bg-gray-800 rounded-md outline-none focus:ring-0"
        />
      </div>
      <button  className="absolute inset-y-0 right-0 flex items-center pr-3 z-10 hover:bg-red-200">
        <RiAttachment2 onClick={console.log} className="text-white text-2xl mr-2" />
    <IoMdSend onClick={()=>{console.log("clicked");genereate_music(prompt)}} className="text-white text-xl mr-4" />
      </button>
    </div>

    </main>
  );
}
