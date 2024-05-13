import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {AppRoutesProps, routeConfig} from '@router/config/routeConfig'
import Menu from '@components/_menu/Menu';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<>Loading</>}>
                {route.element}
            </Suspense>
        );


        //route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element
        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return (
        <>
            <Menu/>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </>
    );
};

export default AppRouter;
