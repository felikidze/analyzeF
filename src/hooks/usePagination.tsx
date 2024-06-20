import {Dispatch, SetStateAction, useCallback, useLayoutEffect, useState} from "react";
import {BaseClient} from "@context/AuthContext.tsx";
import {animateScroll} from "react-scroll";

interface IUsePagination<T = unknown> {
    setData: Dispatch<SetStateAction<T[]>>;
    getUrl: string;
}

export const usePagination = (opts: IUsePagination) => {
    const {setData, getUrl} = opts;

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>();

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response: unknown[] = await BaseClient.get(getUrl, {
                params: {
                    page: currentPage,
                    pageSize: pageSize
                }
            });

            setData(response.data.list);
            setTotal(+response.data.total);

            setTimeout(() => {
                animateScroll.scrollToTop({
                    smooth: true
                });
            }, 0)
        };

        fetchData();
    }, [currentPage, pageSize]);

    const onChangePage = useCallback((newPage: number, newPageSize: number) => {
        setCurrentPage(newPage);
        setPageSize(newPageSize);
    }, []);

    return {
        currentPage,
        pageSize,
        total,
        onChangePage
    }
}