// /components/Sidebar.tsx
import Link from 'next/link';
import { GiApolloCapsule } from "react-icons/gi";
import {FaUserAstronaut} from "react-icons/fa6";

const Sidebar = () => {
    return (
        <aside className='bg-slate-100 w-64 p-5'>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li className='m-5'><Link href="/properties" className='flex'><GiApolloCapsule className='text-2xl mr-2'></GiApolloCapsule>Propiedades</Link></li>
                <li className='m-5'><Link href="/contacts" className='flex'><FaUserAstronaut className='text-2xl mr-2'></FaUserAstronaut>Contactos</Link></li>
                <li className='m-5'><Link href="/users">Usuarios</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
