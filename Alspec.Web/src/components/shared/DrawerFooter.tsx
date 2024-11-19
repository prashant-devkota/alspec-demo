import Button from '@/components/ui/Button';
import type { MouseEvent } from 'react';

type DrawerFooterProps = {
    isLoading: boolean,
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}
const DrawerFooter = ({ onSaveClick, onCancel, isLoading }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" loading={isLoading} onClick={onSaveClick}>
                Save
            </Button>
        </div>
    )
}

export default DrawerFooter;