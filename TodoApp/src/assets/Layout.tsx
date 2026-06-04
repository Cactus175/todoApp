import {NavLink} from 'react-router-dom'

function Layout(){
    return(
        <div className='bg-gray-300 min-h-screen flex flex-row justify-center items-center'>
        <div className='w-2/3 bg-slate-900 min-h-[80vh] rounded-4xl border-2 border-gray-900 shadow-xl shadow-black/30 flex flex-row'>
          <section className='bg-indigo-800 w-1/4 min-h-[80vh] rounded-l-4xl border-r-4 border-indigo-500'>
            <nav className='flex flex-col w-full h-full justify-center items-center py-20'>
              <NavLink to="/" className='bg-indigo-500 w-full h-15 text-center flex items-center justify-center text-2xl font-mono'>Calendar</NavLink>
              <NavLink to="/Tasks" className='bg-indigo-800 w-full h-15 text-center flex items-center justify-center text-2xl font-mono'>Tasks</NavLink>
              <NavLink to="/Overview" className='bg-indigo-800 w-full h-15 text-center flex items-center justify-center text-2xl font-mono'>Overview</NavLink>
              <NavLink to="/About" className='bg-indigo-800 w-full h-15 text-center flex items-center justify-center text-2xl font-mono'>About</NavLink>
            </nav>
          </section>
          <section className='bg-slate-900 w-3/4 min-h-[80vh] rounded-r-4xl border-gray-900'>
          </section>
        </div>
      </div>
    );
}export default Layout;