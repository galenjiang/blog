import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="!z-5 relative flex flex-col rounded-3xl max-w-[300px] md:max-w-[400px] bg-white dark:bg-gray-900 bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-6 3xl:p-![18px]">
          <div className="my-3">
            {/* <Input id="username" label="用户名" placeholder="username" ></Input> */}
          </div>
          <div className="mb-3">
            {/* <Input id="password" label="密码" type="password" placeholder="password" ></Input> */}
          </div>

          <div className="flex justify-end">
            <Link href="/">
              {/* <Button type="primary">登录</Button> */}
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
