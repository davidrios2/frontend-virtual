import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { UserRoles } from 'interfaces';
import { updateRole } from 'database/dbUser';
import { useSession } from 'next-auth/react';


interface SelectMenuRoleProps {
    role: number;
    userId: string;
    onRoleChange: (userId: string, newRole: number) => void;
}

export const SelectMenuRole = ({ role, userId, onRoleChange }: SelectMenuRoleProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openModal, setOpenModal] = useState(false);
    const [newRole, setNewRole] = useState<String | UserRoles>();
    const [currentRole, setCurrenRole] = useState(UserRoles[role]);
    const { data: session, status } = useSession();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModal = (newRol: string | UserRoles) => {
        setNewRole(newRol)
        setOpenModal(true)

    };

    const handleConfirm = () => {
        const roleId = newRole === "SUPER_USUARIO" ? 100 : newRole === "ADMINISTRADOR" ? 101 : 102;
        if (status === "authenticated") {
            const token: string = session.user.token
            updateUserRole(userId, roleId, token)
        }
        console.log("Nuevo rol: " + newRole + " = " + roleId)
        setCurrenRole(UserRoles[roleId])
        onRoleChange(userId, roleId)
        handleCancel()
    };

    const handleCancel = () => {
        setOpenModal(false);
        handleClose();
    };

    const updateUserRole = (userId: string, userRole: number, token: string) => {
        updateRole(token, userId, userRole)
            .then(() => {
                console.log('Role updated successfully');
            })
            .catch((error) => {
                console.error('Error updating role:', error);
            });
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                
            >
                {currentRole}
            </Button>
            <Menu
                id="basic-menu"
                key="menuRole"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >{
                    Object.values(UserRoles)
                        .filter((element, index) => element != currentRole && index <= 2)
                        .map((value, index) => {
                            return (
                                <MenuItem key={index} onClick={() => handleModal(value)}>{value}</MenuItem>
                            )
                        })
                }
            </Menu>
            <Dialog
                open={openModal}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmar cambio de rol</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de cambiar el rol a <span className='font-semibold'>{newRole}</span>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary" variant="contained">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
