// Form.js

import React, { useCallback, useMemo, useState } from 'react';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

function Form({ onRecommendationsChange }) {
  const { preferences, features, products, loading, error: productsError, retry } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations, error: recommendationsError } = useRecommendations(products);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    try {
      const dataRecommendations = getRecommendations(formData);
      if (typeof onRecommendationsChange === 'function') {
        onRecommendationsChange(dataRecommendations);
      }
    } catch (err) {
      console.error('Erro ao processar recomendações:', err);
      setSubmitError('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
    }
  }, [getRecommendations, formData, onRecommendationsChange]);

  const onPreferenceChange = useCallback((selected) => {
    handleChange('selectedPreferences', selected);
  }, [handleChange]);

  const onFeatureChange = useCallback((selected) => {
    handleChange('selectedFeatures', selected);
  }, [handleChange]);

  const onRecommendationTypeChange = useCallback((selected) => {
    handleChange('selectedRecommendationType', selected);
  }, [handleChange]);

  const isSubmitDisabled = useMemo(() => {
    return loading || formData.selectedRecommendationType === '' || (
      !formData.selectedPreferences.length &&
      !formData.selectedFeatures.length
    );
  }, [
    loading,
    formData.selectedRecommendationType,
    formData.selectedPreferences.length,
    formData.selectedFeatures.length,
  ]);

  const displayError = productsError || recommendationsError || submitError;

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <p className="text-gray-600 text-center">Carregando produtos...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <p className="text-red-600 mb-4">{productsError}</p>
        <button
          type="button"
          onClick={retry}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {displayError && !productsError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {displayError}
        </div>
      )}
      <Preferences
        preferences={preferences}
        onPreferenceChange={onPreferenceChange}
      />
      <Features
        features={features}
        onFeatureChange={onFeatureChange}
      />
      <RecommendationType
        onRecommendationTypeChange={onRecommendationTypeChange}
      />
      <SubmitButton
        text="Obter recomendação"
        disabled={isSubmitDisabled}
      />
    </form>
  );
}

export default Form;
