import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AppCircularProgress from "./loadings/AppCircularProgress";

function AddItemComponent({
  itemName,
  handleFieldChange,
  selectedCategory,
  setSelectedCategory,
  categories,
  handleSubmit,
  handleCancel,
  helpertext,
  loading,
  setLoading,
  success,
  setSuccess
}) {

  return (
    <Container component="main" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography
          sx={{ p: { xs: 1, md: 4 } }}
          component="h1"
          variant="h4"
          align="left"
        >
          Añadir {itemName}
        </Typography>
        <Divider sx={{ my: { md: 1 } }}></Divider>
        <Stack spacing={3}>
        <TextField
          required
          error={helpertext ? helpertext[0] === 'name' ? true : false : false}
          id={`${itemName}Name`}
          name={`${itemName}Name`}
          label={`Nombre ${itemName}`}
          fullWidth
          autoComplete="given-name"
          variant="standard"
          onChange={handleFieldChange}
          helperText={helpertext[1]}
        />
        {itemName === "libro" && (
            <FormControl sx={{ mt: 3, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Categoria
              </InputLabel>
              <Select
                error={helpertext ? helpertext[0] === 'category' ? true : false : false}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedCategory || ''}
                label="Categoria"
                onChange={setSelectedCategory}
                helpertext={helpertext[1]}
              >
                {categories.length !== 0 &&
                  categories.map((category, index) => {
                    return (
                      <MenuItem key={index} value={category.id}>
                        {category.category}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
        )}
        <ButtonGroup>
        <AppCircularProgress text={'Guardar'} helpertext={helpertext} handleSubmit={handleSubmit} loading={loading} setSuccess={setSuccess} setLoading={setLoading} success={success}/>
        <Button variant="contained" onClick={handleCancel} color="error"> cancelar</Button>

         </ButtonGroup>
        </Stack>
      </Paper>
   
    </Container>
  );
}

export default AddItemComponent;
