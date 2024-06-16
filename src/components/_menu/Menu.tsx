import {FC, useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Button, Flex} from 'antd';

import {MENU_CONFIG} from './config/menuConfig';
import {AuthContext} from "@context/AuthContext.tsx";

const Menu: FC = () => {
    const {isUserLogged, handleLogOut} = useContext(AuthContext);
    const location = useLocation();

    return (
        <div style={{display: "flex", marginBottom: "16px", minWidth: "320px"}}>
            <Flex gap="small" wrap>
                {Object.values(MENU_CONFIG).map(({title, routePath, withoutAuthOnly, authOnly}) => {
                    if (!isUserLogged && withoutAuthOnly) {
                        return <Link style={{color: (location.pathname === routePath) ? "cadetblue" : undefined}} key={routePath} to={routePath}>{title}</Link>;
                    }

                    if (isUserLogged && authOnly) {
                        return <Link style={{color: (location.pathname === routePath) ? "cadetblue" : undefined}} key={routePath} to={routePath}>{title}</Link>;
                    }

                    return null;
                })}
            </Flex>
            {isUserLogged && <Button style={{marginLeft: "auto"}} type="dashed" onClick={handleLogOut}>Выйти</Button> }
        </div>
    );
};

export default Menu;