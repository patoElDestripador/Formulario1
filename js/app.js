let contenedorPeronas = [];
mostrarUsuarios();
function guardarUsuario(){
    contenedorPeronas = obtenerInformacion()
    let nombres = document.getElementById('nombres');
    let apellidos = document.getElementById('apellidos');
    let correo = document.getElementById('correo');
    let persona = {
        nombres : nombres.value,
        apellidos : apellidos.value,
        correo : correo.value
    }
    let cont = buscarInformacion(nombres.value)
    console.log("valor de cont",cont    )
    if(cont == -1){
        console.log("entro a guardar")
        contenedorPeronas.push(persona);
        localStorage.setItem("usuarios", JSON.stringify(contenedorPeronas));
        mostrarUsuarios();
    }else{
        alert("El elemento es repetido")
    }
    nombres.classList.remove("is-valid");
    apellidos.classList.remove("is-valid");
    correo.classList.remove("is-valid");
    nombres.value = ""
    apellidos.value = ""
    correo.value = ""

}
function buscarInformacion(param) {
    let array = obtenerInformacion();
    return array.findIndex(e => e.nombres == param)
}
function obtenerInformacion(){  
    return  localStorage.getItem("usuarios")?JSON.parse(localStorage.getItem("usuarios")):[]
}
function eliminarUsuario(param){
    console.log("entro al eliminar con id ", param)
    let array = obtenerInformacion()
    array.splice(param, 1)
    localStorage.setItem("usuarios", JSON.stringify(array));
    mostrarUsuarios()
}
function mostrarUsuarios() {
    let tabla = document.getElementById('ContenidoTablaID')
    tabla.innerHTML = "";
    contenedorPeronas = obtenerInformacion();
    if(contenedorPeronas.length >= 0){
        for (let index = 0; index < contenedorPeronas.length; index++) {
                tabla.innerHTML += `
                    <tr>
                        <td id="resNombre">${contenedorPeronas[index].nombres}</td>
                        <td id="resApellido">${contenedorPeronas[index].apellidos}</td>
                        <td id="resCorreo">${contenedorPeronas[index].correo}</td>  
                        <td onClick="eliminarUsuario(${index})"><button type="button" class="btn btn-danger">Eliminar</button>            
                        </td>
                    </tr>
                    `
        }
    }
}
function validacion(){
    let nombres = document.getElementById('nombres');
    let apellidos = document.getElementById('apellidos');
    let correo = document.getElementById('correo');
    let errores = {
            nombres: false,
            apellidos: false,
            correo: false
        }
        if(!nombres.value){
            errores.nombres = true
            nombres.classList.add("is-invalid");
        }else{
            nombres.classList.remove("is-invalid");
            nombres.classList.add("is-valid");
            nombres.focus()
        }
        if(!apellidos.value){
            errores.apellidos = true
            apellidos.classList.add("is-invalid");
            apellidos.focus()
        }else{
            apellidos.classList.remove("is-invalid");
            apellidos.classList.add("is-valid");
        }
        if(!correo.value){
            errores.correo = true
            correo.classList.add("is-invalid");
            correo.focus()
        }else{
            correo.classList.remove("is-invalid");
            correo.classList.add("is-valid");
        }
        if(errores.nombres == false && errores.apellidos == false && errores.correo == false){
            guardarUsuario();
        }
}
