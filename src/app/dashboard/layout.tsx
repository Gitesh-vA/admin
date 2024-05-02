"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SetStateAction, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const [active, setActive] = useState(1)
    const [open, setOpen] = useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
  
    const handleLogout = () => {
        alert('logged out');
        localStorage.removeItem('adminToken')
        router.push('/login')
    }

    const handleActiveChange = (data: SetStateAction<number>) => {
        setActive(data)
    }

    return (
        <>
            <div className="preloader flex-column justify-content-center align-items-center">
                <img className="animation__shake" src="img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
            </div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                            <i className="fas fa-search"></i>
                        </a>
                    </li>

                    <li className="nav-item">
                        <div onClick={() => handleLogout()}>
                            Logout
                        </div>
                    </li>
                </ul>
            </nav>

            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a className="brand-link">
                    <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                    <span className="brand-text font-weight-light">Admin Panel</span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a className="d-block">Gitesh Yadav</a>
                        </div>
                    </div>

                    {/* <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div> */}

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open" onClick={() => handleActiveChange(1)}>
                                <div className={active == 1 ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        <Link href={'/dashboard/home'}>
                                            Dashboard
                                        </Link>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </div>
                            </li>

                            <li className="nav-item menu-open" onClick={() => handleActiveChange(2)}>
                                <div className={active == 2 ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        <Link href={'/dashboard/profile'}>
                                            Profile
                                        </Link>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </div>
                            </li>

                            {/* <li className="nav-item menu-open" onClick={() => handleActiveChange(3)}>
                                <div className={active == 3 ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        <Link href={'/dashboard/Category'}>
                                            Category
                                        </Link>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </div>
                            </li> */}
                            <li className="nav-item menu-open" onClick={() => handleActiveChange(3)}>
                                <div className={active == 3 ? "nav-link active" : "nav-link"}>
                                    <ListItemButton onClick={handleClick}>
                                            <ListItemText primary="Category" />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </div>
                            </li>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                <li className="nav-item menu-open" onClick={() => handleActiveChange(3)}>
                                    <div className = "nav-link">
                                        <Link href={'/dashboard/category/list'}>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText primary="List" />
                                            </ListItemButton>
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item menu-open" onClick={() => handleActiveChange(3)}>
                                    <div className = "nav-link">
                                        <Link href={'/dashboard/category/create'}>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText primary="Create" />
                                            </ListItemButton>
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item menu-open" onClick={() => handleActiveChange(3)}>
                                    <div className = "nav-link">
                                        <Link href={'/dashboard/category/update'}>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText primary="Update" />
                                            </ListItemButton>
                                        </Link>
                                    </div>
                                </li>
                                </List>
                            </Collapse>
                        </ul>
                    </nav>
                </div>
            </aside>
            <div className="content-wrapper" style={{ padding: '50px' }}>
                {children}
            </div>
        </>
    );
}