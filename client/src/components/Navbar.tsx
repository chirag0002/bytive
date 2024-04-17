import { Link } from 'react-router-dom';

export const Navbar = () => {

    return <div className="border-b flex justify-between px-10 py-4 shadow-xl">
        <Link to="/" className="cursor-pointerflex flex justify-center flex-row items-center font-extrabold text-xl">
            <img className="w-6 h-6 mr-3" src="/logo.png" alt="" />
            <div>Bytive</div>
        </Link>
        <div className='flex gap-5 items-center justify-center text-gray-500 font-bold'>

            <div className='border-2 border-gray-300 shadow-2xl px-4 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
                Browse Students
            </div>

            <div className='border-2 border-gray-300 shadow-2xl px-4 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
                EditProfile
            </div>

            <div className='border-2 border-gray-300 shadow-2xl px-4 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
                Log Out
            </div>
                
        </div>
    </div>
}