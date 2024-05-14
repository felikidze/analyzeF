import {FC, useContext} from 'react';
import {Link} from 'react-router-dom';
import { Flex } from 'antd';

import {MENU_CONFIG} from './config/menuConfig';
import {AuthContext} from "@context/AuthContext.tsx";

const Menu: FC = () => {
    const {isUserLogged} = useContext(AuthContext);

    return (
        <Flex gap="small" wrap>
            {Object.values(MENU_CONFIG).map(({title, routePath, withoutAuthOnly, authOnly}) => {
                if (!isUserLogged && withoutAuthOnly) {
                    return <Link to={routePath}>{title}</Link>;
                }

                if (isUserLogged && authOnly) {
                    return <Link to={routePath}>{title}</Link>;
                }

                return null;
            })}
        </Flex>
    );
};

export default Menu;