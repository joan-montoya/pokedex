import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
    const [result, setResult] = React.useState([]);
    const [poke, setPoke] = React.useState([]);
    const [load, setLoad] = React.useState('true');
    const [counter, setCounter] = useState(0);
    const [nombre, setNombre] = useState("");
    const [imagen, setImage] = useState("");
    const [pokearr, setPokA] = React.useState([]);
    const [inicio, setIn] = useState(0);
    const [Final, setFin] = useState(9);

    const arr = [];

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
            .then((response) => response.json())
            .then((data) => setResult(
                data.results.map((item) => {
                    fetch(item.url)
                        .then((response) => response.json())
                        .then((allpokemon) => arr.push(allpokemon));
                    setPoke(arr);
                }),
            ));
    }, []);

    setTimeout(() => {
        setLoad(false);
    }, 1000);

    function llamar(){
      if(poke.length >= 90){
        if(pokearr.length <= 9){
          for(var i = inicio; i <= Final; i++){
            pokearr.push(poke[i]);
          }
        }else{
          setPokA([])
          
        }
      }
      console.log(pokearr)
    }

    // function Nombre(){
    //   for(var i = 0; i <= 10; i++){
    //     pokearr.push(poke[i]);
    //   }
    //   console.log(pokearr);
    //   setNombre(pokearr[counter].name);
    //   setImage(pokearr[counter].sprites.other.dream_world.front_default);
    // }

      // <img className='imagen' src={imagen} width="300px" height="300px"></img>

      // <h1> {nombre}</h1>

      
      // <button className='boton' onClick={() => {
      //   setCounter(counter = counter - 1); Nombre();
      // }}><h3>Anterior</h3></button>
      // <button className='boton' onClick={() => {
      //   setCounter(counter + 1); Nombre();
      // } }><h3>Siguiente</h3></button> 
      return (
        <div className="App">
           <div className='pokegallery'>
            {llamar()}
            { load ? (
              <p>Loading...</p>
            ) :  (
    
              pokearr.map((img, i) => (
                <div className='card' id={img.id} key={img.id}>
                  <h3>id: {pokearr[i].id} - <b>{pokearr[i].name}</b></h3>
                  <img className='imagen' src={pokearr[i].sprites.other.dream_world.front_default}/>
                  <img className='imagen' src={pokearr[i].sprites.back_default}/>
                    <div className='container'>
                      <p><b>Xp base: </b>{pokearr[i].base_experience}</p>
                      <p className='habilidades'><b>Movimientos</b> <br></br>  
                      {pokearr[i].moves[0].move.name}, {pokearr[i].moves[1].move.name} <br></br>
                      {pokearr[i].moves[2].move.name}, {pokearr[i].moves[3].move.name}
                      {/* {pokearr[i].abilities[0].ability.name}, {pokearr[i].abilities[1].ability.name} */} 
                      </p> 
                      <div className={pokearr[i].types[0].type.name}>
                        <p className='habilidades'>{pokearr[i].types[0].type.name}</p> 
                      </div>
                      
                  </div>
                </div>

                
              ))
            )}
    
    
    
    </div>
    <button className='boton' onClick={() => {setIn(inicio - 9); setFin(Final - 9);} }><h3>Atras</h3></button>
    <button className='boton' onClick={() => {setIn(inicio + 10); setFin(Final + 10);} }><h3>Siguiente</h3></button>

        </div>
      );
    }
    
    export default App;

