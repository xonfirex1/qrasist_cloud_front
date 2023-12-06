import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function Calendario({ diasRegistrados, isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md">
            <DialogTitle>Parrilla de Registros</DialogTitle>
            <DialogContent>
                <table>
                    <thead>
                        <tr>
                            <th>Día</th>
                            <th>Horas trabajadas</th>
                            <th>Horas extra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diasRegistrados.map((d, index) => (
                            <tr key={index}>
                                <td>{d.fecha}</td> {/* Accede a la fecha desde los datos */}
                                <td>{d.horasTrabajadas}</td> {/* Accede a las horas trabajadas desde los datos */}
                                <td>{d.horasExtra}</td> {/* Accede a las horas extra desde los datos */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Calendario;
