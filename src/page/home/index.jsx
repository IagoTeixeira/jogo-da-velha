import { useState, useEffect } from "react"
import "./home.css"

export const Home = () =>{
    const [usuario, setUsuario] = useState(["","","","","","","","",""])

    const [usuarioDaVez, setUsuarioDaVez] = useState("X")
    const [UsuarioAnterior, setUsuarioAnterior] = useState("O")
    const [areasJogadas, setareasJogadas] = useState([])

    const resetar = () => {
        setUsuario(["","","","","","","","",""])
        setUsuarioDaVez("X")
        setUsuarioAnterior("O")
        setareasJogadas([])
    }

    const ganhador = () => {
        if(UsuarioAnterior === "X"){
            return "Jogador 1 venceu!"
        }else{
            return "Jogador 2 venceu!"
        }
    }

    useEffect(() => {
        const combinacoes = [  [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];
        for (let i = 0; i < combinacoes.length; i++) {
            if (usuario[combinacoes[i][0]] === UsuarioAnterior 
                && usuario[combinacoes[i][1]] === UsuarioAnterior
                && usuario[combinacoes[i][2]] === UsuarioAnterior){
                const modal = document.querySelector(".modal")
                setTimeout(() => {
                    modal.classList.toggle("invisible")
                    document.querySelector(".jogoEstado").innerHTML = ganhador()
                    return 
                }, 100);
               
                break
                }
                
        }if(areasJogadas.length === 9) {
            const modal = document.querySelector(".modal")
            setTimeout(() => {
                modal.classList.toggle("invisible")
                document.querySelector(".jogoEstado").innerHTML = "EMPATOU!"
                return resetar()
            }, 500);
        }
        
    }, [UsuarioAnterior])

    const marcador = (index) => {
        const usuarioNovo = [...usuario]
        usuarioNovo[index] = usuarioDaVez
        if(areasJogadas.indexOf(index) >= 0){
            return
        }
        setUsuario(usuarioNovo)
        setareasJogadas([...areasJogadas, index])
        if(usuarioDaVez === "X"){
            setUsuarioDaVez("O")
            setUsuarioAnterior("X")
        }else{
            setUsuarioDaVez("X")
            setUsuarioAnterior("O")
        }
        
    }
    return (
        <div className="App">
            <div className={"modal invisible"}>
                <div className="informacao">
                    <h2 className="jogoEstado"> </h2>
                    <button className="bt" onClick={() => { 
                        document.querySelector(".modal").classList.toggle("invisible")
                        resetar()
                    }}>Continuar</button>
                </div>
                
            </div>
            <h1>JOGO DA VELHA</h1>
            <p>É a vez do {usuarioDaVez}</p>
            <div className="table">
                {
                    usuario.map((value, i) => {
                        return <div key={i} className={"table" + i} onClick={() => marcador(i) }><p>{value}</p></div>
                    })
                }
            </div>
        </div>
       
    )  
    
}





