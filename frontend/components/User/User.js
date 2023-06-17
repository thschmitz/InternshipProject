import { UserRow } from "./UserRow"

export const User = ({userData}) => {
  return (
    <>
      <div className="flex-1 flex justify-center mt-10">
        <div className="sticky top-44 mx-5 h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline flex justify-center">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Users</p>
          {userData.map((user, index) => (
            <UserRow userData={user} key={index}/>
          ))}
        </div>
      </div>
      
    </>

  )
}