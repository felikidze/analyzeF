import {FC, memo} from 'react';


interface IMainProps {

}

const Main: FC<IMainProps> = (props) => {
    console.info(props);

    return (
        <div>
            Программный сервис для поиска и анализа веб-ресурсов на предмет запрещенного контента
        </div>
    )
};

export default memo(Main);