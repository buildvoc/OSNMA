'use client';

import React from 'react';
import type { OSNMA, MacltSequence } from '@/component/types';

// Helper component to render the Tesla Chain MACLT Sequence
const MacltSequenceDisplay = ({ sequence }: { sequence: MacltSequence[][] | undefined }) => (
  <div className="text-sm">
    {sequence?.map((seq, index) => (
      <div key={index} className="flex flex-wrap gap-1">
        <span className="text-gray-500">[</span>
        {seq?.map((item, itemIndex) => (
          <span key={itemIndex}>
            "{item}"{itemIndex < seq.length - 1 ? ',' : ''}
          </span>
        ))}
        <span className="text-gray-500">]</span>
      </div>
    ))}
  </div>
);

// Satellite Card Component
const SatelliteCard = ({ svid, adkdData, osnmaTags, osnmaKey }: {
  svid: string;
  adkdData: any;
  osnmaTags: any;
  osnmaKey: string | null;
}) => {
  const getAdkdColor = (adkd: number | null): string => {
    switch (adkd) {
      case 0:
      case 12:
        return 'text-blue-400';
      case 4:
        return 'text-purple-400';
      default:
        return 'text-teal-400';
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
      <div className="text-white font-semibold text-lg mb-2">SVID {svid}</div>

      {/* ADKD Data */}
      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-1">ADKD</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm">
            <span className="min-w-[80px] font-medium text-gray-300">ADKD 0/12:</span>
            <div className="flex flex-wrap gap-1">
              {adkdData?.ADKD0 && Object.keys(adkdData.ADKD0)?.map((adkdId) => (
                <span
                  key={adkdId}
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                    adkdData.ADKD0[adkdId] ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {adkdId}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="min-w-[80px] font-medium text-gray-300">ADKD 4:</span>
            <div className="flex flex-wrap gap-1">
              {adkdData?.ADKD4 && Object.keys(adkdData.ADKD4)?.map((adkdId) => (
                <span
                  key={adkdId}
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                    adkdData.ADKD4[adkdId] ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {adkdId}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-700 my-2" />

      {/* OSNMA Tags */}
      <div className="mb-2">
        <h4 className="text-sm text-gray-400 mb-1">Tags</h4>
        <div className="flex flex-wrap gap-2 text-sm">
          {osnmaTags && osnmaTags.length > 0 ? (
            osnmaTags.map((tag: any, index: number) => {
              const value = Array.isArray(tag) ? tag[0] : tag;
              const hasSup = Array.isArray(tag) && tag[1] === 'F';
              const sub = Array.isArray(tag) ? tag[2] : null;
              
              const adkdColor = getAdkdColor(typeof sub === 'number' ? sub : null);

              return (
                <span
                  key={index}
                  className={`bg-gray-700 px-2 py-1 rounded-full text-xs font-mono relative ${adkdColor}`}
                >
                  {value}
                  {hasSup && <sup className="absolute top-0 right-1 text-[8px] text-red-400">F</sup>}
                  {sub !== null && <sub className="absolute bottom-0 right-1 text-[8px] text-gray-400">{sub}</sub>}
                </span>
              );
            })
          ) : (
            <span className="text-red-500 italic">Not transmitting OSNMA</span>
          )}
        </div>
      </div>

      {/* OSNMA Key */}
      <div>
        <h4 className="text-sm text-gray-400 mb-1">Key</h4>
        <div className="bg-gray-700 px-2 py-1 rounded-md text-xs font-mono text-white overflow-hidden text-ellipsis">
          {osnmaKey || <span className="text-red-500 italic">Not transmitting OSNMA</span>}
        </div>
      </div>
    </div>
  );
};

// Main component updated to accept an array of OSNMA objects
const OSNMADataView: React.FC<{ data: OSNMA[] }> = ({ data }) => {
  const osnmaData = data?.[0];

  if (!osnmaData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-400">
        No OSNMA data available.
      </div>
    );
  }

  const {
    metadata,
    OSNMA_status,
    nav_data_received,
    OSNMA_material_received,
    authenticated_nav_data,
  } = osnmaData;

  const getSatelliteNumbers = (list: any): number[] => {
    if (!list) return [];
    return Object.keys(list).map(Number).sort((a, b) => a - b);
  };

  const getActiveSatelliteNumbers = (list: any): number[] => {
    const satelliteNumbers = getSatelliteNumbers(list);
    return satelliteNumbers.filter(
      (prn) =>
        list[prn] && (
          Object.values(list[prn].ADKD0 || {}).includes(true) ||
          Object.values(list[prn].ADKD4 || {}).includes(true)
        )
    );
  };

  const getAdkdStyle = (adkdKey: string): string => {
    switch (adkdKey.toLowerCase()) {
      case 'adkd0':
      case 'adkd12':
        return 'text-blue-400';
      case 'adkd4':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getAdkdBgStyle = (adkdKey: string, isMissing: boolean): string => {
    const baseStyle = isMissing ? 'bg-gray-700 opacity-60' : 'bg-gray-700';
    const adkdColor = getAdkdStyle(adkdKey);
    return `${baseStyle} ${adkdColor}`;
  };

  const satelliteCount = getSatelliteNumbers(nav_data_received).length;
  const osnmaSatelliteCount = getActiveSatelliteNumbers(nav_data_received).length;
  const activeSVIDs = getActiveSatelliteNumbers(nav_data_received);

  return (
    <section className="bg-gray-950 text-gray-200 p-8 min-h-screen font-sans">
      <div className="p-6 bg-gray-900 text-gray-200 rounded-xl shadow-lg border border-gray-700">
        <main className="container mx-auto">
          {/* Last Subframe Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-500 mb-2">Last Subframe [GST]</h3>
            <p className="text-4xl font-extrabold text-green-500" id="GST">
              {metadata?.GST_subframe.join(' ') || '-'}
            </p>
          </div>

          {/* Status Tables Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Authenticated NMA Status */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-gray-400 mb-4">Authenticated NMA Status</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="font-medium text-gray-400">NMAS</div>
                <div className="font-bold text-white">{OSNMA_status?.nma_status?.nmas || '-'}</div>
                <div className="font-medium text-gray-400">CID</div>
                <div className="font-bold text-white">{OSNMA_status?.nma_status?.cid || '-'}</div>
                <div className="font-medium text-gray-400">CPKS</div>
                <div className="font-bold text-white">{OSNMA_status?.nma_status?.cpks || '-'}</div>
              </div>
            </div>

            {/* Tesla Chain in Force */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-gray-400 mb-4">Tesla Chain in Force</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                <div className="font-medium text-gray-400">PKID</div>
                <div className="font-bold text-white">{OSNMA_status?.tesla_chain_in_force?.pkid || '-'}</div>
                <div className="font-medium text-gray-400">HF</div>
                <div className="font-bold text-white">{OSNMA_status?.tesla_chain_in_force?.hf || '-'}</div>
                <div className="font-medium text-gray-400">MF</div>
                <div className="font-bold text-white">{OSNMA_status?.tesla_chain_in_force?.mf || '-'}</div>
                <div className="font-medium text-gray-400">KS</div>
                <div className="font-bold text-white">{OSNMA_status?.tesla_chain_in_force?.ks || '-'}</div>
                <div className="font-medium text-gray-400">TS</div>
                <div className="font-bold text-white">{OSNMA_status?.tesla_chain_in_force?.ts || '-'}</div>
                <div className="font-medium text-gray-400">MACLT</div>
                <div className="font-bold text-white">{OSNMA_status?.tesla_chain_in_force?.maclt || '-'}</div>
              </div>
              <div>
                <p className="font-medium text-gray-400 mb-1">MACLT Sequence</p>
                <MacltSequenceDisplay sequence={OSNMA_status?.tesla_chain_in_force?.maclt_sequence} />
              </div>
            </div>

            {/* Public Key in Force */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-gray-400 mb-4">Public Key in Force</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="font-medium text-gray-400">NPKID</div>
                <div className="font-bold text-white">{OSNMA_status?.public_key_in_force?.npkid || '-'}</div>
                <div className="font-medium text-gray-400">NPKT</div>
                <div className="font-bold text-white">{OSNMA_status?.public_key_in_force?.npkt || '-'}</div>
                <div className="font-medium text-gray-400">MID</div>
                <div className="font-bold text-white">{OSNMA_status?.public_key_in_force?.mid || '-'}</div>
              </div>
            </div>
          </div>

          <hr className="border-gray-700 my-8" />

          {/* OSNMA Tag Verification Inputs */}
          <h3 className="text-xl font-bold text-gray-500 mb-4">OSNMA Tag Verification Inputs</h3>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col items-start text-sm mb-4">
                <div className='mb-4'>
                  <span className="text-lg font-medium text-gray-400 mr-4">Satellites in View:</span>
                  <span className="text-lg font-extrabold text-green-500 mr-4">{satelliteCount}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {getSatelliteNumbers(nav_data_received)?.map((svid) => (
                    <span
                      key={`in-view-${svid}`}
                      className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold text-xs ${
                        activeSVIDs?.includes(svid)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-400'
                      }`}
                    >
                      {String(svid).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start text-sm mb-4">
                <div className='mb-4'>
                  <span className="text-lg font-medium text-gray-400 mr-4">Satellites Transmitting OSNMA:</span>
                  <span className="text-lg font-extrabold text-green-500 mr-4">{osnmaSatelliteCount}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {getSatelliteNumbers(nav_data_received)?.map((svid) => (
                    <span
                      key={`transmitting-${svid}`}
                      className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold text-xs ${
                        OSNMA_material_received?.[svid]?.mack_data?.tags?.length > 0
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {String(svid).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Satellite Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {nav_data_received && Object.keys(nav_data_received)?.map((svid) => {
              const satelliteData = nav_data_received[svid];
              const mackData = OSNMA_material_received?.[svid]?.mack_data;

              return (
                <SatelliteCard
                  key={svid}
                  svid={svid}
                  adkdData={satelliteData}
                  osnmaTags={mackData?.tags || []}
                  osnmaKey={mackData?.tesla_key || null}
                />
              );
            })}
          </div>

          <hr className="border-gray-700 my-8" />

          {/* Authenticated Data */}
          <h3 className="text-xl font-bold text-gray-500 mb-4">Authenticated Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto">
            {authenticated_nav_data && Object.keys(authenticated_nav_data)?.map((svid) => {
              const satelliteAuthData = authenticated_nav_data[svid];
              return (
                <div
                  key={`auth-data-${svid}`}
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                >
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-white text-lg mb-2">SVID {svid}</div>
                    {satelliteAuthData && Object.keys(satelliteAuthData)?.map((adkdKey, adkdIndex) => {
                      const data = satelliteAuthData[adkdKey];
                      const isMissing = data?.iod === '-' || !data?.start_gst || data.start_gst.length === 0;
                      return (
                        <div
                          key={adkdIndex}
                          className={`p-2 rounded-md ${getAdkdBgStyle(adkdKey, isMissing)}`}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className={`font-semibold ${getAdkdStyle(adkdKey)}`}>{adkdKey.toUpperCase()}</span>
                            <span className={`font-mono ${isMissing ? 'text-red-500' : 'text-white'}`}>{data?.iod || '-'}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">GST:</span>
                            <span className={`font-mono ${isMissing ? 'text-red-500' : 'text-white'}`}>{data?.start_gst?.length > 0 ? data.start_gst.join(' ') : '-'}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Bits:</span>
                            <span className={`font-mono ${isMissing ? 'text-red-500' : 'text-white'}`}>{data?.acc_length > 0 ? `${data.acc_length} bits` : '-'}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </section>
  );
};

export default OSNMADataView;