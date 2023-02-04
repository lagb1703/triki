function no_triki(...data){
    if(typeof(data[0]) == "number" || typeof(data[1]) == "number" || typeof(data[2]) == "number" ){
        return (data[0] == data[1] || data[1] == data[2] || data[0] == data[1]);
    }
    return true;
}

function triki(...data){
    return (data[0] == data[1] && data[1] == data[2]);
}

function derrota(array){
    return (no_triki(array[0], array[1], array[2]) 
        && no_triki(array[3], array[4], array[5]) 
        && no_triki(array[6], array[7], array[8]) 
        && no_triki(array[0], array[3], array[6]) 
        && no_triki(array[1], array[4], array[7]) 
        && no_triki(array[2], array[5], array[8]) 
        && no_triki(array[0], array[4], array[8]) 
        && no_triki(array[2], array[4], array[6]));
}

function buscar(letra, ...data){
    if(data[0] == data[1] && data[0] == letra && typeof(data[2]) == "number"){
        return data[2];
    }else if(data[0] == data[2] && data[0] == letra && typeof(data[1]) == "number"){
        return data[1];
    }else if(data[1] == data[2] && data[1] == letra && typeof(data[0]) == "number"){
        return data[0];
    }
    return -1;
}

function victoria(array){
    return triki(array[0], array[1], array[2]) 
        || triki(array[3], array[4], array[5]) 
        || triki(array[6], array[7], array[8]) 
        || triki(array[0], array[3], array[6]) 
        || triki(array[1], array[4], array[7]) 
        || triki(array[2], array[5], array[8]) 
        || triki(array[0], array[4], array[8]) 
        || triki(array[2], array[4], array[6]);
}

function mover(array, movimiento){
    if(movimiento < 10){
        if(typeof(array[movimiento]) == "number"){
            return true;
        }
    }
    return false;
}

function juego(array, turno, jugadores, h2, contenedor, imagenes) {
    if(!victoria(array)){
        if(!derrota(array)){
            h2.textContent = "Siguiente " + jugadores[turno%2];
            contenedor.style.backgroundImage = "url(" + imagenes[turno%2] + ")";
            return true;
        }else{
            h2.textContent = "Ningun movimiento valido para ganar. Empate epico!!!!!";
        }
    }else{
        h2.textContent = "Victoria magistral del jugador " + jugadores[(turno + 1)%2] + " en el turno " + turno + "...";
        contenedor.style.backgroundImage = "url(" + imagenes[(turno + 1)%2] + ")";
    }
    return false;
}

function IA(array, turno){
    let mov = -1;
    let j = [[array[0], array[1], array[2]]
            , [array[3], array[4], array[5]]
            , [array[6], array[7], array[8]]
            , [array[0], array[4], array[8]]
            , [array[2], array[4], array[6]]
            , [array[0], array[3], array[6]]
            , [array[1], array[4], array[7]]
            , [array[2], array[5], array[8]]];
    j.map((array)=>{
        let x = buscar((turno%2==0)?"x":"y", array[0], array[1], array[2]);
        if(x != -1){
            mov = x;
        }
    })
    if(mov == -1){
        j.map((array)=>{
            let x = buscar(((turno+1)%2==0)?"x":"y", array[0], array[1], array[2]);
            if(x != -1){
                mov = x;
            }
        })
    }
    if(mov == -1){
        if(mover(array, 4)){
            mov = 5;
        }else if(mover(array, 0)){
            mov = 1;
        }else if(mover(array, 2)){
            mov = 3;
        }else if(mover(array, 6)){
            mov = 7;
        }else if(mover(array, 8)){
            mov = 9;
        }else if(mover(array, 1)){
            mov = 2;
        }else if(mover(array, 3)){
            mov = 4;
        }else if(mover(array, 5)){
            mov = 6;
        }else if(mover(array, 7)){
            mov = 8;
        }
    }
    return mov;
}

