type childrenProps = {
  children: JSX.Element | JSX.Element[]
}

const AuthBox = ({children}: childrenProps) => {
  return (
    <div className="py-6 px-5 bg-secondary-bg-color rounded-2xl w-72 select-none login-box">{children}</div>
  )
}

export default AuthBox;