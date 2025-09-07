import Image from "next/image";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { Newspaper } from "lucide-react";
import { redirect } from "next/navigation";

export default function Header() {
  function linkTo(path: string) {}
  return (
    <h2 className="text-5xl leading-loose p-4 font-bold flex justify-between items-center">
      <Link href="/">
        <Image
          className="rounded-xl"
          src="https://avatars.githubusercontent.com/u/12699258?s=200"
          alt="Picture of the author"
          width={60}
          height={60}
        ></Image>
      </Link>

      <div className="inline-flex">
        <Link href="/articles" className="inline-flex">
          <Button variant="ghost">
            <Newspaper></Newspaper>
          </Button>
        </Link>
        <ModeToggle></ModeToggle>
      </div>
    </h2>
  );
}
