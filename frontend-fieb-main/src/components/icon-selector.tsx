import { ChalkboardTeacher, Factory, FlowerLotus, Headset, UsersThree } from "phosphor-react";
import React from 'react';
import { AiFillCarryOut, AiFillCustomerService, AiFillFileImage, AiFillFolder } from "react-icons/ai";
import { BiAccessibility, BiAlignRight, BiAnchor, BiBarChartAlt, BiBarChartAlt2, BiBook, BiCalendarHeart, BiCalendarPlus, BiCalendarStar, BiCamera, BiCartAlt, BiCategoryAlt } from "react-icons/bi";
import { BsFileEarmarkBarGraphFill, BsGraphDown, BsGraphDownArrow, BsGraphUpArrow, BsInfo, BsStoplightsFill } from "react-icons/bs";
import { FaBuilding, FaCompressArrowsAlt, FaFacebook, FaInfoCircle, FaInstagram, FaLightbulb, FaPhoneVolume, FaRegBuilding, FaRegHandshake, FaTelegramPlane, FaTrophy, FaYoutube } from "react-icons/fa";
import { FaArrowRightArrowLeft, FaArrowsUpDownLeftRight, FaBicycle, FaBookBible, FaBuffer, FaBurger, FaCalendarDays, FaFileInvoiceDollar, FaMagnifyingGlassChart, FaMoneyBillTrendUp, FaStore, FaUserGear } from "react-icons/fa6";
import { FiAirplay, FiBell, FiCheckCircle, FiChrome, FiCloudLightning, FiCoffee, FiCreditCard, FiFileText } from "react-icons/fi";
import { GiFarmTractor, GiReceiveMoney } from "react-icons/gi";
import { GoBug, GoContainer, GoCopy, GoEye, GoFlame } from "react-icons/go";
import { GrContactInfo, GrMoney } from "react-icons/gr";
import { HiArchive, HiChat, HiChatAlt, HiChatAlt2 } from "react-icons/hi";
import { ImWhatsapp } from "react-icons/im";
import { IoIosWarning, IoMdContact } from "react-icons/io";
import { IoAppsOutline, IoMegaphoneSharp } from "react-icons/io5";
import { LuBadgeCheck, LuBoxes, LuClapperboard, LuConstruction, LuDumbbell, LuFileBadge, LuFileSignature, LuFingerprint, LuFolderCheck, LuFolderClock, LuFolderClosed, LuFolderCog, LuFolderHeart, LuFuel, LuGauge } from "react-icons/lu";
import { MdAdsClick, MdAirplanemodeActive, MdAndroid, MdArchitecture, MdAssignmentLate, MdAttachMoney, MdAutoGraph, MdBalance, MdBrowserUpdated, MdBusinessCenter, MdContentCut, MdDeleteSweep, MdOutlineEnergySavingsLeaf, MdOutlineGraphicEq, MdOutlineHighlight, MdOutlineLightMode, MdOutlinePhoneAndroid } from "react-icons/md";
import { PiFarm, PiMoneyBold, PiMoneyWavy, PiNuclearPlant, PiPottedPlantDuotone } from "react-icons/pi";
import { RiAddCircleFill, RiAedLine, RiArtboard2Line, RiBankLine, RiBarcodeFill, RiBardFill, RiBookmark3Fill, RiBriefcase2Fill, RiBriefcase4Fill, RiBusWifiFill, RiContactsLine, RiFolderWarningLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlEnergy } from "react-icons/sl";
import { TbChartInfographic, TbFileTypography } from "react-icons/tb";
import { TiBrush, TiContacts } from "react-icons/ti";
import { VscActivateBreakpoints, VscCode, VscDebugDisconnect, VscFeedback, VscHome, VscLocation, VscMusic } from "react-icons/vsc";

import { GrCubes } from "react-icons/gr";



