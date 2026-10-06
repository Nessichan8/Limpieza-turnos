const personas = ["Irene", "Brenda", "Inés"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function generarTabla(año, mes) {
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  // Primer y último día del mes seleccionado
  const primerDiaMes = new Date(año, mes, 1);
  const ultimoDiaMes = new Date(año, mes + 1, 0);

  //Ajustar el inicio al lunes de la primera semana
  const inicioSemana = new Date(primerDiaMes);

  //Ajustar al lunes de esa semana
  const diaSemana = primerDiaMes.getDay(); // domingo = 0, lunes = 1...
  const diasDesdeLunes = diaSemana === 0 ? 6 : diaSemana - 1;
  
  inicioSemana.setDate(primerDiaMes.getDate() - diasDesdeLunes);

  const patrones = [
    ["Brenda", "Inés", "Irene"],
    ["Inés", "Irene", "Brenda"],
    ["Irene", "Brenda", "Inés"]
  ];

  let semana = 1;
  const semanaActual = new Date(inicioSemana);

  //Generar las semanas hasta cubrir todo el mes
  while (semanaActual <= ultimoDiaMes) {
    
    //Calcular el domingo de esa semana
    const finSemana = new Date(semanaActual);
    finSemana.setDate(semanaActual.getDate() + 6);

    const fila = document.createElement("tr");

    //Celda con el número de semana y su rango de fechas

    const celdaSemana = document.createElement("td");
    const inicio = semanaActual.getDate();
    const fin = finSemana.getDate();
    const inicioMes = semanaActual.getMonth();
    const finMes = finSemana.getMonth();

    let textoRango;
    if (inicioMes === finMes) {
      textoRango = `${inicio}-${fin} de ${meses[inicioMes]}`;
    } else {
      textoRango = `${inicio} de ${meses[inicioMes]} - ${fin} de ${meses[finMes]}`;
    }
    celdaSemana.textContent = `Semana ${semana}: ${textoRango}`;
    fila.appendChild(celdaSemana);

    // Asignación rotatoria de las tres tareas
    const asignaciones = patrones[(semana - 1) % patrones.length];
    for (let tarea = 0; tarea < 3; tarea++) {
      const celda = document.createElement("td");
      const nombre = asignaciones[tarea];
      celda.textContent = nombre;
      const color = colores[nombre];
      if (color) {
        celda.style.backgroundColor = color;
        celda.style.borderRadius = "8px";
      }
      fila.appendChild(celda);
    }

    tabla.appendChild(fila);

    //Avanzar exactamente siete días
    semana++;
    semanaActual.setDate(semanaActual.getDate() + 7);
  }
}

const colores = {
  "Irene": "#ffb3c1",  // rosa suave
  "Inés": "#b3d9ff",  // azul cielo
  "Brenda": "#d5b3ff"   // lila anime
};

// Evento cambio de mes
document.getElementById("mes").addEventListener("change", (e) => {
  const [año, mes] = e.target.value.split("-").map(Number);
  generarTabla(año, mes - 1);
});

//MMostrar automáticamente el mes actual

const mesInput = document.getElementById("mes");
const hoy = new Date();
mesInput.value = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}`;
generarTabla(hoy.getFullYear(), hoy.getMonth());
