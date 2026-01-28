// recommendation.service.js
const scorers = {
  preferences: (product, { preferencesSet }) => {
    if (!preferencesSet.size || !product.preferences) return 0;
    return product.preferences.filter(p => preferencesSet.has(p)).length;
  },

  features: (product, { featuresSet }) => {
    if (!featuresSet.size || !product.features) return 0;
    return product.features.filter(f => featuresSet.has(f)).length;
  },
};

const strategies = {
  SingleProduct: (scoredProducts) => {
    if (!scoredProducts.length) return [];
    const maxScore = scoredProducts[0].score;
    const lastWithMaxScore = scoredProducts
      .filter(({ score }) => score === maxScore)
      .pop();
    return lastWithMaxScore ? [lastWithMaxScore.product] : [];
  },

  MultipleProducts: (scoredProducts) => {
    return scoredProducts.map(({ product }) => product);
  },
};

const calculateScore = (product, context) => {
  return Object.values(scorers).reduce(
    (total, scorer) => total + scorer(product, context),
    0
  );
};

const getRecommendations = (formData = {}, products = []) => {
  const { selectedPreferences = [], selectedFeatures = [], selectedRecommendationType } = formData;

  const strategy = strategies[selectedRecommendationType];
  if (!Array.isArray(products) || !products.length || !strategy) {
    return [];
  }

  const context = {
    preferencesSet: new Set(selectedPreferences),
    featuresSet: new Set(selectedFeatures),
  };

  const scoredProducts = products
    .map(product => ({ product, score: calculateScore(product, context) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return strategy(scoredProducts);
};

export default { getRecommendations };
