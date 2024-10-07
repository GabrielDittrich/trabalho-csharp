import React from 'react';
import MinhaImagem from '../imagens/golden-retriever.jpg'; // Importe a imagem

function Home() {
    return (
        <div className="principal">
            <h3>Seja Bem-Vindo Ao PetShop</h3>
            <img src={MinhaImagem} alt="Imagem de Boas-Vindas" /> {/* Use a variável que armazena o caminho da imagem */}
        </div>
    );
}

export default Home;
