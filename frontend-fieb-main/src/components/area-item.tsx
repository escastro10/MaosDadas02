import Link from "next/link";
import { ChalkboardTeacher, Factory, FlowerLotus, Headset, UsersThree } from "phosphor-react";
import { AiFillCarryOut, AiFillCustomerService, AiFillFileImage, AiFillFolder } from "react-icons/ai";
import { BiAccessibility, BiAlignRight, BiAnchor, BiBarChartAlt, BiBarChartAlt2, BiBook, BiCalendarHeart, BiCalendarPlus, BiCalendarStar, BiCamera, BiCartAlt, BiCategoryAlt } from "react-icons/bi";
import { BsFileEarmarkBarGraphFill, BsGraphDown, BsGraphDownArrow, BsGraphUpArrow, BsInfo, BsStoplightsFill } from "react-icons/bs";
import { FaBuilding, FaCompressArrowsAlt, FaFacebook, FaInfoCircle, FaInstagram, FaLightbulb, FaPhoneVolume, FaRegBuilding, FaRegHandshake, FaTelegramPlane, FaTrophy, FaYoutube } from "react-icons/fa";
import { FaArrowRightArrowLeft, FaArrowsUpDownLeftRight, FaBicycle, FaBookBible, FaBuffer, FaBurger, FaCalendarDays, FaFileInvoiceDollar, FaMagnifyingGlassChart, FaMoneyBillTrendUp, FaStore, FaUserGear } from "react-icons/fa6";
import { FiAirplay, FiBell, FiCheckCircle, FiChrome, FiCloudLightning, FiCoffee, FiCreditCard, FiFileText } from "react-icons/fi";
import { GiFarmTractor, GiReceiveMoney } from "react-icons/gi";
import { GoBug, GoContainer, GoCopy, GoEye, GoFlame } from "react-icons/go";
import { GrContactInfo, GrCubes, GrMoney } from "react-icons/gr";
import { HiArchive, HiChat, HiChatAlt, HiChatAlt2 } from "react-icons/hi";
import { ImWhatsapp } from "react-icons/im";
import { IoIosWarning, IoMdContact } from "react-icons/io";
import { IoAppsOutline, IoMegaphoneSharp } from "react-icons/io5";
import { LuBadgeCheck, LuBoxes, LuClapperboard, LuConstruction, LuDumbbell, LuFileBadge, LuFileSignature, LuFingerprint, LuFolderCheck, LuFolderClock, LuFolderClosed, LuFolderCog, LuFolderHeart, LuFuel, LuGauge } from "react-icons/lu";
import { MdAdsClick, MdAirplanemodeActive, MdAndroid, MdArchitecture, MdAssignmentLate, MdAttachMoney, MdAutoGraph, MdBalance, MdBrowserUpdated, MdBusinessCenter, MdContentCut, MdDeleteSweep, MdOutlineEnergySavingsLeaf, MdOutlineGraphicEq, MdOutlineHighlight, MdOutlineLightMode, MdOutlinePhoneAndroid } from "react-icons/md";
import { PiChalkboardTeacher, PiFarm, PiMoneyBold, PiMoneyWavy, PiNuclearPlant, PiPottedPlantDuotone } from "react-icons/pi";
import { RiAddCircleFill, RiAedLine, RiArtboard2Line, RiBankLine, RiBarcodeFill, RiBardFill, RiBookmark3Fill, RiBriefcase2Fill, RiBriefcase4Fill, RiBusWifiFill, RiContactsLine, RiFolderWarningLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlEnergy } from "react-icons/sl";
import { TbChartInfographic, TbFileTypography } from "react-icons/tb";
import { TiBrush, TiContacts } from "react-icons/ti";
import { VscActivateBreakpoints, VscCode, VscDebugDisconnect, VscFeedback, VscHome, VscLocation, VscMusic } from "react-icons/vsc";

import { IconName } from "./icon-selector";

