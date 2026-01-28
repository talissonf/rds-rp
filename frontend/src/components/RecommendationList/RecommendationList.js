import React, { useMemo } from 'react';

function RecommendationList({ recommendations }) {
  const renderedList = useMemo(() => {
    return recommendations.map((recommendation, index) => (
      <li key={index} className="mb-2">
        {recommendation.name}
      </li>
    ));
  }, [recommendations]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {renderedList}
      </ul>
    </div>
  );
}

export default RecommendationList;
