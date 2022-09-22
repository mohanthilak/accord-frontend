import { useState } from 'react'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import Chat from './Pages/Chat/Chat'
import PersistLogin from './Pages/PersistLogin'
import UserContext from './Context/UserContext'
import { AuthProvider } from './Context/AuthProvider'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import { ChatProvider } from './Context/ChatContext'
import io from 'socket.io-client'
const socket = io.connect("https://gokullsapp.herokuapp.com/")

export default function App(){

    const [ user, setUser ] = useState(localStorage.getItem('username') || '')
    const [ authEmail, setAuthEmail ] = useState() 
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    return(
       <Router>
            <AuthProvider>
                <ChatProvider>
                    <UserContext.Provider value={{ user, setUser, authEmail, setAuthEmail, isLoggedIn, setIsLoggedIn }}>
                        <Routes>
                            <Route path='*' element={<Navigate to="/channels" replace/>} />
                            <Route path='/Signin' element={<Signin/>} />
                            <Route path='/signup' element={<Signup/>} />

                            <Route element={<PersistLogin/>}>   
                                <Route path='channels' element={<Chat socket={socket}/>} />
                                <Route path='channels/:serverId' element={<Chat socket={socket}/>} />
                                <Route path='channels/:serverId/:channelId' element={<Chat socket={socket}/>} />
                            </Route>
                        </Routes>
                    </UserContext.Provider>
                </ChatProvider>
            </AuthProvider>
       </Router>
    )
}
