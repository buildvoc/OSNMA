'use client';

import React from 'react';

const OSNMALegend: React.FC = () => {
  return (
    <section id="legend" className="p-6 bg-gray-900 text-gray-200 rounded-xl shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold text-gray-100 mb-6">Legend</h3>

      {/* Colour Codes Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-400 mb-4">Colour Codes</h4>
        <p className="text-sm leading-relaxed mb-4">
          In general, <span className="text-green-500 font-bold">green</span> means available, <span className="text-gray-500 font-bold">grey</span> inactive and <span className="text-red-500 font-bold">red</span> missing. The difference between inactive and missing is if we were expecting that item or not.
        </p>
        <p className="text-sm leading-relaxed mb-4">
          Additionally, each ADKD type is encoded using a different colour. The ADKD type is relevant both for the tag type and the authenticated data.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <span className="text-teal-400">ADKD0</span>,
          <span className="text-yellow-400">ADKD4</span>, and
          <span className="text-purple-400">ADKD12</span>.
        </div>
      </div>
      <hr className="border-gray-700 my-8" />

      {/* Tag Verification Inputs Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-400 mb-4">Tag Verification Inputs</h4>
        <p className="text-sm leading-relaxed mb-4">
          A satellite card is created for each satellite seen in the last 30 seconds subframe.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 max-w-sm">
          <div className="font-semibold text-lg mb-2 text-white">SVID</div>
          <div className="adkd legend-table mb-4">
            <h5 className="text-sm text-gray-400 mb-1">ADKD</h5>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center">
                <span className="min-w-[90px] font-medium text-gray-300">ADKD 0/12:</span>
                <span className="text-gray-400">Word Types for this ADKD</span>
              </div>
              <div className="flex items-center">
                <span className="min-w-[90px] font-medium text-gray-300">ADKD 4:</span>
                <span className="text-gray-400">Word Types for this ADKD</span>
              </div>
            </div>
          </div>
          <hr className="border-gray-700 my-2" />
          <div className="osnma_tags legend-table mb-4">
            <h5 className="text-sm text-gray-400 mb-1">Tags</h5>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700 px-2 py-1 rounded-full text-xs font-monorelative text-teal-400">
                PRN_D
                <sup className="absolute top-0 right-1 text-[8px] text-red-400">FLX</sup>
                <sub className="absolute bottom-0 right-1 text-[8px] text-gray-400">COP</sub>
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded-full text-xs font-mono relative text-yellow-400">
                PRN_D
                <sup className="absolute top-0 right-1 text-[8px] text-red-400">FLX</sup>
                <sub className="absolute bottom-0 right-1 text-[8px] text-gray-400">COP</sub>
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded-full text-xs font-mono relative text-purple-400">
                PRN_D
                <sup className="absolute top-0 right-1 text-[8px] text-red-400">FLX</sup>
                <sub className="absolute bottom-0 right-1 text-[8px] text-gray-400">COP</sub>
              </span>
            </div>
          </div>
          <div className="osnma_key">
            <h5 className="text-sm text-gray-400 mb-1">Key</h5>
            <div className="bg-gray-700 px-2 py-1 rounded-md text-xs font-mono text-gray-400 overflow-hidden text-ellipsis">
              Tesla Key bits in hexadecimal
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-700 my-8" />

      {/* Global Authenticated Data Section */}
      <div>
        <h4 className="text-xl font-semibold text-gray-400 mb-4">Global Authenticated Data</h4>
        <p className="text-sm leading-relaxed mb-4">
          This section is static: it always shows all satellites defined in the European GNSS Service Centre, regardless if they are currently in view of the receiver or not.
          <br />
          However, note that some satellites may be not operational (e.g., SVID 14 and 18). For precise information, check the <a href="https://www.gsc-europa.eu/system-service-status/constellation-information" target="_blank" className="text-blue-400 hover:underline">gsc-europa</a> website.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 max-w-sm">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-white text-lg mb-2">SVID</div>
            <div className="bg-gray-700 p-2 rounded-md">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-400">ADKD0</span>
                <span className="font-mono text-gray-400">Nav Data IOD</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">GST:</span>
                <span className="font-mono text-gray-400">Last GST Authenticated</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Bits:</span>
                <span className="font-mono text-gray-400">Accumulated Tag bits</span>
              </div>
            </div>
            <div className="bg-gray-700 p-2 rounded-md">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-400">ADKD4</span>
                <span className="font-mono text-gray-400">N/A</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">GST:</span>
                <span className="font-mono text-gray-400">Last GST Authenticated</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Bits:</span>
                <span className="font-mono text-gray-400">Accumulated Tag bits</span>
              </div>
            </div>
            <div className="bg-gray-700 p-2 rounded-md">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-400">ADKD12</span>
                <span className="font-mono text-gray-400">Nav Data IOD</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">GST:</span>
                <span className="font-mono text-gray-400">Last GST Authenticated</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Bits:</span>
                <span className="font-mono text-gray-400">Accumulated Tag bits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OSNMALegend;