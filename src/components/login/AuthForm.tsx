import {FormEvent} from 'react'

interface AuthFormProps {
    handleSubmit: (event: FormEvent) => void;
    children: JSX.Element | JSX.Element[];
}

const AuthForm = ({handleSubmit, children}:AuthFormProps) => {
  return (
    <form className="flex flex-col gap-4"
     onSubmit={handleSubmit}>{children}</form>

  )
}

export default AuthForm;