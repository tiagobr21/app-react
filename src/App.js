  // Importação das Bibliotecas
  //Importando o hook useState
  //Importando a Biblioteca react-konva

import React, { useState } from 'react';
import { Stage, Layer, Circle } from 'react-konva';

function App() {

  // Define dois estados usando o hook useState. 
  // (circles) armazena os círculos desenhados, e (undoCircles) armazena os círculos que foram desfeitos.

  const [circles, setCircles] = useState([]);
  const [undoCircles, setUndoCircles] = useState([]);
  

  //Função para criar o circulo

  function handleStageClick (e){
    // Obtem a posição do ponteiro
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    // Criação de um novo círculo
    let newCircle = {
      x: pointerPosition.x,
      y: pointerPosition.y,
      radius:25,
      id: circles.length + 1,
    }


    //Configurando a criação do novo círculo
    setCircles([...circles, newCircle])

 
  }


  function handleUndo(){

    // se o array (circles) estiver vazio retornamos nada
    if(circles.length === 0) return;

    // obtem último circulo
    const lastCircle = circles[circles.length - 1];
    
    //Configurando a remoção do último círculo
    setUndoCircles([...undoCircles, lastCircle]);

    // Removendo o círculo do array
    setCircles(circles.slice(0,-1));
  }

  function handleRedo(){
    // se o array (undoCircles) estiver vazio retornamos nada
    if(undoCircles.length === 0) return;
    
    // obtem último circulo removido
    const lastUndoCircle  = undoCircles[undoCircles.length - 1];
    
    //Reposicionando o último círculo
    setCircles([...circles,lastUndoCircle]);
    setUndoCircles(undoCircles.slice(0,-1));

  }

  return(

   
    
    
    <div>
      {/* Renderiza um componente Stage do react-konva com um Layer. */}
       <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick}>
      <Layer>
      {/* Mapeia os círculos existentes no estado circles para elementos Circle. */}
          {circles.map((circle) => (
            <Circle
              key={circle.id}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fill="red"
            />
          ))}
        </Layer>
      </Stage> 
     {/* Renderiza botões para desfazer e refazer chamando as funções correspondentes. */}
          <button id='btn' onClick={handleUndo}>Desfazer</button>
          <button id='btn' onClick={handleRedo}>Refazer</button>

    </div>

   
  );

  
  
};

export default App;
