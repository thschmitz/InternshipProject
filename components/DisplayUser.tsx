type IUser = {
  id?: String,
  name?: String,
  email?: String,
}

const DisplayUser = ({id, name, email}: IUser) => {
  return (
    <>
      <p>{id}</p>
      <p>{name}</p>
      <p>{email}</p>
    </>
  )
}


export default DisplayUser;