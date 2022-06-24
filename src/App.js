import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
    const [result, setResult] = React.useState([]);
    const [poke, setPoke] = React.useState([]);
    const [load, setLoad] = React.useState('true');
    const [info, setInf] = React.useState('true');
    const [nombre, setNombre] = useState("");
    const [imagen, setImage] = useState("");
    const [imagenT, setImageT] = useState("");
    const [color, setColor] = useState("");
    const [pokearr, setPokA] = React.useState([]);
    const [inicio, setIn] = useState(0);
    const [Final, setFin] = useState(9);
    const [posicion, setPo] = useState(0);


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
        document.body.style.backgroundColor = '#a5e7fa';
    }, 1000);

    function llamar(){
      if(Final >= 199){
        setFin(9);
        setIn(0);
      }
      if(inicio < 0){
        setFin(9);
        setIn(0);
      }
      if(poke.length >= 90){
        if(pokearr.length <= 9){
          for(var i = inicio; i <= Final; i++){
            pokearr.push(poke[i]);
          }
        }else{
          setPokA([])
          
        }
      }
    }

    function barral(val){
      setImage(pokearr[val].sprites.other.dream_world.front_default);
      setImageT(pokearr[val].sprites.back_default);
      setNombre(pokearr[val].name.toUpperCase());
      setColor(pokearr[val].types[0].type.name);
      setPo(val);
    }
      return (
        <div className="App">
           <div className='pokegallery'>
           <h1>POKEDEX POKE API</h1>
           
            {llamar()}
            { load ? (
              <p>Loading...</p>
            ) :  (

              
    
              pokearr.map((img, i) => (
                <div className='card' id={pokearr[i].types[0].type.name} key={img.id} name={pokearr[i].types[0].type.name} onClick={() => {setInf(false);barral(i)}}>
                    <p className='ids'>Id: {pokearr[i].id} </p>
                    <p className='ids1'>Type: {pokearr[i].types[0].type.name.toUpperCase()}</p>
                  <br></br>
                  <h3><b>{pokearr[i].name.toUpperCase()}</b></h3>
                  <img className='imagen' src={pokearr[i].sprites.other.dream_world.front_default}/>
                </div>
              ))
            )}
          </div>
          <div className='barralateral'>
            {info ?
              <p>Loading...</p> : 
              <div className={color}>
                <img className='icono' src={imagen}/>
                <img className='imagenb' src={imagen}/>
                  <br></br>
                  <img className='imagenb1' src={imagenT}/>
                  <div className='info'>
                    <div className='informacion'>
                      <h1>{nombre}</h1>
                        <p><b>Xp base: </b>{pokearr[posicion].base_experience}</p>
                        <p><b>height: </b> {pokearr[posicion].height}</p>
                        <p><b>weight: </b> {pokearr[posicion].weight}</p>
                        <p className='habilidades'> Type: {pokearr[posicion].types[0].type.name}</p>
                        <p><b>Movimientos</b> <br></br>  
                          {pokearr[posicion].moves[0].move.name}, {pokearr[posicion].moves[1].move.name} <br></br>
                          {pokearr[posicion].moves[2].move.name}, {pokearr[posicion].moves[3].move.name}
                        </p> 
                    </div>
                  </div>
              </div>
            }
          </div>
            <div className='botona' onClick={() => {setIn(inicio - 9); setFin(Final - 9);} }><h3 className='order'>Atras</h3></div>
            <div className='botons' onClick={() => {setIn(inicio + 10); setFin(Final + 10);} }><h3 className='order'>Siguiente</h3></div>
            <div className='refres' onClick={() => window.location.reload()}> <h3 className='refresText'>Reload</h3></div>
          </div>
          
      );
    }
    
    export default App;

