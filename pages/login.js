import Head from 'next/head'
import AuthLayout from '../components/AuthLayout'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import {useState} from 'react'
import { signIn, signOut} from 'next-auth/react'
import {useFormik} from 'formik'
import {loginValidate}  from '../lib/validate'
import { Router, useRouter } from 'next/router'

const Login = () => {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        },
        validate: loginValidate,
        onSubmit
    });
    async function onSubmit(values){
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        })

        if(status.ok) router.push(status.url)
    }

    async function handleGoogleSignIn() {
        signIn('google', {callbackUrl: 'http://localhost:3000/'})
    }

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
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            name='email'
                            placeholder='E-mail'
                            className={styles.input_text}
                            {...formik.getFieldProps('email')} />
                        <span className='icon flex items-center px-4' >
                            <HiAtSymbol size={25}/>
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
                    <div className={styles.input_group}>
                        <input
                            type={show ? 'text' : 'password'}
                            name='password'
                            placeholder='Šifra'
                            className={styles.input_text} 
                            {...formik.getFieldProps('password')} />
                                            <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.email ? <span  className='text-rose-500'>{formik.errors.password}</span> : <></>}
                    <div className={styles.button}>
                        <button type='submit'>
                            Prijavi se
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' onClick={handleGoogleSignIn} className={styles.button_custom}>
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