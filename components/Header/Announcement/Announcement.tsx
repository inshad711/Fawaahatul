import React, { useEffect, useState } from "react";
import { ArrowDownToLine, ChevronDown, Map, MapPinned } from "lucide-react";
import Link from "next/link";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Country } from "country-state-city";
import { Modal, Spin } from "antd";
import { setGeoLocation } from "@/store/slice/GeoLocationSlice";
import GoogleTranslate from "@/components/GoogleTranslate/GoogleTranslate";

const AnnouncementBarV1: React.FC = () => {
  const dispatch = useDispatch();
  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);
  const announcements = ["Free shipping on all orders!"];
  const countries = Country.getAllCountries();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    const storedGeo = localStorage.getItem("geoLocation");
    const timestamp = localStorage.getItem("geoLocationTimestamp");
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    if (storedGeo && timestamp) {
      if (now - parseInt(timestamp) < oneWeek) {
        const parsedGeo = JSON.parse(storedGeo);
        dispatch(setGeoLocation(parsedGeo));
      } else {
        localStorage.removeItem("geoLocation");
        localStorage.removeItem("geoLocationTimestamp");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(() => {
      const results = countries.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCountries(results);
      setLoading(false);
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  return (
    <div className="bg-templatePrimary text-templatePrimaryText">
      <div className="templateContainer text-[12px] leading-none py-1 flex items-center justify-between">
        <div className=" w-1/2 lg:w-1/3 lg:flex items-center gap-5">
          {/* <GoogleTranslate /> */}
        </div>
        <div className="hidden w-full lg:w-1/3 lg:flex items-center justify-center overflow-hidden">
          <div
            className="announcement-lines"
            style={{ "--lines": announcements.length } as React.CSSProperties}
          >
            {announcements.map((announcement, index) => (
              <h2
                key={index}
                className="line text-[12px] lg:text-[13px] tracking-wide leading-none "
                style={{ animationDelay: `${index * 3}s` }} // Dynamic delay for each line
              >
                {announcement}
              </h2>
            ))}
          </div>
        </div>
        <div className="w-1/2 lg:w-1/3 flex items-center justify-end gap-2">
          {/* <span className="hidden md:block">Select Country</span>
          {geoLocation && (
            <div
              onClick={() => setShowModal(true)}
              className="flex bg-gray-100/20 hover:bg-gray-100/30 px-2 py-1 rounded cursor-pointer items-center gap-1"
            >
              <MapPinned size={14} strokeWidth={1.5} />
              <span className="text- leading-0 mt-[2px] font-medium">
                {geoLocation?.countryCode}
              </span>
              <ChevronDown size={16} className="ml-1" strokeWidth={1.5} />
            </div>
          )} */}
        </div>
      </div>

      {/* <Modal
        open={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
        centered
      >
        <div className="md:p-4">
          <h2 className="text-lg font-semibold mb-2">Select your country</h2>
          <p className="text-sm text-gray-500 mb-4">
            We use your location to provide the best shipping options, local
            currency, and offers.
          </p>
          <input
            type="text"
            placeholder="Search country..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Spin spinning={loading}>
            <div className="grid grid-cols-1 sm:grid-cols-2 max-h-[300px] overflow-y-auto">
              {filteredCountries.map((country) => {
                const flagEmoji = country.isoCode
                  .toUpperCase()
                  .replace(/./g, (char) =>
                    String.fromCodePoint(127397 + char.charCodeAt(0))
                  );

                const selectedCountry = {
                  countryName: country.name,
                  countryCode: country.isoCode,
                  countryCallingCode: `+${country.phonecode}`,
                  currency: country.currency,
                };

                return (
                  <div
                    key={country.isoCode}
                    onClick={() => {
                      dispatch(setGeoLocation(selectedCountry));
                      localStorage.setItem(
                        "geoLocation",
                        JSON.stringify(selectedCountry)
                      );
                      localStorage.setItem(
                        "geoLocationTimestamp",
                        Date.now().toString()
                      );
                      setShowModal(false);
                      setSearchText("");
                    }}
                    className="flex items-center h-auto flex-wrap gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer transition"
                  >
                    <span className="text-xl">{flagEmoji}</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-xs">
                        {country.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </Modal> */}
    </div>
  );
};

export default AnnouncementBarV1;
