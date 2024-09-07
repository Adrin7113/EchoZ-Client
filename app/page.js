import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black h-screen w-screen flex flex-col justify-between items-center">
      <header className="text-white px-[25%] flex flex-col justify-center header-bg h-[20%] w-screen">
        <h1 className="text-7xl font-semibold">EchoZ</h1>
        <p className="text-3xl italic">Where Music Meets Knowledge</p>
      </header>
      <div className="flex gap-[15rem]">
        <div className="bg-green-300 w-[400px] h-[500px]"></div>

        <div className="bg-green-300 w-[400px] h-[500px]"></div>
      </div>
      <div className="gradient-border w-1/2 h-12 mb-10">
        <input
          type="text"
          placeholder="What would you have me sing today? 😊"
          className="bg-[#202020] h-12 rounded-lg focus:outline-none px-4 py-2 text-white placeholder:text-white/80"
        />
      </div>
    </main>
  );
}
