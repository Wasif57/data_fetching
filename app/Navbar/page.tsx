'use client';
import React from 'react';
import TaxInformationTable from '../components/page';
import Link from 'next/link';


const Home: React.FC = () => {
  return (
    <div>
      <Link href="/components">Tax Information Manager</Link>

      <TaxInformationTable />
    </div>
  );
};

export default Home;