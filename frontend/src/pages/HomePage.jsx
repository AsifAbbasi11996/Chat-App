import { useChatStore } from '../store/useChatStore'

import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className='bg-base-200 h-screen'>
      <div className='flex justify-center items-center px-4 pt-20'>
        <div className='bg-base-100 shadow-cl rounded-lg w-full max-w-8xl h-[calc(100vh-7rem)]'>
          <div className='flex rounded-lg h-full w-full overflow-hidden'>
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage
