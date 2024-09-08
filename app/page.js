"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { RiAttachment2 } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { genereate_music, upload_file_and_context } from "./api/api";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [prompt, setprompt] = useState("");
  const [music, setmusic] = useState([]);
  const [video, setvideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading_text, setloading_text] = useState("Cooking Up the Tunes 🔥...");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handel_music = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setloading_text("Fetching Your Tunes. 🎶..");
    }, 5000);
    setTimeout(() => {
      setloading_text("Creating The Visuals💫...");
    }, 10000);
    setTimeout(() => {
      setloading_text("Almost There, Putting em all Together 🛠️...");
    }, 25000);

    const response = await genereate_music(data);
    setmusic(response.image_files);
    setvideo(response.video_files);
    setLoading(false);
  };

  useEffect(() => {
    if (music.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % music.length);
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [music]);

  useEffect(() => {
    console.log("Current Image Index:", currentImageIndex);
    console.log("Music Array:", music);
  }, [currentImageIndex, music]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    if (!prompt) return;

    

    const response = await upload_file_and_context(file, prompt);
    if (response.ok) {
      const data = await response.json();
      setmusic(data.image_files);
      setvideo(data.video_files);
    } else {
      console.error("File upload failed");
    }
  };

  return (
    <main className="bg-black min-h-screen w-screen flex flex-col justify-between items-center pb-4">
      <header className="text-white px-[25%] py-10 pt-16 flex justify-between items-start header-bg w-screen">
        <h1 className="text-7xl">EchoZ</h1>
        <p className="text-3xl pt-12">
          Where <span className="text-[rgba(252,0,91,1)]">Music</span> <br />
          Meets Knowledge
        </p>
      </header>
      <section className="w-screen h-[80%] flex gap-8 relative justify-center items-center text-white">
        {loading ? (
          <div className="flex flex-col justify-center items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <video src="/ani.webm" className="w-56" autoPlay loop muted />
            <p className="text-xl mt-4">{loading_text}</p>
          </div>
        ) : video ? (
          <video
            muted
            autoPlay
            controls
            src={`${video}`}
            className="w-[500px] h-[500px]"
          />
        ) : (
          <div className="w-[500px] h-[500px] rounded-md flex justify-center items-center"></div>
        )}
        <div className="relative h-[500px] w-[500px]">
          <AnimatePresence>
            {music.length > 0 &&
              music.map((img, index) =>
                index === currentImageIndex ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="absolute top-0 left-0 h-full w-full rounded-md"
                  >
                    <img
                      className="w-[500px] h-[500px] object-cover rounded-md"
                      src={`http://192.168.1.92:8000/${img}`}
                      alt={`Image ${index}`}
                    />
                  </motion.div>
                ) : null
              )}
          </AnimatePresence>
        </div>
      </section>
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
        <span className="flex justify-start items-center absolute inset-y-0 right-0 pr-3 z-10">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <RiAttachment2 className="text-white text-2xl mr-2" />
          </label>
          <button type="button" onClick={() => handel_music(prompt)}>
            <IoMdSend className="text-white text-xl mr-4" />
          </button>
        </span>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          
          <div className="bg-white/90 p-4 rounded shadow-lg">
          <motion.video
          animate={{delay: 3}}
          src="/ani2.webm" className="w-56" autoPlay loop muted></motion.video>
            <p className="text-center">File uploaded successfully!</p>
          </div>
        </div>
      )}
    </main>
  );
}