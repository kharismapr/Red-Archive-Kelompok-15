import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import Icon from '../assets/Popfilm.svg';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="bg-[#BE3C44] text-white lg:w-1/2 p-6 sm:p-8 md:p-12 lg:p-24 flex flex-col justify-center items-center">
                <div className="flex items-center mb-6 sm:mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Welcome To</h1>
                </div>
                <img src={Icon} alt="PopFilm" className="h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64 mb-6 sm:mb-6" />
                <img src={Logo} alt="Logo" className="h-20 w-60 sm:h-16 sm:w-64 md:h-18 md:w-72 max-w-full object-contain" />
            </div>

            {/* Login Form */}
            <div className="lg:w-1/2 p-6 sm:p-8 md:p-12 lg:p-24 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-[#BE3C44] text-center">Login</h3>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-3 sm:p-4 rounded-lg border-2 border-[#BE3C44] focus:outline-none focus:border-[#BE3C44] focus:ring focus:ring-[#BE3C44]/20 text-sm sm:text-base"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full p-3 sm:p-4 rounded-lg border-2 border-[#BE3C44] focus:outline-none focus:border-[#BE3C44] focus:ring focus:ring-[#BE3C44]/20 text-sm sm:text-base"
                        required
                    />
                    <button
                        type="button"
                        className="w-full py-3 sm:py-4 bg-[#BE3C44] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm sm:text-base"
                        onClick={() => navigate('/home')}
                    >
                        Login
                    </button>

                    <p className="text-center text-sm sm:text-base text-[#BE3C44]">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold hover:underline">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}