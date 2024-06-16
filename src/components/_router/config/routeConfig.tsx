import { RouteProps } from 'react-router-dom';

import Main from '@components/_main/Main';
import ParserPage from "@components/_parse/ParserPage";
import Login from "@components/_auth/Login";
import Registration from "@components/_auth/Registration";
import Feed from "@components/_feed/Feed";
import DomainFeed from "@components/_feed/DomainFeed";


export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: string[];
}

export enum AppRoutes {
    MAIN = 'main',
    PROFILE = 'profile',
    ADMIN_PANEL = 'admin_panel',
    FEED = 'feed',
    FEED_DETAILS = 'feed_details',
    DOMAINS = 'domains',
    PARSER = 'parser_page',
    LOGIN = 'login',
    REGISTRATION = 'registration',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FEED]: '/feed',
    [AppRoutes.FEED_DETAILS]: '/feed/', // + :id
    [AppRoutes.DOMAINS]: '/domains',
    [AppRoutes.PARSER]: '/parser-page',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTRATION]: '/registration',
    [AppRoutes.FORBIDDEN]: '/forbidden',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes.MAIN|AppRoutes.PARSER|AppRoutes.REGISTRATION|AppRoutes.LOGIN|AppRoutes.FEED|AppRoutes.DOMAINS, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Main />,
    },
    [AppRoutes.PARSER]: {
        path: RoutePath.parser_page,
        element: <ParserPage />
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <Login />,
    },
    [AppRoutes.REGISTRATION]: {
        path: RoutePath.registration,
        element: <Registration />
    },
    [AppRoutes.FEED]: {
        path: RoutePath.feed,
        element: <Feed />
    },
    [AppRoutes.DOMAINS]: {
        path: RoutePath.domains,
        element: <DomainFeed />
    },
    /*[AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.FEED]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.FEED_DETAILS]: {
        path: `${RoutePath.article_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: `${RoutePath.admin_panel}`,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: `${RoutePath.forbidden}`,
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },*/
};