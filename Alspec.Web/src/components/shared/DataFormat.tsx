
import dayjs from 'dayjs';
import { NumericFormat } from 'react-number-format';

export interface DataFormatProps {
    value?: number | string | null;
    type?: 'default' | 'number' | 'percent' | 'date';
}

const DataFormat = ({ value, type = 'number' }: DataFormatProps) => {
    return (
        <>
            {type === 'default' && (value || '-')}
            {type === 'number' && (
                <NumericFormat
                    displayType="text"
                    value={value || '-'}
                    prefix={'$'}
                    decimalScale={2}
                    thousandSeparator={true}
                />
            )}
            {type === 'percent' && (
                <NumericFormat
                    displayType="text"
                    value={value || '-'}
                    suffix={'%'}
                    decimalScale={2}
                    thousandSeparator={true}
                />
            )}
            {type === 'date' && value && (
                dayjs(value).format('YYYY-MM-DD')
            )}
        </>
    );
};

export default DataFormat;
