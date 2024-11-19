import {
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi';
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { PiBuildings } from "react-icons/pi";
import { LiaUserShieldSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CgInsights } from 'react-icons/cg';

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    summary: <HiMiniBars3BottomLeft />,
    reports: <TbReportSearch  />,
    properties: <PiBuildings />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    finances: <FaSackDollar  />,
    users: <LiaUserShieldSolid />,
    helpandsupport: <MdSupportAgent />,
    insight: <CgInsights />
}

export default navigationIcon
