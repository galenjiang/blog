"use client";

import dayjs from "dayjs";

function Footer() {
  const now = dayjs().format("YYYY");
  return (
    <footer className="text-center w-full my-8">
      <div>© {now}, Built with Nextjs</div>
    </footer>
  );
}

export default Footer;
