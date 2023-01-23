import DisplayUser from "components/DisplayUser"
type IUser = {
  id: String,
  name: String,
  email: String,
}


export default function Home() {
  const user:IUser = {
    id: "1",
    name: "Thomas",
    email: "thomas.henrique.schmitz@gmail.com"
  }
  return (
    <>
      <DisplayUser id={user.id} name={user.name} email={user.email}/>
    </>
  )
}
