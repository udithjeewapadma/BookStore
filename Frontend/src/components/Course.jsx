import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios';
import {Link} from 'react-router-dom'

function Course() {
    const [book, setBook] = useState([])
    useEffect(()=> {
        const getBook =async()=>{
            try {
                const res = await axios.get("http://localhost:4001/book");
                console.log(res.data)
                setBook(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBook();
    }, [])
  return (
    <>
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 '> 
            <div className='mt-22 justify-center items-center text-center'>
                <h1 className='text 2xl md:text-4xl'>
                    We are delighted to have you <span className='text-purple-500'> Here!!!!</span>
                </h1>
                <p className='mt-12'>
                Thank you for choosing our course! We are thrilled to have you embark on this educational journey with us. Our course is designed to provide you with valuable knowledge and skills, tailored to help you succeed in your field. We hope you find this learning experience enriching and rewarding. Welcome aboard, and happy learning!
                </p>
                    <Link to = '/'>
                        <button className='mt-5 bg-purple-500 text-white px-4 py-2 rounded-md hover: bg-purple-800 duration-300'>Back</button>
                    </Link>
            </div>
            <div className='mt-12 grid grid-cols-1 md:grid-cols-3'>
                {
                    book.map((item)=>(
                        <Cards key={item.id} item ={item}/>
                    ))
                }
            </div>
        </div>
    </>

  )
}

export default Course