export type IconName =
    | 'FlowerLotus' | 'Headset' | 'Factory' | 'UsersThree' | 'ChalkboardTeacher'
    | 'BiCategoryAlt' | 'FaFileInvoiceDollar' | 'FaStore' | 'MdAttachMoney'
    | 'FaCompressArrowsAlt' | 'FaTrophy' | 'FaUserGear' | 'FaMagnifyingGlassChart'
    | 'FaBuilding' | 'MdBusinessCenter' | 'AiFillCarryOut' | 'FaRegBuilding' | 'FaRegHandshake' | 'AiFillCustomerService' | 'AiFillFileImage' | 'AiFillFolder' | 'BiAccessibility' | 'BiAnchor' | 'BiAlignRight' | 'BiBarChartAlt2' | 'BiBarChartAlt' | 'BiBook' | 'BiCalendarHeart' | 'BiCalendarStar' | 'BiCalendarPlus' | 'BiCamera' | 'BiCartAlt' | 'PiNuclearPlant' | 'PiPottedPlantDuotone' | 'MdOutlineEnergySavingsLeaf' | 'SlEnergy' | 'FaLightbulb' | 'MdOutlineHighlight' | 'MdOutlineLightMode' | 'FiCloudLightning' | 'BsStoplightsFill' | 'ImWhatsapp' | 'FaTelegramPlane' | 'FaInstagram' | 'FaFacebook' | 'FaYoutube' | 'FaPhoneVolume' | 'MdOutlinePhoneAndroid' | 'IoMegaphoneSharp' | 'IoMdContact' | 'RiContactsLine' | 'TiContacts' | 'FiAirplay' | 'FiBell' | 'FiCheckCircle' | 'FiChrome' | 'FiCreditCard' | 'FiFileText' | 'FiCoffee' | 'FaArrowRightArrowLeft' | 'FaArrowsUpDownLeftRight' | 'FaBicycle' | 'FaBookBible' | 'FaBuffer' | 'FaBurger' | 'FaCalendarDays' | 'GoBug' | 'GoContainer' | 'GoCopy' | 'GoEye' | 'GoFlame' | 'HiArchive' | 'HiChatAlt2' | 'HiChat' | 'HiChatAlt' | 'LuBadgeCheck' | 'LuBoxes' | 'LuClapperboard' | 'LuConstruction' | 'LuDumbbell' | 'LuFileBadge' | 'LuFileSignature' | 'LuFingerprint' | 'LuFolderCheck' | 'LuFolderClock' | 'LuFolderClosed' | 'LuFolderCog' | 'LuFolderHeart' | 'LuFuel' | 'LuGauge' | 'MdAdsClick' | 'MdAirplanemodeActive' | 'MdAndroid' | 'MdArchitecture' | 'MdAssignmentLate' | 'MdBalance' | 'MdBrowserUpdated' | 'MdContentCut' | 'MdDeleteSweep' | 'RiAddCircleFill' | 'RiAedLine' | 'RiArtboard2Line' | 'RiBankLine' | 'RiBarcodeFill' | 'RiBardFill' | 'RiBookmark3Fill' | 'RiBriefcase2Fill' | 'RiBriefcase4Fill' | 'RiBusWifiFill' | 'RiMoneyDollarCircleLine' | 'GrMoney' | 'PiMoneyBold' | 'PiMoneyWavy' | 'GiReceiveMoney' | 'FaMoneyBillTrendUp' | 'MdAutoGraph' | 'BsFileEarmarkBarGraphFill' | 'BsGraphDown' | 'BsGraphDownArrow' | 'BsGraphUpArrow' | 'MdOutlineGraphicEq' | 'TbFileTypography' | 'PiFarm' | 'GiFarmTractor' | 'TiBrush' | 'VscActivateBreakpoints' | 'VscCode' | 'VscDebugDisconnect' | 'VscFeedback' | 'VscHome' | 'VscLocation' | 'VscMusic' | 'IoIosWarning' | 'RiFolderWarningLine' | 'FaInfoCircle' | 'BsInfo' | 'TbChartInfographic' | 'GrContactInfo' | 'IoAppsOutline' | 'GrCubes';

