import Logo from '../Logo';
import NotificationButton from './NotificationButton';
import UserMenu from './UserMenu';

function NavBar() {
  return (
    <nav className="bg-primary font-sans">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start sm:ml-0 ">
            <Logo />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NotificationButton />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
