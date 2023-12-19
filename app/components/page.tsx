'use client';
import React, { useState, useEffect } from 'react';

interface Employee {
  id: number;
  employeeId: string;
  employeeName: string;
  salary: number;
  tax: number;
}

async function getTaxInformation(): Promise<Employee[]> {
  const response = await fetch('http://localhost:3000/tax_info/tax');

  if (!response.ok) {
    throw new Error('Failed to fetch tax information');
  }

  const data = await response.json();
  return data as Employee[];
}

const TaxInformationManager: React.FC = () => {
  const [taxInformation, setTaxInformation] = useState<Employee[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTaxInformation();
        setTaxInformation(data);
      } catch (error) {
        console.error(error);
        setError('Error fetching tax information');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tax Information Manager</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Employee ID</th>
            <th className="p-2 border border-gray-300">Employee Name</th>
            <th className="p-2 border border-gray-300">Salary</th>
            <th className="p-2 border border-gray-300">Tax</th>
          </tr>
        </thead>
        <tbody>
          {taxInformation.map((employee) => (
            <tr key={employee.id}>
              <td className="p-2 border border-gray-300">{employee.employeeId}</td>
              <td className="p-2 border border-gray-300">{employee.employeeName}</td>
              <td className="p-2 border border-gray-300">{employee.salary}</td>
              <td className="p-2 border border-gray-300">{employee.tax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxInformationManager;
