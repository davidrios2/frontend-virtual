'use client'

import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { SearchInput } from './SearchInput';
import { Checkbox } from '@mui/material';
import { UserImage } from './UserImage';
import { GetListUserResponse } from 'interfaces';
import { useSession } from 'next-auth/react';
import { getAllUser } from 'database/dbUser';
import { SelectMenuRole } from './SelectMenuRole';


interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'userName', label: 'Name', minWidth: 180 },
    { id: 'userEmail', label: 'Email', minWidth: 170 },
    { id: 'lastActive', label: 'última vez activo', minWidth: 100 },
    { id: 'permisos', label: 'Permisos', minWidth: 100 },
    { id: 'userRole', label: 'Rol', minWidth: 100 }
];


export const StickyHeadTable = () => {
    const NAME_COLUMN_ID = "userName";
    const [rowsData, setRowsData] = useState<GetListUserResponse[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    //const [permissionRole, setPermissionRole] = useState();
    const { data: session, status } = useSession();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (status === 'authenticated' && session.user.role != "USUARIO_REGISTRADO") {
            const token: string = session.user.token
            const fetchListUser = async () => {
                try {
                    const listUser = await getAllUser(token);
                    const data = listUser.map(user => ({
                        userId: user.userId,
                        userName: user.userName,
                        userLastname: user.userLastname,
                        userEmail: user.userEmail,
                        userRole: user.userRole
                    }));
                    setRowsData(data);
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                }
            };
            fetchListUser()
        }
    }, [session, status])

    const handleRoleChange = useCallback((userId: string, newRole: number) => {
        setRowsData(prevData =>
            prevData.map(row =>
                row.userId === userId ? { ...row, userRole: newRole } : row
            )
        );
    }, [])

    return (
        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key="headerColumn">
                            {columns.map((column, index) => {
                                if (column.id === NAME_COLUMN_ID) {
                                    return (
                                        <TableCell
                                            key={index}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <div className='flex items-center'>
                                                {column.label}
                                                <SearchInput />
                                            </div>
                                        </TableCell>
                                    );
                                } else {
                                    return (
                                        <TableCell
                                            key={index}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    );
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={1} key={row.userId}>
                                        {columns.map(column => (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === NAME_COLUMN_ID ? (
                                                    <div className='flex items-center'>
                                                        <Checkbox />
                                                        <UserImage />
                                                        {`${row.userName} ${row.userLastname}`}
                                                    </div>
                                                ) : column.id === "userEmail" ? (
                                                    row.userEmail
                                                ) : column.id === "lastActive" ? (
                                                    "2 semanas"
                                                ) : column.id === "permisos" ? (
                                                    row.userRole === 102 ? "Puede ver" : "Puede editar"
                                                ) : column.id === "userRole" ? (
                                                    <SelectMenuRole
                                                        role={row.userRole}
                                                        userId={row.userId}
                                                        onRoleChange={handleRoleChange}
                                                    />
                                                ) : null}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rowsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

