import {FC, memo} from 'react';


interface IMainProps {

}

const Main: FC<IMainProps> = (props) => {
    console.info(props);

    return (
        <div>
            хуй
        </div>
    )
};

export default memo(Main);