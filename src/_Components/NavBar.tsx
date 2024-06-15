"use client";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};
const TopNav = ({ className }: Props) => {
  const router = useRouter();
  return (
    <header className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between border-b-[1px] border-neutral-900 bg-black/40 px-4 py-4 backdrop-blur-lg">
      <aside className="flex items-center gap-[2px]">
        <Image src="/Logodropdown.png" width={100} height={100} alt=""></Image>
      </aside>
      <nav className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] transform md:block"></nav>
    </header>
  );
};

export default TopNav;
