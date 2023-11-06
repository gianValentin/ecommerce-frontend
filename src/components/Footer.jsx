import Image from 'next/image'
import React from 'react'

function Footer() {
    return (
        <div className=" bg-gray-900">
            <div className="max-w-2xl mx-auto text-white py-5 mt-16">
                {/* <div className="text-center">
                    <p className="text-md "> Aplicacion Demo cliente de E-commerce </p>
                    <p> Creado por: Giancarlo Brian Valentin Zevallos</p>                    
                </div> */}
                <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                    <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; Giancarlo Development, 2023. </p>
                    <div className="order-1 md:order-2">
                        <span className="px-2">Mi Portafolio</span>
                        <span className="px-2 border-l">Github</span>
                        <span className="px-2 border-l">Linkedin</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;