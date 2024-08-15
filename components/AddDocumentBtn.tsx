'use client'

import React from 'react'
import { Button } from "./ui/button"
import Image from 'next/image'

const AddDocumentBtn = ({userId, email} : AddDocumentBtnProps) => {
    const addDocumentHandler = async () => {
      
    }


  return (
    <Button type='submit' onClick={addDocumentHandler} className='gradient-blue flex gap-1 shadow-md '>
        <Image
            src="/assets/icons/add.svg"
            alt="add"
            width={24}
            height={24}
            className='hidden sm:block'
        /> 
        <p className='hidden sm:block '>Start a new document</p>
    </Button>
  )
}

export default AddDocumentBtn
