import { useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { DateRange } from "react-date-range";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useOutsideClick } from "../hooks/useOutsideClick";

/* eslint-disable react/prop-types */
const ReservationCard = ({ listingData }) => {
    // refs
    const calendarRef = useRef();
    const dropdownRef = useRef();
    const navigate = useNavigate();

    // handling outside click
    const { state: calendarState, setState: setCalendarState } =
        useOutsideClick(calendarRef);
    const { state: showDropdown, setState: setShowDropdown } =
        useOutsideClick(dropdownRef);

    // guests state is here
    const [guestsNumber, setGuestsNumber] = useState(1);
    const [childrenNumber, setChildrenNumber] = useState(0);
    const [reservations, setReservations] = useState([]);
    const [totalGuest, setTotalGuest] = useState(guestsNumber + childrenNumber);
    // pricing state
    const [reservationBasePrice, setReservationBasePrice] = useState(
        listingData?.basePrice
    );
    const [tax, setTax] = useState(
        listingData?.priceAfterTaxes - listingData?.basePrice
    );
    const [authorEarned, setAuthorEarned] = useState(
        listingData?.authorEarnedPrice
    );

    // dates saving and showing to the dateRange calendar calculation here
    const [selectedDates, setSelectedDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    // calculating how many nights guest is staying
    const [nightsStaying, setNightStaying] = useState(1);

    // formatted dates to save in the db
    const formattedStartDate = selectedDates[0]?.startDate?.toISOString();
    const formattedEndDate = selectedDates[0]?.endDate?.toISOString();

    // local dates from formatted date to show in the ui
    const localStartDate = new Date(formattedStartDate).toLocaleDateString();
    const localEndDate = new Date(formattedEndDate).toLocaleDateString();

    // Function to handle date selection
    const handleSelect = (ranges) => {
        setSelectedDates([ranges.selection]);
    };

    // getting saved reservations data
    useEffect(() => {
        // Simulated data fetching
        // Replace this with your actual data fetching logic
        const mockReservations = [];
        setReservations(mockReservations);
    }, []);

    // calculation of price for reservations
    // side effects and logic
    useEffect(() => {
        const daysInMiliSec = Math.ceil(
            selectedDates[0]?.endDate - selectedDates[0]?.startDate
        );
        // turning milliseconds into days
        const calculatedNights = daysInMiliSec / (1000 * 60 * 60 * 24);
        const finalNights = calculatedNights === 0 ? 1 : calculatedNights;
        const calculatedBasePrice = listingData?.basePrice * finalNights;
        // tax is 14%
        const calculatingTaxes = Math.round((calculatedBasePrice * 14) / 100);
        // motel service charge is 3%
        const calculateAuthorEarned =
            calculatedBasePrice - Math.round((calculatedBasePrice * 3) / 100);

        // setting states
        setReservationBasePrice(calculatedBasePrice);
        setTax(calculatingTaxes);
        setAuthorEarned(calculateAuthorEarned);
        setNightStaying(calculatedNights);
    }, [selectedDates, listingData?.basePrice]);

    useEffect(() => {
        setTotalGuest(guestsNumber + childrenNumber);
    }, [guestsNumber, childrenNumber]);

    // reservation button click handler
    const handleBooking = () => {
        // Redirect logic here
        navigate(`/book/stays/${listingData._id}?numberOfGuests=${totalGuest}&nightStaying=${nightsStaying}&checkin=${formattedStartDate}&checkout=${formattedEndDate}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="w-full min-h-[315px] rounded-xl border border-[#dddddd] sticky top-32 shadow-customShadow p-6 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="flex flex-col">
                        <h3 className="text-[22px] text-[#222222] font-semibold">
                            ₹{reservationBasePrice}
                        </h3>
                        <p className="text-[#313131] text-sm">Total before taxes</p>
                    </div>
                    <span className="text-sm text-[#222222] flex flex-row gap-1 items-center mt-2">
                        <AiFillStar size={18} />
                        {listingData?.ratings ? listingData?.ratings : "New"}
                        {listingData?.reviews && (
                            <span>
                                <span>·</span>
                                <span>{listingData?.reviews}</span>
                            </span>
                        )}
                    </span>
                </div>

                {/* Calendar section */}
                {!calendarState && (
                    <div className="rounded-tl-lg rounded-tr-lg border border-[#b9b9b9] w-full min-h-[60px] mt-6 relative flex flex-col">
                        <div
                            onClick={() => {
                                setCalendarState(true);
                            }}
                            className="grid grid-cols-2 cursor-pointer"
                        >
                            <div className="px-3 py-3">
                                <p className="text-[10px] text-black font-semibold uppercase">
                                    Check-in
                                </p>
                                <p className="text-sm text-[#222222]">{localStartDate}</p>
                            </div>
                            <div className="px-3 py-3 border-l border-[#b9b9b9]">
                                <p className="text-[10px] text-black font-semibold uppercase">
                                    Checkout
                                </p>
                                <p className="text-sm text-[#222222]">{localEndDate}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Guest selection */}
                {!calendarState && (
                    <div
                        ref={dropdownRef}
                        onClick={() => {
                            setShowDropdown((prev) => !prev);
                        }}
                    >
                        <div className="rounded-bl-lg rounded-br-lg border border-[#b9b9b9] w-full min-h-[50px] cursor-pointer relative">
                            <div className="px-3 py-3 flex flex-row items-center justify-between">
                                <div className="flex flex-col">
                                    <p className="text-[10px] text-black font-semibold uppercase">
                                        Guests
                                    </p>
                                    <p className="text-sm text-[#222222]">
                                        {totalGuest} {totalGuest === 1 ? "guest" : "guests"}
                                    </p>
                                </div>
                                <div>
                                    {showDropdown ? (
                                        <MdKeyboardArrowUp size={26} />
                                    ) : (
                                        <MdKeyboardArrowDown size={26} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Guests data dropdown */}
                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        className="min-h-[200px] w-72 shadow-lg border absolute z-[90] bg-white px-4 py-5 rounded-md"
                    >
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row items-center justify-between">
                                <span>
                                    <p className="text-base text-[#222222] font-medium">
                                        Adults
                                    </p>
                                    <p className="text-sm text-[#313131]">Age 13+</p>
                                </span>
                                <span className="flex flex-row-reverse items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setGuestsNumber((prev) => prev + 1);
                                        }}
                                        disabled={listingData?.floorPlan?.guests === totalGuest}
                                        className="p-2 rounded-full border border-[#c0c0c0] opacity-90 disabled:cursor-not-allowed disabled:opacity-20"
                                    >
                                        <AiOutlinePlus size={16} />
                                    </button>
                                    <p className="w-[30px] flex justify-center">
                                        {guestsNumber}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setGuestsNumber((prev) => prev - 1);
                                        }}
                                        disabled={guestsNumber === 1}
                                        className="p-2 rounded-full border border-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-20"
                                    >
                                        <AiOutlineMinus size={16} />
                                    </button>
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span>
                                    <p className="text-base text-[#222222] font-medium">
                                        Children
                                    </p>
                                    <p className="text-sm text-[#313131]">Ages 2-12</p>
                                </span>
                                <span className="flex flex-row-reverse items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setChildrenNumber((prev) => prev + 1);
                                        }}
                                        disabled={listingData?.floorPlan?.guests === totalGuest}
                                        className="p-2 rounded-full border border-[#c0c0c0] opacity-90 disabled:cursor-not-allowed disabled:opacity-20"
                                    >
                                        <AiOutlinePlus size={16} />
                                    </button>
                                    <p className="w-[30px] flex justify-center">
                                        {childrenNumber}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setChildrenNumber((prev) => prev - 1);
                                        }}
                                        disabled={childrenNumber === 0}
                                        className="p-2 rounded-full border border-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-20"
                                    >
                                        <AiOutlineMinus size={16} />
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end absolute bottom-3 right-2">
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                }}
                                className="underline text-base text-[#222222] font-medium px-3 py-2 rounded-lg hover:bg-[#f5f5f5]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full mt-2 flex justify-between">
                    <div className="text-[#222222] text-md font-regular">Total Price:</div>
                    <div className="text-[#222222] text-md font-bold">₹1916</div>
                </div>

                <div className="relative group">
                    <div className="flex items-center">
                        <span className="text-gray-500 text-xs cursor-pointer">Including taxes and fees</span>
                        <IoIosInformationCircleOutline className="info-icon text-gray-500 ml-2" />
                    </div>
                    <div className="absolute z-20 shadow-md top-full left-0 mt-2 w-full bg-white p-2 rounded text-sm hidden group-hover:block">
                        <div className="card rounded p-4">
                            <h2 className="text-[#222222] text-xl font-bold mb-4">Taxes & fees</h2>
                            <div className="w-full mt-2 flex justify-between">
                                <div className="text-[#222222] text-md font-regular">Total taxes & fees</div>
                                <div className="text-[#222222] text-md font-bold">₹116</div>
                            </div>
                            <p className="text-[#222222] text-xs mt-4">
                                Disclaimer text goes here Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nulla quo neque harum tempora numquam libero minus, accusantium aut, ipsum, beatae
                                facilis vitae non!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reservation button */}
                {!showDropdown && !calendarState && (
                    <div className="mt-4 flex justify-center rounded-md">
                        <button
                            onClick={handleBooking}
                            className="capitalize py-3 w-full bg-[#B01432] hover:bg-[#d90b63] transition duration-200 ease-in text-white font-medium text-sm rounded-md"
                        >
                            Reserve
                        </button>
                    </div>
                )}

                {/* Calendar & date picker */}
                {!calendarState ? null : (
                    <div
                        ref={calendarRef}
                        className="absolute border-b-[1.2px] border-neutral-200 shadow-md left-[2px] sm:translate-x-[30%] sm:translate-y-[0%] md:translate-x-[-30%] lg:translate-x-[-20%] xl:translate-x-0 xl:translate-y-0"
                    >
                        <DateRange
                            rangeColors={["#262626"]}
                            date={new Date()}
                            editableDateInputs={true}
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={false}
                            ranges={selectedDates}
                            direction="vertical"
                            showDateDisplay={false}
                            minDate={new Date()}
                        />
                    </div>
                )}

                <div className="relative group mt-2 inline-block">
                    <span className="text-red-400 text-sm font-medium cursor-pointer">Cancel policy</span>
                    <IoIosInformationCircleOutline className="info-icon text-red-500 ml-2 inline-block" />
                    <div className="absolute top-0 right-full mt-4 w-[25rem] bg-white border p-6 rounded shadow-lg text-sm hidden group-hover:block">
                        <h4 className="font-bold text-xl mb-1">Cancellation Policy</h4>
                        <ul className="list-disc space-y-2 list-inside">
                            <li>Guests can cancel their reservation up to 24 hours before check-in time without any penalty.</li>
                            <li>In case of a no-show, the guest will be charged the full amount of the reservation.</li>
                        </ul>
                    </div>
                </div>

                <div className="text-sm mt-3 text-red-500">Follow safety measures advised at the hotel</div>
                <div className="text-sm mt-3 text-gray-400">
                    By Proceeding You Agree to Our <span className="text-red-600">Guest Policies</span>
                </div>
            </div>
        </div>
    );
};

export default ReservationCard;