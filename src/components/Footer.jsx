import React from 'react'

function Footer() {
    return (
        <div className="py-1 absolute bottom-0 w-full bg-gray-900">
            <div className="max-w-2xl mx-auto text-white py-5">                
                <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                    <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; Giancarlo Development, 2023. </p>
                    <div className="order-1 md:order-2">
                        <a className="px-2 hover:text-indigo-600" href='https://portfolio-jet-two-25.vercel.app/' target='_blank'>Mi Portafolio</a>
                        <a href='https://github.com/gianValentin' target='_blank' className="px-2 border-l hover:text-indigo-600">Github</a>
                        <a href='www.linkedin.com/in/giancarlobrianvalentinzevallos' target='_blank' className="px-2 border-l hover:text-indigo-600">Linkedin</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;