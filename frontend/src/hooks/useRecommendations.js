// useRecommendations.js

import { useState, useCallback } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const getRecommendations = useCallback((formData) => {
    try {
      setError(null);
      return recommendationService.getRecommendations(formData, products);
    } catch (err) {
      console.error('Erro ao obter recomendações:', err);
      setError('Não foi possível obter as recomendações. Tente novamente.');
      return [];
    }
  }, [products]);

  return { recommendations, getRecommendations, setRecommendations, error, clearError: () => setError(null) };
}

export default useRecommendations;
