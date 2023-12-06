import React, { useState, useEffect } from 'react';
import Help from './Help';
import './App.css';
import logo from './assets/logo.png';
import borrar from './assets/borrar.png';
import ayuda from './assets/ayuda.png';
import Resultados from './Resultados';
import { differenceInMonths } from 'date-fns';

export let diasRegistradosGlobal = [];

function App() {
  const [rut, setRut] = useState('');
  const [numDocumento, setNumDocumento] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showResultadosDialog, setShowResultadosDialog] = useState(false);
  const [diasRegistrados, setDiasRegistrados] = useState([]);

  const sonDatosValidos = () => {
    return rut.trim() !== '' && numDocumento.trim() !== '' && fechaDesde.trim() !== '' && fechaHasta.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!sonDatosValidos()) {
        alert("Por favor, complete todos los campos antes de consultar.");
        setLoading(false);
        return;
    }

    const fechaDesdeObj = new Date(fechaDesde);
    const fechaHastaObj = new Date(fechaHasta);

    if (differenceInMonths(fechaHastaObj, fechaDesdeObj) > 6) {
        alert("Puedes consultar hasta un máximo de 6 meses.");
        setLoading(false);
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/qrasist_cloud_back', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rut, numDocumento, fechaDesde, fechaHasta }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
                alert("No se encontraron resultados para los datos proporcionados.");
            } else {
                setResultados(data);

                diasRegistradosGlobal = data.map(d => ({
                    fecha: d.entrance.split('T')[0],
                    horasTrabajadas: d.workedHours,
                    horasExtra: d.extraHours,
                }));

                setDiasRegistrados(diasRegistradosGlobal);
                setShowResultadosDialog(true);
            }
        } else {
            const errorData = await response.json();
            alert(`Error del servidor: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Error al conectarse al servidor:", error);
        alert(`Error al conectarse al servidor: ${error.message}`);
    }

    setLoading(false);
};


  
  const handleReset = () => {
    setRut('');
    setNumDocumento('');
    setFechaDesde('');
    setFechaHasta('');
    setResultados([]);
    setDiasRegistrados([]);
  };

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  const closeHelp = () => {
    setShowHelp(false);
  };

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

  const handleRutChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setRut(formatRut(rut));
    } else {
      setRut(e.target.value);
    }
  };

  useEffect(() => {
    const diasRegistradosActualizados = resultados.map((d) => ({
      fecha: d.fecha,
      horasTrabajadas: d.horasTrabajadas,
      horasExtra: d.horasExtra,
    }));

    setDiasRegistrados(diasRegistradosActualizados);
  }, [resultados]);

  const totalHorasTrabajadas = resultados.reduce((acc, curr) => acc + parseFloat(curr.HorasTrabajadas), 0);
  const totalHorasExtra = resultados.reduce((acc, curr) => acc + parseFloat(curr.HorasExtra), 0);

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
                placeholder="Ejemplo: 11111111-1"
                maxLength="10"
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
                placeholder="Ejemplo: 514123456"
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
              <button className="button-consulta" title="Consultar mes" type="submit">Consultar</button>
              <div className="button-group">
                <button className="button-borrar" type="button" onClick={handleReset} title="Borrar búsqueda">
                  <img src={borrar} alt="Icono Limpiar" />
                </button>
                <button className="button-ayuda" type="button" onClick={handleHelpClick} title="Ayuda">
                  <img src={ayuda} alt="Icono Ayuda" />
                </button>
              </div>
            </div>  
          </form>
  
          {loading && <div className="loader"></div>}
  
          <Resultados
            resultados={resultados}
            totalHorasTrabajadas={totalHorasTrabajadas}
            totalHorasExtra={totalHorasExtra}
            isOpen={showResultadosDialog}
            onClose={() => setShowResultadosDialog(false)}
            fechaDesde={fechaDesde}
            fechaHasta={fechaHasta}
          />
        </>
      )}
    </div>
  );
}

export default App;
