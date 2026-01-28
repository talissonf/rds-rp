import { useEffect, useState, useCallback } from 'react';
import getProducts from '../services/product.service';

const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const products = await getProducts();
      const allPreferences = [];
      const allFeatures = [];

      setProducts(products);

      products.forEach((product) => {
        if (product.preferences) {
          allPreferences.push(...product.preferences);
        }
        if (product.features) {
          allFeatures.push(...product.features);
        }
      });
      setPreferences([...new Set(allPreferences)]);
      setFeatures([...new Set(allFeatures)]);
    } catch (err) {
      console.error('Erro ao obter os produtos:', err);
      setError('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { preferences, features, products, loading, error, retry: fetchData };
};

export default useProducts;
