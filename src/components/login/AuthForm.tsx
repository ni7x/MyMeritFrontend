import {FormEvent} from 'react'

const AuthForm = ({onSubmit, children}) : {onSubmit: (e: FormEvent<HTMLFormElement>) => void, children: JSX.Element | JSX.Element[]} => {
  return (
    <form className="flex flex-col gap-4"
     onSubmit={onSubmit}>{children}</form>

  )
}

export default AuthForm;