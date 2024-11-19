import React, { useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '@/components/ui/Input';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Button from '../Button/Button';

interface InlineEditInputProps extends InputProps {
    fieldname: string
    onSave: (fieldname: string, value: string) => void;
}

const InlineEditInput: React.FC<InlineEditInputProps> = ({ onSave, ...props }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(props.value || '');
    const [originalValue, setOriginalValue] = useState(props.value || '');
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsEditing(true);
        setInputValue(e.target.value);
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

    return (
        <div className="inline-edit-input" ref={inputRef}>
            <Input
                {...props}
                value={inputValue}
                onChange={handleChange}
            />
            {isEditing && (
                <span className="edit-controls">
                    <div className="flex-wrap inline-flex xl:flex items-center gap-1 justify-end">
                        <Button size="sm" icon={<FaTimes />} onClick={handleCancel} />
                        <Button variant="solid" size="sm" icon={<FaCheck />} onClick={handleSave} />
                    </div>
                </span>
            )}
        </div>
    );
};

export default InlineEditInput;