'use client'
 

import { useAuthStore } from '@/store/auth-store'
import { useDisconnect } from 'wagmi'

export default function Home() {
  
  // const { data: hash, sendTransaction, isLoading: isSending } = useSendTransaction()

   const {disconnect}= useDisconnect();
 const {address,email,logout, isAuthenticated} = useAuthStore()

  return (
    <div className="flex items-center flex-col justify-center h-screen w-screen">
     

   {isAuthenticated? <>
    <h1>connected</h1>
    <h1>{address}</h1>
    <h1>{email}</h1>
    <button onClick={logout}>logout</button>
    </>

   :<h1>disconnected</h1>}

   se
   <button   onClick={()=>disconnect()}>disconnect</button>
   
</div>
  )
}
