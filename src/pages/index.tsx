"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";

// disini saya mendeklarasikan tipe data, karna di typscript tipe datanya harus di deklarasikan
interface Pokemon {
  name: string;
  url: string;
}
interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

// Promise<{ props: PokemonData }> maksutnya function tersebut mengembalikan sebuah promise & yg dikembalikan oleh promise adalah sebuah objeck dengan properti props dan properti ini memiliki tipe yg ditentukan oleh PokemonData yang sudah saya deklarasikan di atas
// export const getStaticProps = async (): Promise<{ props: PokemonData }> => {
//   const res = await axios.get(
//     "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
//   );
//   const data: PokemonData = await res.data;
//   return { props: { ...data } };
// };

const PAGE_SIZES = [10, 15, 20];
//React.FC<PoemonData> adalah singkatan dari React functional component sedangkan <PokemonData> adalah tipe props yang diharapkan oleh komponen
const PokemonList: React.FC<PokemonData> = (data) => {
  const { count, next, previous, results } = data;
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  console.log(totalRecords);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (page - 1) * pageSize
        }&limit=${pageSize}`
      );
      const data: PokemonData = response.data;
      setPokemonData(data.results);
      setTotalRecords(data.count);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  console.log(pokemonData);
  return (
    <div className="mx-20 pt-10 gap-10 pb-10">
      <h1 className="text-xl font-bold pb-10">Pokemon List</h1>
      <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        // provide data
        records={pokemonData}
        // define columns
        columns={[
          { accessor: "name", textAlign: "left", width: 440 },
          { accessor: "url" },
        ]}
        totalRecords={totalRecords}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        paginationActiveBackgroundColor="black"
        paginationActiveTextColor="blue"
      />
    </div>
  );
};

export default PokemonList;
