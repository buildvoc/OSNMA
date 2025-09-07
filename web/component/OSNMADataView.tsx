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
        return 'bg-teal-300';
      case 4:
        return 'bg-yellow-600';
      case 12:
        return 'bg-fuchsia-400';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      <div className="text-black font-semibold text-lg text-center mt-2 mb-6">SVID {svid}</div>

      {/* ADKD Data */}
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm">
            <span className="min-w-[80px] font-medium ">ADKD 0/12</span>
            <div className="flex flex-wrap gap-1">
              {adkdData?.ADKD0 && Object.keys(adkdData.ADKD0)?.map((adkdId) => (
                <span
                  key={adkdId}
                  className={`w-6 h-6 flex items-center justify-center px-4 font-semibold rounded-sm ${
                    adkdData.ADKD0[adkdId] ? 'bg-green-500 text-black' : 'bg-gray-500 text-gray-900'
                  }`}
                >
                  {adkdId}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="min-w-[80px] font-medium ">ADKD 4</span>
            <div className="flex flex-wrap gap-1">
              {adkdData?.ADKD4 && Object.keys(adkdData.ADKD4)?.map((adkdId) => (
                <span
                  key={adkdId}
                  className={`w-6 h-6 flex items-center justify-center px-4 font-semibold rounded-sm ${
                    adkdData.ADKD4[adkdId] ? 'bg-green-500 text-black' : 'bg-gray-500 text-gray-900'
                  }`}
                >
                  {adkdId}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 my-2" />

      {/* OSNMA Tags */}
      <div className="mb-2">
        <h4 className="text-sm text-gray-400 mb-1">Tags</h4>
        <div className="flex flex-wrap gap-1 text-sm">
          {osnmaTags && osnmaTags.length > 0 ? (
            osnmaTags.map((tag: any, index: number) => {
              const value = Array.isArray(tag) ? tag[0] : tag;
              const adkd = Array.isArray(tag) ? tag[1] : null;
              const sub = Array.isArray(tag) ? tag[2] : null;
              const hasSup = Array.isArray(tag) && tag[3] === 'FLX';
              
              const adkdColor = getAdkdColor(typeof adkd === 'number' ? adkd : null);

              return (
                <div
                  key={index}
                  className={`grid grid-flow-col grid-rows-2 gap-x-2 px-2 py-0.5 font-mono rounded-sm ${adkdColor}`}
                >
                  <span className='row-span-2 align-middle text-md font-semibold'>{value || '-'}</span>
                  <span className="col-span-2 text-[8px]"> {hasSup && 'F'}</span>
                  {sub !== null && <span className="col-span-2 text-[8px]">{sub}</span>}
                </div>
              );
            })
          ) : (
            <span>Not transmitting OSNMA</span>
          )}
        </div>
      </div>

      {/* OSNMA Key */}
      <div>
        <h4 className="text-sm text-gray-400 mb-1">Key</h4>
        <div className="bg-gray-300 px-2 py-1 rounded-md text-xs font-mono text-black overflow-hidden text-ellipsis">
          {osnmaKey || <span>Not transmitting OSNMA</span>}
        </div>
      </div>
    </div>
  );
};

const fullSatellites = Array.from({ length: 36 }, (_, index) => index);

// Main component updated to accept an array of OSNMA objects
const OSNMADataView: React.FC<{ data: OSNMA[] }> = ({ data }) => {
  const osnmaData = data?.[0];

  if (!osnmaData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
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
      (svid) => OSNMA_material_received?.[svid]?.mack_data?.tags?.length > 0
    );
  };

  const satelliteCount = getSatelliteNumbers(nav_data_received).length;
  const osnmaSatelliteCount = getActiveSatelliteNumbers(nav_data_received).length;
  const activeSVIDs = getSatelliteNumbers(nav_data_received);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-400 text-gray-800  p-8 min-h-screen font-sans">
      <div className="p-6 bg-gray-200 text-gray-800 rounded-xl shadow-lg border border-gray-300">
        <main className="container mx-auto">
          {/* Last Subframe Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-black mb-2 text-center">Last Subframe [GST]</h3>
            <p className="text-4xl font-extrabold text-black" id="GST">
              {metadata?.GST_subframe.join(' ') || '-'}
            </p>
          </div>

          {/* Status Tables Section */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Authenticated NMA Status */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-300">
              <h4 className="text-lg font-semibold text-black text-center py-2 bg-slate-300 rounded-t-md">Authenticated NMA Status</h4>
              <div className="grid grid-cols-6 p-2 text-sm text-center">
                <div className="font-bold text-black">NMAS</div>
                <div className="text-black">{OSNMA_status?.nma_status?.nmas || '-'}</div>
                <div className="font-bold text-black">CID</div>
                <div className="text-black">{OSNMA_status?.nma_status?.cid || '-'}</div>
                <div className="font-bold text-black">CPKS</div>
                <div className="text-black">{OSNMA_status?.nma_status?.cpks || '-'}</div>
              </div>
            </div>

            {/* Tesla Chain in Force */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-300">
              <h4 className="text-lg font-semibold text-black text-center py-2 bg-slate-300 rounded-t-md">Tesla Chain in Force</h4>
              <div className="grid grid-cols-6 p-2 text-sm text-center">
                <div className="font-bold text-black">PKID</div>
                <div className="text-black">{OSNMA_status?.tesla_chain_in_force?.pkid || '-'}</div>
                <div className="font-bold text-black">HF</div>
                <div className="text-black">{OSNMA_status?.tesla_chain_in_force?.hf || '-'}</div>
                <div className="font-bold text-black">MF</div>
                <div className="text-black">{OSNMA_status?.tesla_chain_in_force?.mf || '-'}</div>
              </div>
              <div className="grid grid-cols-6 p-2 text-sm text-center">
                <div className="font-bold text-black">KS</div>
                <div className="text-black">{OSNMA_status?.tesla_chain_in_force?.ks || '-'}</div>
                <div className="font-bold text-black">TS</div>
                <div className="text-black">{OSNMA_status?.tesla_chain_in_force?.ts || '-'}</div>
                <div className="font-bold text-black">MACLT</div>
                <div className="text-black">{OSNMA_status?.tesla_chain_in_force?.maclt || '-'}</div>
              </div>
              <div className="grid grid-cols-2 p-2 my-2 text-sm text-center">
                <p className="font-bold text-black mb-1">MACLT Sequence</p>
                <MacltSequenceDisplay sequence={OSNMA_status?.tesla_chain_in_force?.maclt_sequence} />
              </div>
            </div>

            {/* Public Key in Force */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-300">
              <h4 className="text-lg font-semibold text-black text-center py-2 bg-slate-300 rounded-t-md">Public Key in Force</h4>
              <div className="grid grid-cols-6 p-2 text-sm text-center">
                <div className="font-bold text-black">NPKID</div>
                <div className="text-black">{OSNMA_status?.public_key_in_force?.npkid || '-'}</div>
                <div className="font-bold text-black">NPKT</div>
                <div className="text-black">{OSNMA_status?.public_key_in_force?.npkt || '-'}</div>
                <div className="font-bold text-black">MID</div>
                <div className="text-black">{OSNMA_status?.public_key_in_force?.mid || '-'}</div>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 my-8" />

          {/* OSNMA Tag Verification Inputs */}
          <h3 className="text-xl font-bold text-black text-center mb-4">OSNMA Tag Verification Inputs</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 mb-8">
            <div className="grid grid-cols-1 justify-items-center-safe">
              <div className='grid grid-cols-6 gap-2'>
                <div className='col-span-2 text-end border-r border-black mr-2'>
                  <span className="text-sm font-medium text-black mr-2">Satellites in View</span>
                  <span className="text-sm font-medium text-black mr-2">{satelliteCount}</span>
                </div>
                <div className="col-span-4 flex flex-col items-start text-sm">
                  <div className="flex flex-wrap gap-1">
                    {fullSatellites?.map((_, index) => (
                      <span
                        key={`in-view-${index+1}`}
                        className={`w-5 h-5 flex items-center justify-center rounded-lg font-semibold text-sm ${
                          activeSVIDs?.includes(index+1)
                            ? 'bg-green-500 text-black'
                            : 'bg-gray-500 text-black'
                        }`}
                      >
                        {String(index+1).padStart(2, '0')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-6 gap-2'>
                <div className='col-span-2 text-end border-r border-black mr-2 pt-2'>
                  <span className="text-sm font-medium text-black mr-2">Satellites Transmitting OSNMA</span>
                  <span className="text-sm font-medium text-black mr-2">{osnmaSatelliteCount}</span>
                </div>
                <div className="col-span-4 flex flex-col items-start text-sm pt-2">
                  <div className="flex flex-wrap gap-1">
                    {fullSatellites?.map((_, index) => (
                      <span
                        key={`transmitting-${index+1}`}
                        className={`w-5 h-5 flex items-center justify-center rounded-lg font-semibold text-sm ${
                          OSNMA_material_received?.[index+1]?.mack_data?.tags?.length > 0
                            ? 'bg-green-500 text-black'
                            : 'bg-gray-500 text-black'
                        }`}
                      >
                        {String(index+1).padStart(2, '0')}
                      </span>
                    ))}
                  </div>
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

          <hr className="border-gray-300 my-8" />

          {/* Authenticated Data */}
          <h3 className="text-xl font-bold text-black text-center mb-4">Authenticated Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto">
            {fullSatellites?.map((_, index) => {
              const adkd0 = authenticated_nav_data['ADKD0'][index+1];
              const adkd4 = authenticated_nav_data['ADKD4'][index+1];
              const adkd12 = authenticated_nav_data['ADKD12'][index+1];
              return (
              <div key={`auth-data-${index+1}`} className="flex flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                <div className="flex-none py-2 px-6 flex items-center justify-center">
                  <span className="text-xl font-bold">{(index+1).toString().length == 1 ? `0${index+1}`: index+1}</span>
                </div>
                <div className="flex-1 p-2 font-mono text-xs">
                  <div className="flex flex-col divide-y divide-white">
                    <div className="flex bg-teal-50">
                      <div className="flex-1 px-2 py-1 text-center font-semibold">{adkd0 ? adkd0.iod || 'N/A' : '-'}</div>
                      <div className="flex-1 px-6 py-0.5 text-center">{adkd0?.last_gst ? `${adkd0.last_gst[0]} ${adkd0.last_gst[1]}` : '-'}</div>
                      <div className="flex-1 px-6 py-0.5 text-end">{adkd0?.acc_length ? `${adkd0.acc_length} bits` : '-'}</div>
                    </div>
                    <div className="flex bg-yellow-50">
                      <div className="flex-1 px-2 py-1 text-center font-semibold">{adkd4 ? adkd4.iod || 'N/A': '-'}</div>
                      <div className="flex-1 px-6 py-0.5 text-center">{adkd4?.last_gst ? `${adkd4.last_gst[0]} ${adkd4.last_gst[1]}` : '-'}</div>
                      <div className="flex-1 px-6 py-0.5 text-end">{adkd4?.acc_length ? `${adkd4.acc_length} bits` : '-'}</div>
                    </div>
                    <div className="flex bg-fuchsia-50">
                      <div className="flex-1 px-2 py-1 text-center font-semibold">{adkd12 ? adkd12.iod || 'N/A' : '-'}</div>
                      <div className="flex-1 px-6 py-0.5 text-center">{adkd12?.last_gst ? `${adkd12.last_gst[0]} ${adkd12.last_gst[1]}` : '-'}</div>
                      <div className="flex-1 px-6 py-0.5 text-end">{adkd12?.acc_length ? `${adkd12.acc_length} bits` : '-'}</div>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
        
            {/* {authenticated_nav_data && Object.keys(authenticated_nav_data)?.map((svid) => {
              const satelliteAuthData = authenticated_nav_data[svid];
              return (
                <div
                  key={`auth-data-${svid}`}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
                >
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-black text-lg mb-2">SVID {svid}</div>
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
                            <span className={`font-mono ${isMissing ? 'text-red-500' : 'text-black'}`}>{data?.iod || '-'}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-900">GST:</span>
                            <span className={`font-mono ${isMissing ? 'text-red-500' : 'text-black'}`}>{data?.start_gst?.length > 0 ? data.start_gst.join(' ') : '-'}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-900">Bits:</span>
                            <span className={`font-mono ${isMissing ? 'text-red-500' : 'text-black'}`}>{data?.acc_length > 0 ? `${data.acc_length} bits` : '-'}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })} */}
          </div>
        </main>
      </div>
    </section>
  );
};

export default OSNMADataView;