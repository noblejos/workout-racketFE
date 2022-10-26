import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
// import { useAuthContext } from '../hooks/useAuthContext'
import { AuthContext } from '../context/AuthContext'
import { useContext, useRef } from 'react'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useContext(AuthContext)
  const navRef = useRef();
  // console.log(router.asPath);
  const showNavBar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      
        <div className='nav'>
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
        <ul className='flow' ref={navRef}>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <img
              className={'nav_btn nav_close_btn'}
              src="/close1.svg"
              alt='close'
              // style={{ filter: "invert(100%)" }}
              onClick={showNavBar}
            />
            </div>
            
          )}
          {!user && (
           <div>
              <li className='tabs'>
              <Link to="/login">Login</Link>

              </li>
              <li className='tabs'>
              <Link to="/signup">Signup</Link>
              </li>
              <img
              className={'nav_btn nav_close_btn'}
              src="/close1.svg"
              alt='close'
              // style={{ filter: "invert(100%)" }}
              onClick={showNavBar}
            />
              </div>
          )}
         
         </ul>
        </nav>
        <div className={'nav_btn'} onClick={showNavBar}>
            <div className={'one'}></div>
            <div className={'two'}></div>
            <div className={'three'}></div>
          </div>
          </div>
      
    </header>
  )
}

export default Navbar