import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);


  const providers = [
    { name: 'NID', path: '/nid' },
  ];

  const hybrid = [
    { name: 'DARS', path: '/dars' },
    { name: 'MOR', path: '/mor' },
    { name: 'MOTRI', path: '/motri' },
    { name: 'EAES', path: '/eaes' },
  ];

  const consumers = [
    { name: 'MOLS', path: '/mols' },
    { name: 'MFA', path: '/mfa' },
    { name: 'Immigration', path: '/immigration' },
  ];

  // New category "Process" with a new menu item "Mesob test"
  const process = [
    { name: 'Mesob test', path: '/mesob' },
  ];

  return (
    <div className="flex">
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto bg-gray-900 text-white lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-lg font-bold">APISIX Demo Portal</h1>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            ☰
          </button>
        </div>

        <nav className="mt-4">
          <ul>
            {/* Providers Section */}
            <li className="px-6 py-2 text-gray-400 text-sm">Providers</li>
            {providers.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  className={`block px-6 py-3 transition duration-200 hover:bg-gray-700 ${pathname === menu.path ? 'bg-gray-700' : ''
                    }`}
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
            <hr className="border-gray-600 my-2" />

            {/* Hybrid Section */}
            <li className="px-6 py-2 text-gray-400 text-sm">Hybrid</li>
            {hybrid.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  className={`block px-6 py-3 transition duration-200 hover:bg-gray-700 ${pathname === menu.path ? 'bg-gray-700' : ''
                    }`}
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
            <hr className="border-gray-600 my-2" />

            {/* Consumers Section */}
            <li className="px-6 py-2 text-gray-400 text-sm">Consumers</li>
            {consumers.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  className={`block px-6 py-3 transition duration-200 hover:bg-gray-700 ${pathname === menu.path ? 'bg-gray-700' : ''
                    }`}
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
            <hr className="border-gray-600 my-2" />

            {/* Process Section */}
            <li className="px-6 py-2 text-gray-400 text-sm">Process</li>
            {process.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  className={`block px-6 py-3 transition duration-200 hover:bg-gray-700 ${pathname === menu.path ? 'bg-gray-700' : ''
                    }`}
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
