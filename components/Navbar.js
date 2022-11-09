import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.Navbar}>
            <div className={styles.Links}>
                <Link href='/' legacyBehavior><a style={{padding: '0 1.5rem'}}>Home</a></Link>
                <Link href='/api/apts' legacyBehavior><a style={{padding: '0 1.5rem'}}>API</a></Link>
                <Link href='/apts' legacyBehavior><a style={{padding: '0 1.5rem'}}>Stanovi</a></Link>
                <Link href='/apts/new' legacyBehavior><a style={{padding: '0 1.5rem'}}>Nova nekretnina</a></Link>
            </div>
            <div className='auth-btns'>
                <button>Prijavi se</button>
                <button>Odjavi se</button>
            </div>

        </div>
    )
}

export default Navbar