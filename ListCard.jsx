import React from 'react'

function ListCard({ item }) {
    return (
        <div className=" w-full">
            {item}
            <hr className='my-2 border-gray-200 font-thin' />
        </div>
    )
}

export default ListCard