interface IconSelectorProps {
    selectedIcon: IconName;
    onSelectIcon: (iconName: IconName) => void;
}

const iconComponents = {
    FlowerLotus, Headset, Factory, UsersThree, ChalkboardTeacher,
    BiCategoryAlt, FaFileInvoiceDollar, FaStore, MdAttachMoney,
    FaCompressArrowsAlt, FaTrophy, FaUserGear, FaMagnifyingGlassChart,
    FaBuilding, MdBusinessCenter, AiFillCarryOut, FaRegBuilding, FaRegHandshake, AiFillCustomerService, AiFillFileImage, AiFillFolder, BiAccessibility, BiAnchor, BiAlignRight, BiBarChartAlt2, BiBarChartAlt, BiBook, BiCalendarHeart, BiCalendarStar, BiCalendarPlus, BiCamera, BiCartAlt, PiNuclearPlant, PiPottedPlantDuotone, MdOutlineEnergySavingsLeaf, SlEnergy, FaLightbulb, MdOutlineHighlight, MdOutlineLightMode, FiCloudLightning, BsStoplightsFill, ImWhatsapp, FaTelegramPlane, FaInstagram, FaFacebook, FaYoutube, FaPhoneVolume, MdOutlinePhoneAndroid, IoMegaphoneSharp, IoMdContact, RiContactsLine, TiContacts, FiAirplay, FiBell, FiCheckCircle, FiChrome, FiCreditCard, FiFileText, FiCoffee, FaArrowRightArrowLeft, FaArrowsUpDownLeftRight, FaBicycle, FaBookBible, FaBuffer, FaBurger, FaCalendarDays, GoBug, GoContainer, GoCopy, GoEye, GoFlame, HiArchive, HiChatAlt2, HiChat, HiChatAlt, LuBadgeCheck, LuBoxes, LuClapperboard, LuConstruction, LuDumbbell, LuFileBadge, LuFileSignature, LuFingerprint, LuFolderCheck, LuFolderClock, LuFolderClosed, LuFolderCog, LuFolderHeart, LuFuel, LuGauge, MdAdsClick, MdAirplanemodeActive, MdAndroid, MdArchitecture, MdAssignmentLate, MdBalance, MdBrowserUpdated, MdContentCut, MdDeleteSweep, RiAddCircleFill, RiAedLine, RiArtboard2Line, RiBankLine, RiBarcodeFill, RiBardFill, RiBookmark3Fill, RiBriefcase2Fill, RiBriefcase4Fill, RiBusWifiFill, RiMoneyDollarCircleLine, GrMoney, PiMoneyBold, PiMoneyWavy, GiReceiveMoney, FaMoneyBillTrendUp, MdAutoGraph, BsFileEarmarkBarGraphFill, BsGraphDown, BsGraphDownArrow, BsGraphUpArrow, MdOutlineGraphicEq, TbFileTypography, PiFarm, GiFarmTractor, TiBrush, VscActivateBreakpoints, VscCode, VscDebugDisconnect, VscFeedback, VscHome, VscLocation, VscMusic, IoIosWarning, RiFolderWarningLine, FaInfoCircle, BsInfo, TbChartInfographic, GrContactInfo, IoAppsOutline, GrCubes
};

export const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelectIcon }) => {
    const iconCount = Object.keys(iconComponents).length;

    return (
        <div>
            <p className="mb-4 text-sm font-semibold text-gray-500">
                Você possui {iconCount} ícones disponíveis para escolher.
            </p>
            <div className="grid grid-cols-8 lg:grid-cols-10 2xl:grid-cols-12 gap-4">
                {Object.entries(iconComponents).map(([name, Icon]) => (
                    <div
                        key={name}
                        className={`p-2  border w-14 h-10 flex items-center justify-center cursor-pointer rounded-lg ${selectedIcon === name ? 'text-blue-600 bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 text-gray-500'
                            }`}
                        onClick={() => onSelectIcon(name as IconName)}
                    >
                        <Icon size={24} />
                    </div>
                ))}
            </div>
        </div>
    );
};
