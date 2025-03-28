import { auth, signIn, signOut } from "@/auth"
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

const Navbar = async() => {
    const session=await auth();
    console.log(session)
  return (
    <header>
        <nav className="bg-slate-600 px-5 py-4 flex justify-between items-center">
            <div>
                <Link href="/">
                    <img src="/logo.png" alt="logo" width={140} height={140}/>
                </Link>
            </div>
            <div className="">
                {
                    session && session?.user ? (
                        <div className="flex gap-10 items-center">
                            <div>
                                <Link href="/startup/create">
                                create
                                </Link>
                            </div>
                            <div>
                                <form action={async()=>{
                                        "use server"
                                        await signOut()
                                    }}>
                                        <button
                                        type="submit"
                                        className="cursor-pointer"
                                        >Logout</button>
                                </form>

                            </div>
                            <div>
                                    <Link href={`/user/${session?.user?.name}`} >
                                    {session?.user?.image ?<img src={session?.user?.image  } alt="pp" className="rounded-full size-8"/>:<RxAvatar className="rounded-full size-8" /> }
                                    
                                    </Link>
                            </div>
                        </div>
                    ):
                    (
                        <div>
                            <div>
                            
                                <form action={async()=>{
                                    "use server"
                                    await signIn('github')
                                }}>
                                    <button
                                    type="submit"
                                    className="cursor-pointer"
                                    >sign in</button>
                                </form>
                            </div>
                        </div>
                    )
                }

            </div>

        </nav>
    </header>
  )
}
export default Navbar