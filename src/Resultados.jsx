import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import Popover from '@mui/material/Popover';
import { format } from 'date-fns';
import { diasRegistradosGlobal } from './App';

function Resultados({ isOpen, onClose, resultados  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverData, setPopoverData] = useState([]);

  const handleVerDetalleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverData(diasRegistradosGlobal); 
  };

  const totalHorasTrabajadas = resultados.reduce((acc, curr) => {
    const horas = parseFloat(curr.workedHours);
    return acc + (isNaN(horas) ? 0 : horas);
  }, 0);
  
  const totalHorasExtra = resultados.reduce((acc, curr) => {
    const horasExtra = parseFloat(curr.extraHours);
    return acc + (isNaN(horasExtra) ? 0 : horasExtra);
  }, 0);
  
  const handleCerrarPopover = () => {
    setAnchorEl(null);
  }

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? 'simple-popover' : undefined;

  return (
    <div className="resultados">
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">Resumen de Resultados</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            backgroundColor: '#7ec5b9',
            '&:hover': {
              backgroundColor: '#6db1a4',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>{`${resultados[0]?.name} ${resultados[0]?.last_name}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Horas Trabajadas</TableCell>
                <TableCell>{totalHorasTrabajadas} horas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Horas Extra</TableCell>
                <TableCell>{totalHorasExtra} horas</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button
            aria-describedby={idPopover}
            style={{ backgroundColor: '#7ec5b9', color: 'white', '&:hover': { backgroundColor: '#6db1a4' } }}
            onClick={handleVerDetalleClick}
            color="primary"
          >
            Ver Detalle
          </Button>
        </DialogActions>
      </Dialog>
  
      <Popover
        id={idPopover}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleCerrarPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Table>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Cargando datos...</TableCell>
              </TableRow>
            ) : (
              <>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>H. Trabajadas</TableCell>
                  <TableCell>H. Extra</TableCell>
                </TableRow>
                {popoverData.map((dia, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {format(new Date(dia.fecha), 'dd-MM-yy', { awareOfUnicodeTokens: true })}
                    </TableCell>
                    <TableCell>{dia.horasTrabajadas} horas</TableCell>
                    <TableCell>{dia.horasExtra} horas</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        <Button onClick={handleCerrarPopover} color="primary">Cerrar</Button>
      </Popover>
    </div>
  );
  
}

  

export default Resultados;
