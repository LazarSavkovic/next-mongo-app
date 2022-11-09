import Head from 'next/head'
import AuthLayout from '../components/AuthLayout'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import {useState} from 'react'

const Login = () => {
    const [show, setShow] = useState(false)

    return (
        <AuthLayout>
            <Head>
                <title>Prijavi se</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Prijavi se</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface.</p>
                </div>
                <form className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            name='email'
                            placeholder='E-mail'
                            className={styles.input_text} />
                        <span className='icon flex items-center px-4' >
                            <HiAtSymbol size={25}/>
                        </span>
                    </div>

                    <div className={styles.input_group}>
                        <input
                            type={show ? 'text' : 'password'}
                            name='password'
                            placeholder='Šifra'
                            className={styles.input_text} />
                                            <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    <div className={styles.button}>
                        <button type='submit'>
                            Prijavi se
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom}>
                            Prijavi se sa Google nalogom <Image src='/images/google.svg' width='20' height='20'></Image>
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom}>
                            Prijavi se sa Github nalogom <Image src='/images/github.svg' width='25' height='25'></Image>
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    Nemate nalog? <Link href='/register' legacyBehavior><a className='text-blue-700'>Registruj se</a></Link>
                </p>
            </section>
        </AuthLayout>
    )
}

export default Login