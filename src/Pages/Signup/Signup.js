import axios from 'axios'
import {useState, useContext, useRef, useEffect} from 'react'
// import {Container} from 'react-bootstrap'
import "./signup.css"
import { useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../../Context/UserContext'

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
// const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export default function Signup(){

    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/signin';
    const { setUser, setAuthEmail } = useContext(UserContext)

    // const [formData, setFormData] = useState({
    //     email: "",
    //     username: "",
    //     password: ""
    // })

    const [ email, setEmail ] = useState();
    const [ validEmail] = useState(false);
    const [ setEmailFocus ] = useState(false)

    const [ username, setUsername ] = useState();
    const [ validUsername] = useState(false);
    const [ setUsernameFocus ] = useState(false)

    const [ password, setPassword ] = useState();
    const [ validPassword ] = useState(false)
    const [ setPasswordFocus ] = useState(false)
    
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    // useEffect(() => {
    //     setValidUsername(USER_REGEX.test(username));
    // }, [username])

    // useEffect(() => {
    //     setValidPassword(PWD_REGEX.test(password));
    // }, [password])

    // useEffect(() => {
    //     setValidEmail(EMAIL_REGEX.test(email))
    // }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, email])

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        axios({
            method: 'post',
            url: "https://gokullsapp.herokuapp.com/signup",
            data: {
                username, password, email
            }
        }).then(res=>{
            console.log(res);
            setUser(res.data.result.username);
            setAuthEmail(res.data.result.email)
            navigate(from, {replace: true});
        })

//         const response = await axios.post('/signup',
//             JSON.stringify({ username, password, email }),
//             {
//                 headers: {'Content-Type': 'application/json'},
//                 withCredentials: true
//             }
//         )
//         setUser(response.data.result.username)
//         setAuthEmail(response.data.result.email)
//         navigate(from, {replace: true})
    }

    function navigateSignin(){
        navigate('/signin')
    }

    return(
        <div className='signup-box'>
            <div className="signup-container">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>SIGN UP</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        ref={userRef}
                        autoComplete='off' 
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"                            
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    {/* <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p> */}
                    <input
                        type="text" 
                        name="username" 
                        autoComplete="off"
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required                        
                        aria-invalid={validUsername ? "false" : "true"}
                        aria-describedby="uidnote"  
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                    />
                    {/* <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p> */}
                    <input 
                        type="password" 
                        name="password" 
                        autoComplete="off"
                        placeholder="Password" 
                        onChange= {(e) => setPassword(e.target.value)}
                        value= {password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    {/* <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p> */}
                    <button> SIGN UP</button>
                </form>
                <p>Don't have an account? <span onClick={navigateSignin}>SignIn</span></p>
            </div>
        </div>
    )
}
