// Importación de módulos y componentes necesarios
import React, { useState } from 'react';
import Help from './Help';
import './App.css';
import logo from './assets/logo.png';
import borrar from './assets/borrar.png';
import ayuda from './assets/ayuda.png';

// Definición del componente App
function App() {
  // Definición de los estados iniciales de la aplicación
  const [rut, setRut] = useState('');
  const [numDocumento, setNumDocumento] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  // Función para formatear el RUT
  const formatRut = (rut) => {
    let actual = rut.replace(/^0+/, "");
    if (actual !== '' && actual.length > 1) {
      let sinPuntos = actual.replace(/\./g, "");
      let actualLimpio = sinPuntos.replace(/-/g, "");
      let inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      let dv = actualLimpio.substring(actualLimpio.length - 1);
      let rutFormateado = "";
      while (inicio.length > 3) {
        rutFormateado = "." + inicio.substr(inicio.length - 3) + rutFormateado;
        inicio = inicio.substring(0, inicio.length - 3);
      }
      return inicio + rutFormateado + "-" + dv;
    } else {
      return rut;
    }
  };

  // Manejador de evento para cambiar el RUT
  const handleRutChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setRut(formatRut(rut));
    } else {
      setRut(e.target.value);
    }
  };

  // Función para mostrar la ayuda
  const handleHelpClick = () => {
    setShowHelp(true);  // Cambia el estado showHelp a true
  };

  // Función para cerrar la ayuda
  const closeHelp = () => {
    setShowHelp(false);  // Cambia el estado showHelp a false
  };

  // Manejador de evento para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene la acción por defecto del formulario
    setLoading(true);  // Cambia el estado loading a true

    // Validación de campos
    if (!rut || !numDocumento || !fechaDesde || !fechaHasta) {
      alert("Por favor, complete todos los campos antes de consultar.");
      setLoading(false);
      return;
    }

    try {
      // Realiza la petición al servidor
      const response = await fetch('http://localhost:3001/qrasist_cloud_back', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, numDocumento, fechaDesde, fechaHasta }),
      });

      // Convierte la respuesta a JSON
      const data = await response.json();
      setResultados(data);  // Actualiza el estado resultados con los datos recibidos

      if (data.length === 0) {
        alert("No se encontraron resultados para los datos proporcionados.");
      }

    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    }

    setLoading(false);  // Cambia el estado loading a false
  };

  // Función para resetear los campos del formulario
  const handleReset = () => {
    setRut('');
    setNumDocumento('');
    setFechaDesde('');
    setFechaHasta('');
    setResultados([]);
  };

  // Cálculo de las horas totales trabajadas y extras
  const totalHorasTrabajadas = resultados.reduce((acc, curr) => acc + parseFloat(curr.HorasTrabajadas), 0);
  const totalHorasExtra = resultados.reduce((acc, curr) => acc + parseFloat(curr.HorasExtra), 0);

  // Retorno del JSX del componente
  return (
    <div className="App">
      <img src={logo} alt="Logo de la Aplicación" className="app-logo"/>
        {showHelp ? (
            <Help closeHelp={closeHelp} />
        ) : (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="rut-label" style={{ fontSize: '16px' }}>Rut *</label>
                        <input
                            name="rut"
                            value={rut}
                            onChange={(e) => setRut(e.target.value)}
                            onKeyDown={handleRutChange}
                            placeholder="ejemplo: 11111111-1"
                            maxLength="12"
                            title="Ingresa tu Rut"
                            className="text-field"
                        />
                    </div>
                    <div className="input-group">
                        <label className="num-doc-label" style={{ fontSize: '16px' }}>Número de Documento *</label>
                        <input
                            name="numDocumento"
                            value={numDocumento}
                            onChange={(e) => setNumDocumento(e.target.value)}
                            placeholder="ejemplo: 514123456"
                            maxLength="9"
                            title="Ingresa tu numero de documento"
                            className="text-field"
                        />
                    </div>
                    <div className="input-group date-container">
                        <div>
                            <label className="date-desde-label" style={{ fontSize: '16px' }}>Fecha Desde *</label>
                            <input
                                name="fechaDesde"
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => setFechaDesde(e.target.value)}
                                title="Ingresa una fecha a consultar"
                                className={`text-field ${fechaDesde ? 'input-with-value' : ''}`}
                                placeholder="DD-MM-AAAA"
                            />
                        </div>
                        <div>
                            <label className="date-hasta-label" style={{ fontSize: '16px' }}>Fecha Hasta *</label>
                            <input
                                name="fechaHasta"
                                type="date"
                                value={fechaHasta}
                                onChange={(e) => setFechaHasta(e.target.value)}
                                title="Ingresa una fecha a consultar"
                                className={`text-field ${fechaHasta ? 'input-with-value' : ''}`}
                                placeholder="DD-MM-AAAA"
                            />
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={handleReset} title="Borrar búsqueda">
                          <img src={borrar} alt="Icono Limpiar" style={{ height: '20px', verticalAlign: 'middle' }} />
                        </button>
                        <button className="button-consulta" title="Consultar mes" type="submit">Consultar</button>
                        <button type="button" onClick={handleHelpClick} title="Ayuda">
                          <img src={ayuda} alt="Icono Ayuda" style={{ height: '20px', verticalAlign: 'middle' }} />
                        </button>
                        
                    </div>

                </form>

                {loading && <div className="loader"></div>}

                <div className="resultados">
                    {resultados.length > 0 && (
                        <div>
                            <p>Empresa:<br /><strong>{resultados[0].NomEmpresa}</strong></p>
                            <p>Nombre completo:<br /><strong>{resultados[0].Nombre} {resultados[0].Apellido}</strong></p>
                            <p>Horas trabajadas:<br /><strong>{totalHorasTrabajadas} horas</strong></p>
                            <p>Horas extra:<br /><strong>{totalHorasExtra} horas</strong></p>
                        </div>
                    )}
                </div>
            </>
        )}
    </div>
  );
}

// Exporta el componente App como exportación predeterminada
export default App;
