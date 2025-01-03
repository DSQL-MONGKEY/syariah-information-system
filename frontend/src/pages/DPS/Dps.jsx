import React from "react";
import AddDps from "./components/AddDps";
import ListDps from "./components/ListDps";

const Dps = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            Dewan Pengawas Syariah (DPS)
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manajemen Papper Riset Perbankan Syariah
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="space-y-8">
          {/* Button to open Upload File Modal */}
          <div className="flex justify-end mb-6">
            <AddDps />
          </div>

          {/* Table Section */}
          <section className="bg-white p-6 rounded-md shadow-md">
            <ListDps />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dps;
