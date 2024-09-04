import {
    Button,
    ButtonGroup,
    Grid,
    Checkbox,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonActionsEditTable } from "../ButtonActions/ButtonActionsEdit";
import { ButtonActionsSaveTable } from "../ButtonActions/ButtonActionsSave";
import { ButtonActionsDeleteTable } from "../ButtonActions/ButtonActionsDelete";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { CodeColor } from "@/types/colors/colors";

type PropsCustomTable = {
    columns: any[],
    rows: any[],
    loading?: boolean,
    hasOptions?: any,
    rowsPerPage?: number,
    page?: number,
    handleChangePage?: any,
    handleChangeRowsPerPage?: any,
    disabled_title?: any,
    title: string,
    onSearch?: any,
    onAdd?: any,
    onAddFn?: any,
    disabledAdd?: any,
    onAddFnName?: any,
    onRowClick?: any,
    onCheckbox?: any,
    onEdit?: (data: any) => void
    onDelete?: (data: any) => void
    onCancel?: (data: any) => void
}

const CustomTable = (props: PropsCustomTable) => {

    const { columns = [], rows = [], loading = false, hasOptions, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = props;
    const navigate = useNavigate();
    const { modeStyle } = useStyleModeStore()

    return (
        <>
            <Grid container>
                {!props?.disabled_title && (
                    <Grid
                        item
                        container
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginBottom: "10px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h1"
                            gutterBottom
                            color={modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK}
                            className="tittle"
                            sx={{ mt: 1, ml: 1, fontWeight: 600 }}
                        >
                            {props.title && props.title.toUpperCase()}
                        </Typography>
                    </Grid>
                )}
                <Grid
                    item
                    xs={12}
                    container
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        marginBottom: "10px",
                    }}
                >
                    {props.onSearch && (
                        <Grid item>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Buscar..."
                                size="small"
                            />
                        </Grid>
                    )}
                    {props.onAdd && (
                        <Grid
                            item
                            xs={!props.onSearch && 12}
                            sx={{ textAlign: "right" }}
                        >
                            <Button
                                onClick={() =>
                                    navigate({ pathname: props.onAdd })
                                }
                                sx={{
                                    border: "solid 1px #73B2FF",
                                    mt: "10px",
                                    color: "#73B2FF",
                                    "&:hover": {
                                        bgcolor: "#73B2FF",
                                        color: "#fff",
                                    },
                                }}
                            >
                                {"Agregar"}
                            </Button>
                        </Grid>
                    )}
                    {props.onAddFn && (
                        <Grid
                            item
                            xs={!props.onSearch && 12}
                            sx={{ textAlign: "right" }}
                        >
                            <Button
                                onClick={() => props.onAddFn()}
                                sx={{
                                    border: "solid 1px #73B2FF",
                                    mt: "10px",
                                    color: "#73B2FF",
                                    "&:hover": {
                                        bgcolor: "#73B2FF",
                                        color: "#fff",
                                    },
                                }}
                                disabled={
                                    props.disabledAdd
                                        ? props.disabledAdd
                                        : false
                                }
                            >
                                {props.onAddFnName
                                    ? props.onAddFnName
                                    : "Agregar"}
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>

            <TableContainer>
                <Table>
                    <TableHead className={modeStyle !== 'light' ? 'table-head-dark' : 'table-head-light'}>
                        <TableRow>
                            {columns?.map((column: any, index1: number) => (
                                <TableCell
                                    key={index1}
                                    align="center"
                                    sx={{ color: '#011C27' }}
                                >
                                    <Typography
                                        variant="body2"
                                        component="h1"
                                        gutterBottom
                                        color={modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK}
                                        className="tittle"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {column.label}
                                    </Typography>

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                {columns?.map((_: any, index2: number) => {
                                    console.log('row1', columns)

                                    if (index2 === columns.length - 1) {
                                        return null;
                                    }
                                    return (
                                        <TableCell key={index2}>
                                            <Skeleton
                                                sx={{ height: 20 }}
                                                animation="wave"
                                                variant="rectangular"
                                            />
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ) : rows.length > 0 ? (
                            rows
                                .map((row: any, index3: number) => {
                                    return (
                                        <TableRow
                                            key={index3}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            onClick={() => {
                                                props.onRowClick(row);
                                            }}
                                            style={{ cursor: "pointer", background: modeStyle === 'light' ? CodeColor.ROW_TABLE_LIGHT : CodeColor.ROW_TABLE_DARK }}
                                        >
                                            {columns?.map((column: any, index4: number) => (
                                                <>
                                                    {column.type === "options" && hasOptions ? (
                                                        <TableCell
                                                            key={index4}
                                                            className="cellTable"
                                                            align={column.align}
                                                            style={{ fontSize: "13px" }}
                                                        >
                                                            <ButtonGroup
                                                                aria-label="button-group-custom-table"
                                                            >
                                                                {props.onCheckbox && (
                                                                    <Checkbox
                                                                        color="primary"
                                                                        size="small"
                                                                    />
                                                                )}
                                                                {props.onEdit && (

                                                                    <ButtonActionsEditTable text='' />
                                                                )}
                                                                {props.onCancel && (
                                                                    <ButtonActionsSaveTable text='' />
                                                                )}
                                                                {props.onDelete && (
                                                                    <ButtonActionsDeleteTable text='' />
                                                                )}
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell
                                                            key={index4}
                                                            className="cellTable"
                                                            align={column.align}
                                                        >

                                                            {/* {column.format ? column.format(row) : column.color ? (
                                                                        <span style={{ color: modeStyle === 'light' ?  '#000': 'red', fontWeight: '700' }}>
                                                                            {row[column.field] || ""}
                                                                        </span>
                                                                    ) : row[column.field] || ""} */}
                                                            <span style={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK, fontWeight: '700' }}>
                                                                {row[column.field] || ""}
                                                            </span>
                                                        </TableCell>
                                                    )}
                                                </>
                                            )
                                            )}
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns ? columns.length : 1}
                                    sx={{ background: modeStyle === 'light' ? CodeColor.ROW_TABLE_LIGHT : CodeColor.ROW_TABLE_DARK }}
                                >
                                    <Grid
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>
                                            <span style={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK, fontWeight: '700' }}>
                                                {"Sin data"}
                                            </span>
                                        </div>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                rows.length > 1 &&
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 25, 100]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}
                />
            }

        </>
    );
};

export default CustomTable;
