import { NavLink } from 'react-router-dom';
import logo from '../assets/chibgu.png';

const Navbar = ({userFirstName}) => {
  const LinkclassName = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4 h-full" href="/index.html">
              <img
                className="h-10 w-auto"
                src={ logo }
                alt="React Jobs"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >Тех. Поддержка</span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={LinkclassName }
                >
                  Дела
                </NavLink>
                <NavLink
                  to="/make-request"
                  className={LinkclassName}
                >
                  Запрос
                </NavLink>
                
                { (userFirstName == '')?
                (<NavLink
                  to="/sign-in"
                  className={LinkclassName}
                >
                  Войти
                </NavLink>)
                : (
                  <>
                  <NavLink
                  to="/profile"
                  className={LinkclassName}
                >
                  { userFirstName  }
                </NavLink>
                </>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;