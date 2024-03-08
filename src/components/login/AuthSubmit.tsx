import React from 'react'

const AuthSubmit = ({children}: {children: string}) => {
  return (
    <button className=" p-4 rounded bg-[#06a58f] border-none text-white font-bold text-sm cursor-pointer transition-colors duration-200 ease-linear hover:bg-[#057767]" type="submit">{children}</button>
    )
}

export default AuthSubmit