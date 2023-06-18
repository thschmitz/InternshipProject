import { ChevronUpIcon } from '@heroicons/react/solid'
import Link from "next/link"

export const UserRow = ({userData , key}) => {
  return(
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2">
    <p>{key}</p>
    <ChevronUpIcon className="h-4 w-4 flex-schrink-0 text-green-400"/>
    <div className="flex h-11 w-11 -mr-2">
      <img src={userData?.image} className="rounded-full object-cover"/>
    </div>
    <p className="flex-1 truncate">{userData.name}</p>
    <Link href={`/profile/${userData?.id}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
          View
        </div>
    </Link>

</div>
  )
}