function mov_ia(tabla, ta, turno){
    let mov = IA(tabla, turno);
    tabla[mov - 1] = (turno%2==0)?"x":"y";
    ta[mov - 1].style.backgroundImage = "url(/media/svg/smart_toy_FILL0_wght400_GRAD0_opsz48.svg)";
    ta[mov - 1].style.cursor = "inherit";
}

function conf(ta, check, imagenes, h2, jugadores, contenedor){
    let tablero = [1,2,3,4,5,6,7,8,9];
    let fichas = imagenes;
    var turno = 0;
    ta.map((botton)=>{
        botton.style.backgroundImage = "none";
        botton.style.cursor = "pointer";
    });
    if(check.checked){
        fichas[1] = "/media/svg/smart_toy_FILL0_wght400_GRAD0_opsz48.svg";
        jugadores[1] = "Robot";
    }
    let sigue = true;
    ta.map((botton, n)=>{
        botton.style.backgroundImage = "none";
        botton.addEventListener("click",()=>{
            if(sigue && typeof(tablero[n]) == "number"){
                tablero[n] = (turno%2==0)?"x":"y";
                botton.style.backgroundImage = "url(" + fichas[turno%2] + ")";
                botton.style.cursor = "inherit";
                turno++;
                if(fichas[turno%2] == "/media/svg/smart_toy_FILL0_wght400_GRAD0_opsz48.svg"){
                    mov_ia(tablero, ta, turno);
                    turno++;
                }
            }
            sigue = juego(tablero, turno, jugadores, h2, contenedor, fichas);
        }, {once:true})
    })
}

document.addEventListener("DOMContentLoaded", ()=>{
    let d_imagen = document.getElementsByClassName("imagen")[0];
    d_imagen.style.display = "block";
    d_imagen.style.border = "0";
    let i = 0;
    let arriba = document.getElementsByClassName("buton")[0];
    let oculto = document.getElementsByClassName("hide")[0];
    arriba.addEventListener("click", ()=>{
        if(i%2 == 0){
            arriba.style.backgroundImage ="url(/media/svg/expand_less_FILL0_wght400_GRAD0_opsz48.svg)";
            oculto.classList.remove("hide")
        }else{
            arriba.style.backgroundImage ="url(/media/svg/expand_more_FILL0_wght400_GRAD0_opsz48.svg)";
            oculto.classList.add("hide")
        }
        i++;
    });

    let radius_yes = document.getElementById("yes");
    let radius_no = document.getElementById("no");
    radius_yes.addEventListener("change",()=>{
        oculto.children[1].children[1].style.display = "none";
    });
    radius_no.addEventListener("change",()=>{
        oculto.children[1].children[1].style.display = "grid";
    });
    let imagenes = ["/media/svg/o.svg", "/media/svg/x.svg"]
    let ta = [...document.getElementsByClassName("tablero")[0].children];
    let previu = document.getElementsByClassName("imagenes");
    let i_botton = [...document.getElementsByClassName("loader")];
    i_botton.map((input, n)=>{
        input.addEventListener("change",()=>{
            let f = new FileReader();
            f.readAsDataURL(input.files[0]);
            f.onload = ()=>{
                imagenes[n] = f.result;
                previu[n].style.backgroundImage = "url(" + f.result + ")";
            }
        });
    });
    [...document.getElementsByClassName("cargar")].map((n, j)=>{
        n.addEventListener("click", (e)=>{
            e.preventDefault();
            arriba.style.backgroundImage ="url(/media/svg/expand_more_FILL0_wght400_GRAD0_opsz48.svg)";
            oculto.classList.add("hide");
            if(j == 0){
                i++;
            }
            document.getElementsByClassName("h2")[0].textContent = "Jugador";
            d_imagen.style.backgroundImage = "none";
            let nombre_1 = document.getElementsByClassName("nombre")[0].value;
            let nombre_2 = document.getElementsByClassName("nombre")[1].value;
            conf(ta, radius_yes, imagenes, document.getElementsByClassName("h2")[0], 
            [(nombre_1 == "")?"Jugador 1":nombre_1, (nombre_2 == "")?"Jugador 2":nombre_2], d_imagen);
        });
    });
});