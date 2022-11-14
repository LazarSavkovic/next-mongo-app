import React, { useState } from 'react'
import Button from './Button';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'



const Nav = () => {
    let Links = [
        { name: "POČETNA", link: "/" },
        { name: "MOJE NEKRETNINE", link: "/flats" },
        { name: "TRŽIŠTE", link: "/apts" },
        { name: "NOVA NEKRETNINA", link: "/apts/new" },
        { name: "KONTAKT", link: "/" },
    ];
    let [open, setOpen] = useState(false);

    const { data: session } = useSession();
    function handleSignOut() {
        signOut()
      }
    const router = useRouter();

    function goToLogin() {
        router.push('/login')
    }
    function goToRegister() {
        router.push('/register')
    }
    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                <div className='font-bold text-xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
                    <span className='text-2xl text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="logo-ionic"></ion-icon>
                    </span>
                    PROCENA/NEKRETNINE
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='md:ml-8 text-l md:my-0 my-7'>
                                <Link href={link.link} legacyBehavior><a className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a></Link>
                            </li>
                        ))
                    }{session ? 
                        <Button function={handleSignOut}>ODJAVI SE</Button> : 
                        <><Button function={goToLogin}>PRIJAVI SE</Button>
                        <Button function={goToRegister}>REGISTRUJ SE</Button></>}

                </ul>
            </div>
        </div>
    )
}

export default Nav