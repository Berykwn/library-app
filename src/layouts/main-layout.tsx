import { ReactNode } from "react";

import Navbar from "../components/navbar";

interface Props {
  children: ReactNode;
  centerY?: boolean;
  centerX?: boolean;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full sticky top-0 bg-white/90 dark:bg-black/90 z-50">
        <Navbar />
      </header>
      <main className="flex-1 lg:px-20 md:px-12 px-6 mt-3 bg-white dark:bg-slate-950">
        {children}
      </main>
      <footer
        className="bg-white lg:px-24 px-6 py-8 shadow-lg dark:bg-slate-950 dark:text-neutral-400"
        style={{ minHeight: "100px" }}
      >
        <p>{new Date().getFullYear()} BookQuest. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
