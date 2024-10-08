'use client'

import React from 'react'
import { Button } from "./ui/button"
import Image from 'next/image'
import { createDocument } from '@/lib/actions/room.actions'
import { useRouter } from 'next/navigation'

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {

  const router = useRouter()

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email })

      if (room) {
        router.push(`/documents/${room.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button 
      type='button' 
      onClick={addDocumentHandler} 
      className='flex items-center gap-2 p-2 shadow-md gradient-blue rounded-lg '
    >
      <Image
        src="/assets/icons/add.svg"
        alt="add"
        width={24}
        height={24}
        className='block'
      />
      <p className='hidden sm:block '>Start a blank document</p>
      <p className='md:hidden'>New Document </p>
    </Button>
  )
}

export default AddDocumentBtn