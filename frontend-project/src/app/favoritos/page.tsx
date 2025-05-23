'use client'
import { useEffect, useState } from "react";
import { CarProps } from '@/utils/types/cars';
import { Container } from "@/components/container";
import CatalogItem from "../../components/carDetails/Details"; 

export default function Home() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [carData, setCarData] = useState<CarProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    const idFromPath = pathArray[pathArray.length - 1];
    setId(idFromPath);

    if (idFromPath) {
      fetch(`https://ecommerce-repository.onrender.com/catalog/${idFromPath}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar os dados do carro');
          }
          return response.json();
        })
        .then(data => {
          console.log('Dados recebidos:', data);
          setCarData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar os dados do carro', error);
          setError('Erro ao carregar os dados do carro. Tente novamente mais tarde.');
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <main className="items-center">
      <Container>
        <section className="w-full mx-auto p-4">
        <h1 className=" text-3xl font-bold">Pagína favoritos TESTE</h1>
          {isLoading ? (
            <p className="text-white">Carregando dados...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            carData && (
              <div key={carData._id}>
                <CatalogItem data={carData} />
              </div>
            )
          )}
        </section>
      </Container>
    </main>
  );
}
