import {FC, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Button, Flex} from 'antd';

import {MENU_CONFIG} from './config/menuConfig';
import {AuthContext} from "@context/AuthContext.tsx";

const Menu: FC = () => {
    const {isUserLogged, handleLogOut} = useContext(AuthContext);

    return (
        <div style={{display: "flex", marginBottom: "16px"}}>
            <Flex gap="small" wrap>
                {Object.values(MENU_CONFIG).map(({title, routePath, withoutAuthOnly, authOnly}) => {
                    if (!isUserLogged && withoutAuthOnly) {
                        return <Link key={routePath} to={routePath}>{title}</Link>;
                    }

                    if (isUserLogged && authOnly) {
                        return <Link key={routePath} to={routePath}>{title}</Link>;
                    }

                    return null;
                })}
            </Flex>
            {isUserLogged && <Button style={{marginLeft: "auto"}} type="dashed" onClick={handleLogOut}>Выйти</Button> }
        </div>
    );
};

export default Menu;