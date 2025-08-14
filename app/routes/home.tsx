import type { Route } from "./+types/home";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fast React Pizza Co." },
    { name: "description", content: "Simple React Pizza App" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col m-auto h-screen m-w-[80rem] gap-5">
      <header className="uppercase text-amber-200 w-full text-center">
        <h1 className="text-4xl">- Fast React Pizza Co. -</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-2xl">
        <div className="text-center flex flex-col gap-4">
          <p>We're open from 12:00 to 22:00. Come visit us or order online.</p>
          <button className="btn btn-yellow">Order</button>
        </div>
      </footer>
    </div>
  );
}
