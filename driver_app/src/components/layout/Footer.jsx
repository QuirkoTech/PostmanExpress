import React from 'react';
import { Copyright, Facebook, Instagram, TwitterIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';



const FooterArray = [
    { icon: TwitterIcon, name: 'Postman.Express Instagram'},
    { icon: Facebook, name: 'Postman.Express Facebook' },
    { icon: Instagram, name: 'Postman.Express Instagram' },
    

  ];

const Footer = () => {
    return (
        <footer className='flex justify-between mt-auto mx-10 mb-8 border-t-2 border-solid border-[#494844]'>
                <div className='mt-8 '>
                
                    {FooterArray.map((item, index) => (
                        <div className='flex flex-row my-4' key={index}>
                            <item.icon size={20} /> 
                            <NavLink to="/" className='ml-2 text-sm'>{item.name}</NavLink>   
                        </div>     
                    ))}

                </div>
                    <div className="flex flex-col mt-8 justify-center">
                        
                            <span className='mb-1'>Project's Github</span>
                            <span className='flex flex-row items-center'>
                                
                                    <span className='mr-1'>Copyright</span>
                                <Copyright size={14}/>
                                
                            </span>
                    
                        
                    </div>
        </footer>
    );
};

export default Footer;




