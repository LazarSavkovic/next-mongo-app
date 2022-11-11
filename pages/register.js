import Head from 'next/head'
import AuthLayout from '../components/AuthLayout'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import {useState} from 'react'
import { useFormik } from 'formik'
import {registerValidate } from '../lib/validate'
import { useRouter } from 'next/router'

const Register =  () => {

    const [show, setShow] = useState({password: false, cpassword: false});
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit (values) {
        const options = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        }
        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('/')
            })

    }

    return(
        <AuthLayout>
            <Head>
                <title>Registruj se</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Registruj se</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface.</p>
                </div>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input
                            type='text'
                            name='username'
                            placeholder='Korisničko ime'
                            className={styles.input_text}
                            {...formik.getFieldProps('username')} />
                        <span className='icon flex items-center px-4' >
                            <HiOutlineUser size={25}/>
                        </span>
                    </div>
                    {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>}
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
                            type={show.password ? 'text' : 'password'}
                            name='password'
                            placeholder='Šifra'
                            className={styles.input_text}
                            {...formik.getFieldProps('password')} />
                                            <span className='icon flex items-center px-4' onClick={() => setShow({...show, password: !show.password})}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                    <div className={styles.input_group}>
                        <input
                            type={show.cpassword ? 'text' : 'password'}
                            name='cpassword'
                            placeholder='Potvrdite šifru '
                            className={styles.input_text}
                            {...formik.getFieldProps('cpassword')} />
                                            <span className='icon flex items-center px-4' onClick={() => setShow({...show, cpassword: !show.cpassword})}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
                    <div className={styles.button}>
                        <button type='submit'>
                            Registruj se
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    Imate nalog? <Link href='/login' legacyBehavior><a className='text-blue-700'>Prijavite se</a></Link>
                </p>
            </section>
        </AuthLayout>
    )
}

export default Register