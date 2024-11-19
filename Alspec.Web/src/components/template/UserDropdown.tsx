import Avatar from '@/components/ui/Avatar';
import Dropdown from '@/components/ui/Dropdown';
import withHeaderItem from '@/utils/hoc/withHeaderItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import type { CommonProps } from '@/@types/common';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PiLockKeyFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Manage Subscription',
        path: '/',
        icon: <MdSubscriptions />
    }
]

const _UserDropdown = ({ className }: CommonProps) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar size={32} shape="circle" icon={<HiOutlineUser />} className="bg-sky-500" />
            <div className="hidden md:block">
                <div className="text-xs capitalize">Prashant Devkota</div>
                <div className="font-bold"></div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                Prashant Devkota
                            </div>
                            <div className="text-xs">prashantdevkota@gmail.com</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link
                            className="flex h-full w-full px-2"
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50">
                        <PiLockKeyFill />
                    </span>
                    <span>Change Password</span>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
