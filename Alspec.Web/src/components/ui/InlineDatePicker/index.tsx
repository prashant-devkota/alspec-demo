import React, { useEffect, useRef, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Button from '../Button/Button';
import DatePicker, { DatePickerProps } from '../DatePicker';
import dayjs from 'dayjs';

interface InlineDatePickerInputProps extends DatePickerProps {
    fieldname: string
    onSave: (fieldname: string, value: Date | null) => void;
}

const InlineDatePickerInput: React.FC<InlineDatePickerInputProps> = ({ onSave, ...props }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState<Date | null>(props.value || null);
    const [originalValue, setOriginalValue] = useState<Date | null>(props.value || null);

    const inputRef = useRef<HTMLDivElement>(null);

    const handleSave = () => {
        setIsEditing(false);
        onSave(props.fieldname, inputValue);
        setOriginalValue(inputValue);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setInputValue(originalValue);
    };

    const handleChange = (date: Date | null) => {
        setIsEditing(true);
        const dateWithoutTime = date ? dayjs(date).startOf('day').toDate() : null;
        setInputValue(dateWithoutTime);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            if (inputValue === originalValue) {
                setIsEditing(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputValue, originalValue]);

    const parseDate = (date: string) =>
        dayjs(date).toDate()

    return (
        <div className="inline-edit-input" ref={inputRef}>
            <DatePicker
                {...props}
                value={
                    inputValue instanceof Date
                        ? inputValue
                        : inputValue && dayjs(inputValue).toDate()
                }
                onChange={handleChange}
            />
            {isEditing && (
                <span className="edit-controls">
                    <div className="flex-wrap inline-flex xl:flex items-center gap-1">
                        <Button size="sm" icon={<FaTimes />} onClick={handleCancel} />
                        <Button variant="solid" size="sm" icon={<FaCheck />} onClick={handleSave} />
                    </div>
                </span>
            )}
        </div>
    );
};

export default InlineDatePickerInput;