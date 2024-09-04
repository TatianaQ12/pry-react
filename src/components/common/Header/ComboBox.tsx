
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Grid, Select, Typography } from '@mui/material';
import Icon from "@mui/material/Icon";
import MenuItem from '@mui/material/MenuItem';



export const ComboBox = (props: any): JSX.Element => {

  const handleChanges = (event) => {
    const value = event.target.value
    console.log(props)
  };

  return (
    <>
      {/*Combo Box*/}
      <Grid container direction="row" justifyContent="center" alignItems={'center'} spacing={2}>
        <Grid item>
          <Grid container item direction="row" justifyContent="center" alignItems={'center'}>
            <Grid>
              <Icon sx={{ color: "#28c4ac", mr: 1 }}>
                <AccountBoxIcon />
              </Icon>
            </Grid>
            <Grid>
              <Typography
                style={{ color: "black" }}
              >
                Centro Medico:
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Select
            id="outlined-select-ubicationclinica"
            sx={{ width: "200px" }}
            // fullWidth
            // value={ubicationclinica}
            onChange={handleChanges}
            variant="standard"
          >
            {/* {dataUser.user.medical_center.map((option, key) => (
              <MenuItem
                sx={{ textAlign: 'center' }}
                key={key} value={option.id}>
                {option.name}
              </MenuItem>
            ))} */}
             <MenuItem
                sx={{ textAlign: 'center' }} value={'ss'}>
                aaa
              </MenuItem>
          </Select>
        </Grid>

      </Grid>
    </>
  );
}

