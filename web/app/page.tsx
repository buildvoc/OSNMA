'use client'

import OSNMADataView from '@/component/OSNMADataView';
import OSNMALegend from '@/component/OSNMALegend';
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data, error, isLoading } = useSWR('/status_log.json', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <main className="w-full">
        {data && data.length > 0 ? 
        <>
          <OSNMADataView data={data} /> 
          <OSNMALegend />
        </>
        : 
        <>Data not found</>
        }
      </main>
    </div>
  );
}
