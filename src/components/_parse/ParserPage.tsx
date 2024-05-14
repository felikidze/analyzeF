import {FC, useCallback} from 'react';

import InputWButton from '@shared/InputWButton';
import {BaseClient} from '@components/context/AuthContext';

interface IParserPage {

}

const ParserPage: FC<IParserPage> = () => {
    const onBtnClick = useCallback((url: string) => {
        BaseClient.post('/parse/analyze', {
            data: {
                url
            }
        })
    }, []);

    return (
        <div>
            <InputWButton
                onBtnClick={onBtnClick}
                btnTitle="Запустить сканирование"
            />
        </div>
    );
};

export default ParserPage;