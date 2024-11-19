import toast from '@/components/ui/toast';
import { Notification, NotificationProps } from '@/components/ui/Notification';
import { TypeAttributes } from '@/components/ui/@types/common';
import React from 'react';

class ToastService {
    static showToast(message: string, description: string, type: TypeAttributes.Status) {
        const notificationProps: NotificationProps = {
            title: message,
            children: description,
            type: type,
            duration: 2500
        };

        const notificationElement = React.createElement(Notification, notificationProps);

        toast.push(notificationElement, {
            placement: 'top-end',
        });
    }
}

export default ToastService;