const iconComponents = {
    FlowerLotus, Headset, Factory, UsersThree, ChalkboardTeacher,
    BiCategoryAlt, FaFileInvoiceDollar, FaStore, MdAttachMoney,
    FaCompressArrowsAlt, FaTrophy, FaUserGear, FaMagnifyingGlassChart, PiChalkboardTeacher,
    FaBuilding, MdBusinessCenter, AiFillCarryOut, FaRegBuilding, FaRegHandshake, AiFillCustomerService, AiFillFileImage, AiFillFolder, BiAccessibility, BiAnchor, BiAlignRight, BiBarChartAlt2, BiBarChartAlt, BiBook, BiCalendarHeart, BiCalendarStar, BiCalendarPlus, BiCamera, BiCartAlt, PiNuclearPlant, PiPottedPlantDuotone, MdOutlineEnergySavingsLeaf, SlEnergy, FaLightbulb, MdOutlineHighlight, MdOutlineLightMode, FiCloudLightning, BsStoplightsFill, ImWhatsapp, FaTelegramPlane, FaInstagram, FaFacebook, FaYoutube, FaPhoneVolume, MdOutlinePhoneAndroid, IoMegaphoneSharp, IoMdContact, RiContactsLine, TiContacts, FiAirplay, FiBell, FiCheckCircle, FiChrome, FiCreditCard, FiFileText, FiCoffee, FaArrowRightArrowLeft, FaArrowsUpDownLeftRight, FaBicycle, FaBookBible, FaBuffer, FaBurger, FaCalendarDays, GoBug, GoContainer, GoCopy, GoEye, GoFlame, HiArchive, HiChatAlt2, HiChat, HiChatAlt, LuBadgeCheck, LuBoxes, LuClapperboard, LuConstruction, LuDumbbell, LuFileBadge, LuFileSignature, LuFingerprint, LuFolderCheck, LuFolderClock, LuFolderClosed, LuFolderCog, LuFolderHeart, LuFuel, LuGauge, MdAdsClick, MdAirplanemodeActive, MdAndroid, MdArchitecture, MdAssignmentLate, MdBalance, MdBrowserUpdated, MdContentCut, MdDeleteSweep, RiAddCircleFill, RiAedLine, RiArtboard2Line, RiBankLine, RiBarcodeFill, RiBardFill, RiBookmark3Fill, RiBriefcase2Fill, RiBriefcase4Fill, RiBusWifiFill, RiMoneyDollarCircleLine, GrMoney, PiMoneyBold, PiMoneyWavy, GiReceiveMoney, FaMoneyBillTrendUp, MdAutoGraph, BsFileEarmarkBarGraphFill, BsGraphDown, BsGraphDownArrow, BsGraphUpArrow, MdOutlineGraphicEq, TbFileTypography, PiFarm, GiFarmTractor, TiBrush, VscActivateBreakpoints, VscCode, VscDebugDisconnect, VscFeedback, VscHome, VscLocation, VscMusic, IoIosWarning, RiFolderWarningLine, FaInfoCircle, BsInfo, TbChartInfographic, GrContactInfo, IoAppsOutline, GrCubes
};



type AreaItemProps = {
    id: string;
    name: string;
    slug: string;
    iconName: IconName | string;
    period: {
        id: string;
        year: number;
    }
}


const AreaItem = ({ data }: { data: AreaItemProps }) => {
    const IconComponent = iconComponents[data.iconName];

    return (
        <Link href={`/indicadores-sustentaveis/${data.period.year}/${data.slug}`} className="bg-[#fff] cursor-pointer hover:bg-blue-500 hover:text-white transition-all hover:scale-[101%] rounded-2xl gap-2 items-center text-center justify-center h-36 p-4 flex flex-col text-lg font-semibold text-blue-700">
            {IconComponent && <IconComponent className="size-12" />}
            {data.name}
        </Link>
    );
}

export default AreaItem;