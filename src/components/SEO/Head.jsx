import React from 'react';

const Head = ({ title, description }) => {
    return (
        <head>
            <title>{title ? `${title} | ArtisanConnect` : 'ArtisanConnect - Services d\'artisans au Maroc'}</title>
            <meta name="description" content={description || 'Trouvez les meilleurs artisans au Maroc pour vos travaux de maison.'} />
        </head>
    );
};

export default Head;
