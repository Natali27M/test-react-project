import { Outlet } from 'react-router-dom';

import css from './Layout.module.css'

const Layout = () => {

    return (
        <div>
            <div className={css.header}>
                Posts
                {/*<NavLink to="/posts">Posts</NavLink>*/}
            </div>
            <div className={css.hr}></div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
        </div>
    );
};

export {Layout};
