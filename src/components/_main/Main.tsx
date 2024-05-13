import {memo} from 'react';


interface IMain {

}

const Main = (props: IMain) => {
    console.info(props);

    return (
        <></>
    )
};

export default memo(Main);