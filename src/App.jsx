import React, { useState } from "react";

// leaflet
import { MapContainer, TileLayer } from "react-leaflet";

// components
import LocationMarker from "./components/LocationMarker";
import Skeleton from "./components/Skeleton";

// redux toolkit query
import { useTrackIPQuery } from "./services/ipAdServices";
import { skipToken } from "@reduxjs/toolkit/dist/query";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(skipToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  const { data, error, isLoading } = useTrackIPQuery(inputValue);

  return (
    <main className="h-full w-full font-rubik">
      <section className="relative flex min-h-[30vh] w-screen flex-col items-center overflow-visible bg-cyan-300 bg-header bg-cover bg-center bg-no-repeat">
        <h1 className="p-5 text-4xl text-white">IP Address Tracker</h1>
        <form
          className="relative flex w-[70%] max-w-3xl cursor-pointer"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search for IP address"
            className="w-full rounded-2xl border-none p-4 text-base placeholder:text-darkgray focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-0 flex h-full w-12 items-center justify-center self-stretch rounded-r-2xl border-none bg-verydarkgray p-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </form>

        <div
          className={
            data === undefined
              ? "hidden"
              : "absolute top-40 z-20 mx-auto grid max-h-min w-[70%] max-w-6xl grid-cols-1 gap-4 rounded-lg bg-white p-8 text-center shadow md:grid-cols-2 md:text-left lg:grid-cols-4"
          }
        >
          {error ? (
            <>Enter a valid IP address</>
          ) : isLoading ? (
            <>
              <Skeleton />
            </>
          ) : data ? (
            <>
              <div className="p-1 pr-5 lg:border-r-2 lg:border-darkgray lg:p-4">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-darkgray">
                  ip address
                </h3>
                <p className="text-lg font-semibold text-verydarkgray md:text-xl">
                  {data.ip}
                </p>
              </div>

              <div className="p-1 pr-5 lg:border-r-2 lg:border-darkgray lg:p-4">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-darkgray">
                  location
                </h2>
                <p className="text-lg font-semibold text-verydarkgray md:text-xl">
                  {data.location.city}, {data.location.region},{" "}
                  {data.location.country}
                </p>
              </div>

              <div className="p-1 pr-5 lg:border-r-2 lg:border-darkgray lg:p-4">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-darkgray">
                  timezone
                </h2>
                <p className="text-lg font-semibold text-verydarkgray md:text-xl">
                  UTC {data.location.timezone}
                </p>
              </div>

              <div className="p-1 lg:p-4">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-darkgray">
                  isp
                </h2>
                <p className="text-lg font-semibold text-verydarkgray md:text-xl">
                  {data.isp}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </section>
      <div>
        {isLoading ? (
          <>
            <Skeleton />
          </>
        ) : data ? (
          <MapContainer
            className="z-10 min-h-[70vh] w-full"
            center={[data.location.lat, data.location.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
              position={{ lat: data.location.lat, lng: data.location.lng }}
            />
          </MapContainer>
        ) : null}
      </div>
    </main>
  );
}

export default App;
