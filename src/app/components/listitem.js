"use client"
import Link from 'next/link'
import React from 'react'
import { Popover } from 'react-tiny-popover'
import { useRef, useState } from 'react';


const Listitem = ({item}) => {
  const [hoveredItem,setHoveredItem]=useState('')
  const imgRef=useRef()
  const [isPopoverOpen,setIsPopoverOpen]=useState(false)

  return (
    <>
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className='flex items-center justify-center'>
        <Popover ref={imgRef}
        isOpen={isPopoverOpen}
             align='center'
             positions={['bottom']}
             content={<div className='w-max p-4 absolute shadow rounded-lg bg-black border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>Hey bana bir bak !</div>}
        >
        <img className="rounded-t-lg cursor-pointer object-none" 
        style= {{
           height:"150px"
        }}
        onClick={()=>{
          setHoveredItem(item.info.cries.latest)
        }}
        onMouseLeave={()=>{
          setHoveredItem('')
          imgRef.current.src=item.info.sprites.other.showdown.back_shiny
        }}
        onMouseEnter={()=>{
          imgRef.current.src=item.info.sprites.other.showdown.front_shiny
           setIsPopoverOpen(!isPopoverOpen)
        }}
        src={item.info.sprites.other.showdown[hoveredItem===item.info.cries.latest? 'front_shiny' : 'back_shiny']} alt="" />
        </Popover>
    </div>
    <div className="p-5">
        <span>
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              {item.name.toUpperCase()}
            </h5>
        </span>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.info.types.map((type,index)=>{
             return index===item.info.types.length-1 ? type.type.name:type.type.name+','
          })}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Weight: {item.info.weight}kg
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Height: {item.info.height}m
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <Link href={`/pokemon/${item.info.id}`}
        className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
            Daha Fazla 
        </Link>
    </div>
</div>
{hoveredItem && (
                <audio  style={{display:'none'}} autoPlay={true} src={hoveredItem}/>
            )}
    </>
  )
}

export default Listitem