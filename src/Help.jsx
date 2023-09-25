import React from 'react';
import './App.css';

function Help({ closeHelp }) {
  return (
    <div className="help-page">
      <h2>Preguntas Frecuentes</h2>
      
      <div className="faq">
        <h3>1. ¿Cómo puedo consultar mis horas trabajadas?</h3>
        <p>Para consultar tus horas trabajadas, ingresa tu RUT y número de documento, selecciona las fechas 'Desde' y 'Hasta' y haz clic en el botón 'Consultar'.</p>
      </div>
      
      <div className="faq">
        <h3>2. ¿Cómo puedo consultar mis horas extra de un mes?</h3>
        <p>Ingresa tu RUT y número de documento, selecciona las fechas correspondientes al inicio y fin del mes que deseas consultar, y haz clic en el botón 'Consultar'.</p>
      </div>

      <div className="faq">
        <h3>3. ¿Por qué no se muestran mis horas trabajadas?</h3>
        <p>Si no se muestran tus horas trabajadas, verifica que los datos ingresados sean correctos y que las fechas seleccionadas estén dentro de tu período laboral.</p>
      </div>

      <div className="faq">
        <h3>4. ¿Puedo consultar las horas trabajadas de otros compañeros?</h3>
        <p>No, solo puedes consultar tus propias horas trabajadas ingresando tu RUT y número de documento.</p>
      </div>

      <div className="faq">
        <h3>5. ¿Qué significa el mensaje "No se encontraron resultados para los datos proporcionados"?</h3>
        <p>Este mensaje indica que no hay registros de horas trabajadas para el RUT, número de documento y rango de fechas ingresados.</p>
      </div>

      <div className="faq">
        <h3>6. ¿Dónde puedo encontrar mi número de documento?</h3>
        <p>Tu número de documento se encuentra en tu cedula de identidad.</p>
      </div>

      <div className="faq">
        <h3>7. ¿El sistema guarda mi historial de consultas?</h3>
        <p>No, el sistema no guarda tu historial de consultas. Cada vez que desees ver tus horas trabajadas o extras, deberás ingresar la información solicitada nuevamente.</p>
      </div>
      <button className="volver-help-button" onClick={closeHelp}>Volver</button>
    </div>
  );
}

export default Help;

