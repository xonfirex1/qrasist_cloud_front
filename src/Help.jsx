import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './App.css'; // Asegúrate de que este archivo exista y tenga los estilos necesarios

function Help({ closeHelp }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqList = [
    { question: '¿Cómo puedo consultar mis horas trabajadas?', answer: 'Para consultar tus horas trabajadas, ingresa tu RUT y número de documento, selecciona las fechas "Desde" y "Hasta" y haz clic en el botón "Consultar".' },
    { question: '¿Cómo puedo consultar mis horas extra de un mes?', answer: 'Ingresa tu RUT y número de documento, selecciona las fechas correspondientes al inicio y fin del mes que deseas consultar, y haz clic en el botón "Consultar".' },
    { question: '¿Por qué no se muestran mis horas trabajadas?', answer: 'Si no se muestran tus horas trabajadas, verifica que los datos ingresados sean correctos y que las fechas seleccionadas estén dentro de tu período laboral.' },
    { question: '¿Puedo consultar las horas trabajadas de otros compañeros?', answer: 'No, solo puedes consultar tus propias horas trabajadas ingresando tu RUT y número de documento.' },
    { question: '¿Qué significa el mensaje "No se encontraron resultados para los datos proporcionados"?', answer: 'Este mensaje indica que no hay registros de horas trabajadas para el RUT, número de documento y rango de fechas ingresados.' },
    { question: '¿Dónde puedo encontrar mi número de documento?', answer: 'Tu número de documento se encuentra en tu cedula de identidad.' },
    { question: '¿El sistema guarda mi historial de consultas?', answer: 'No, el sistema no guarda tu historial de consultas. Cada vez que desees ver tus horas trabajadas o extras, deberás ingresar la información solicitada nuevamente.' }
  ];

  return (
    <div className="help-page">
      <h2>Preguntas Frecuentes</h2>
      {faqList.map((faq, i) => (
        <Accordion
          key={i}
          expanded={expanded === `panel${i + 1}`}
          onChange={handleChange(`panel${i + 1}`)}
          className="faq"
          style={{ backgroundColor: '#5da8a3', marginBottom: '5px', borderRadius: '10px' }} // Estilo como en tu primer componente
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
            <Typography>{`${i + 1}. ${faq.question}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <button className="volver-help-button" onClick={closeHelp}>Volver</button>
    </div>
  );
}

export default Help;
