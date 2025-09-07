'use client';

import React from 'react';

const OSNMALegend: React.FC = () => {
  return (
    <section id="legend" className="p-6 bg-gradient-to-br from-gray-50 to-gray-400 text-gray-800 shadow-lg border border-gray-300">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Legend</h3>

      {/* Colour Codes Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-400 mb-4">Colour Codes</h4>
        <p className="text-sm leading-relaxed mb-4">
          In general, <span className="bg-green-500 font-bold py-1 px-2 rounded-md">green</span> means available, <span className="bg-gray-500 font-bold py-1 px-2 rounded-md">grey</span> inactive and <span className="bg-red-500 font-bold py-1 px-2 rounded-md">red</span> missing. The difference between inactive and missing is if we were expecting that item or not.
        </p>
        <p className="text-sm leading-relaxed mb-4">
          Additionally, each ADKD type is encoded using a different colour. The ADKD type is relevant both for the tag type and the authenticated data.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <span className="bg-teal-300 py-1 px-2 rounded-md">ADKD0</span>,
          <span className="bg-yellow-600 py-1 px-2 rounded-md">ADKD4</span>, and
          <span className="bg-fuchsia-400 py-1 px-2 rounded-md">ADKD12</span>.
        </div>
      </div>
      <hr className="border-gray-300 my-8" />

      {/* Tag Verification Inputs Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-400 mb-4">Tag Verification Inputs</h4>
        <p className="text-sm leading-relaxed mb-4">
          A satellite card is created for each satellite seen in the last 30 seconds subframe.
        </p>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 max-w-sm">
          <div className="text-black font-semibold text-lg text-center mt-2 mb-6">SVID</div>
          <div className="mb-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-sm">
                <span className="min-w-[90px] font-medium">ADKD 0/12</span>
                <span className="text-gray-400">Word Types for this ADKD</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="min-w-[90px] font-medium">ADKD 4</span>
                <span className="text-gray-400">Word Types for this ADKD</span>
              </div>
            </div>
          </div>
          <hr className="border-gray-300 my-2" />
          <div className="mb-2">
            <h4 className="text-sm text-gray-400 mb-1">Tags</h4>
            <div className="flex flex-wrap gap-1 text-sm">
              <div className="flex flex-wrap gap-1 text-sm">
                <div className={`grid grid-flow-col grid-rows-2 gap-x-2 px-2 py-0.5 font-mono rounded-sm bg-teal-300`}>
                  <span className='row-span-2 align-middle text-md font-semibold'>PRN_D</span>
                  <span className="col-span-2 text-[8px]">FLX</span>
                  <span className="col-span-2 text-[8px]">COP</span>
                </div>
                <div className={`grid grid-flow-col grid-rows-2 gap-x-2 px-2 py-0.5 font-mono rounded-sm bg-yellow-600`}>
                  <span className='row-span-2 align-middle text-md font-semibold'>PRN_D</span>
                  <span className="col-span-2 text-[8px]">FLX</span>
                  <span className="col-span-2 text-[8px]">COP</span>
                </div>
                <div className={`grid grid-flow-col grid-rows-2 gap-x-2 px-2 py-0.5 font-mono rounded-sm bg-fuchsia-400`}>
                  <span className='row-span-2 align-middle text-md font-semibold'>PRN_D</span>
                  <span className="col-span-2 text-[8px]">FLX</span>
                  <span className="col-span-2 text-[8px]">COP</span>
                </div>
              </div>
            </div>
          </div>
          <div className="osnma_key">
            <h5 className="text-sm text-gray-400 mb-1">Key</h5>
            <div className="bg-gray-300 px-2 py-1 rounded-md text-xs font-mono text-black overflow-hidden text-ellipsis">
              Tesla Key bits in hexadecimal
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 my-8" />

      {/* Global Authenticated Data Section */}
      <div>
        <h4 className="text-xl font-semibold text-gray-400 mb-4">Global Authenticated Data</h4>
        <p className="text-sm leading-relaxed mb-4">
          This section is static: it always shows all satellites defined in the European GNSS Service Centre, regardless if they are currently in view of the receiver or not.
          <br />
          However, note that some satellites may be not operational (e.g., SVID 14 and 18). For precise information, check the <a href="https://www.gsc-europa.eu/system-service-status/constellation-information" target="_blank" className="text-blue-400 hover:underline">gsc-europa</a> website.
        </p>
        <div className="flex flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-4 max-w-lg">
          <div className="flex-none py-4 px-6 flex items-center justify-center">
            <span className="text-xl font-bold">SVID</span>
          </div>
          <div className="flex-1 p-2 font-mono text-xs">
            <div className="flex flex-col divide-y divide-white">
              <div className="flex bg-teal-50">
                <div className="flex-1 px-2 py-1 text-center font-semibold">Nav Data IOD</div>
                <div className="flex-1 px-6 py-0.5 text-center">Last GST Authenticated</div>
                <div className="flex-1 px-6 py-0.5 text-end">Accumulated Tag bits</div>
              </div>
              <div className="flex bg-yellow-50">
                <div className="flex-1 px-2 py-1 text-center font-semibold">N/A</div>
                <div className="flex-1 px-6 py-0.5 text-center">Last GST Authenticated</div>
                <div className="flex-1 px-6 py-0.5 text-end">Accumulated Tag bits</div>
              </div>
              <div className="flex bg-fuchsia-50">
                <div className="flex-1 px-2 py-1 text-center font-semibold">Nav Data IOD</div>
                <div className="flex-1 px-6 py-0.5 text-center">Last GST Authenticated</div>
                <div className="flex-1 px-6 py-0.5 text-end">Accumulated Tag bits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OSNMALegend;