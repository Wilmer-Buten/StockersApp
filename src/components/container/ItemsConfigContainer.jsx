import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Card, CardMedia,CardContent, Typography, CardActions, Button, Stack } from '@mui/material';
import WeeklyReportGrid from '../pure/WeeklyReportGrid';
import BookContext from '../../context/contexts/BookContext';
import StockerRoomContext from '../../context/contexts/StockerRoomContext';
import VehicleContext from '../../context/contexts/VehiclesContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddItemComponent from '../pure/AddItemComponent';
import AppAlert from '../pure/loadings/AppAlert';
import AppSkeleton from '../pure/loadings/AppSkeleton';

export default function LabTabs() {

  const [displaySkeleton, setDisplaySkeleton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [value, setValue] = React.useState('1');
  const [gridRows, setGridRows ] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const { books, getBooks } = useContext(BookContext);
  const {rooms, getRooms} = useContext(StockerRoomContext);
  const {vehicles, getVehicles} = useContext(VehicleContext);
  const [addItem, setAddItem] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [itemName, setItemName] = useState('')
  const [helperText, setHelperText] = useState(false)
  const [selectedItemsIds, setSelectedItemsIds] = useState([])
  const [updateGrid, setUpdateGrid] = useState(false)

  useEffect(() => {
    
    if (books.length === 0) {
      getBooks();
    } 
    if (rooms.length === 0) {
      getRooms();
    } 
    if(vehicles.length === 0){
      getVehicles();
    }    
}, [books, vehicles, rooms]);

  const handleFieldChange = (e) => {

    helperText && setHelperText(false)
    setItemName(e.target.value)
  }

  const fetchCategories = async () => {
    const res = await fetch(process.env.REACT_APP_API_LINK + '/categories')
    const categories = await res.json()
    setCategories(categories)
  }

  useEffect( ()=>{
    fetchCategories()
  },[])

  const createRows = (items, type) => {
    
    let rows = []
    let columns = []
    switch (type) {
        case 'books':
            let books = items
            if(books.length !== 0){
              columns.push( { field: 'book', headerName: 'Libro', width: 350 } )
              books.forEach((book, index) => {
                    let row = {}
                    row.id = index 
                    row.book = book.name
                    rows.push(row)
                })
            }
            break;
        case 'vehicles':
            let vehicles = items
            columns.push( { field: 'vehicle', headerName: "Van's", width: 350 })
            if(vehicles.length !== 0){
                vehicles.forEach((vehicle, index) => {
                    let row = {}
                    row.id = index
                    row.vehicle = vehicle.vehicle_name
                    rows.push(row)
                })
            }
            break;
        case 'rooms':
            let rooms = items
            columns.push({ field: 'room', headerName: 'Stocker Room', width: 350 })              
            if(rooms.length !== 0){
                rooms.forEach((room, index) => {
                    let row = {}
                    row.id = index
                    row.room = room.room_name
                    rows.push(row)
                })
            }
            break;
        default:
            break;
    }
    setGridColumns(columns)
    return rows
  }

  useEffect(()=>{
   
    addItem && setAddItem(false)
    setItemName('')
    setSelectedCategory(false)
    setSelectedItemsIds([])
    
    switch (value) {
    
        case '1':
            setHelperText(false)
            if(gridRows.length === 0 || !gridRows[0].book || updateGrid){
              setGridRows(
              createRows(books, 'books')
            )
            }
            setDisplaySkeleton(false)
            break;
        case '2':
          if(!gridRows[0].vehicle || updateGrid){
          setGridRows(
            createRows(vehicles, 'vehicles')
          )            
          }
          setDisplaySkeleton(false)

          break;
        case '3':
          if(!gridRows[0].room || updateGrid){          
          setGridRows(
            createRows(rooms, 'rooms')
          )
          }
          setDisplaySkeleton(false)
          break;    
        default:
          setItemName('books')
            break;
    
}
updateGrid && setUpdateGrid(false)

  },[value, gridRows, books, vehicles, rooms])

  const handleChange = (event, newValue) => {
    setDisplaySkeleton(true);
    setValue(newValue);
  };

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleAddBtnClick = () => {
    setAddItem(!addItem)
  }

  const verifySelectedItems = () => {
    
    if(selectedItemsIds.length === 0){
      alert('Ningún item seleccionado');   
      return true
    }
      
    return false
  }

  const handleDelBtnClick = () => {
    
    if(verifySelectedItems()) return;
    const confirmDelete = window.confirm('¿Seguro que quieres eliminar los items seleccionados? ');
    if(confirmDelete){
      setDisplaySkeleton(true)
      submitSelectedItems(value)
    }
    
  }

  const submitSelectedItems = async (itemId) => {
    
    let endPoint = '';
    switch (itemId) {
      case '1':
        endPoint = '/books/'
        break;
     case '2':
        endPoint = '/vehicles/'
        break;
      case '3':
        endPoint = '/stockerrooms/'
        break;
      default:
        break;
    }
    try{
      const res = await fetch(process.env.REACT_APP_API_LINK + endPoint + 'delete', {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          itemsIds: selectedItemsIds 
        })
    })
      const data = await res.json()
      if(res.status === 200) {
        setDisplayAlert(true)
        setDisplaySkeleton(false)
        if(value==='1'){getBooks()}
        else if(value==='2'){getVehicles()}
        else{getRooms()}
        setUpdateGrid(true)
      }
      setLoading(false)  
    } catch (err) {
      console.error(err)
    }

  }

  const handleSubmit = async () => {

    helperText && setHelperText(false)

    let item = {
      name: itemName 
    }

    let endPoint = '';

    if(selectedCategory) item.categoryId = selectedCategory;

    if(item.name === ''){
      setLoading(false)
      return setHelperText(['name', 'Está vacío'])
    }
    if(value === '1'){  
       endPoint = '/books/create'
       if(!selectedCategory) { 
        setLoading(false)
        return setHelperText(['category','Selecciona una categoría'])}

    } else if(value === '2'){
      endPoint = '/vehicles/create'
    } else {
      endPoint = '/stockerrooms/create'
    }
    try{
      const res = await fetch(process.env.REACT_APP_API_LINK + endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
      const data = await res.json()
      if(res.status === 200) {
        setDisplayAlert(true)
        if(value==='1') {
          getBooks()
        } else if( value ==='2'){
          getVehicles()
        } else{
          getRooms()
        }
        setUpdateGrid(true)
      }
      setAddItem(false)
      setItemName('')
      setLoading(false)
    } catch (err) {
      console.error(err)
    }

  }

  const handleCancel = () => {
    helperText && setHelperText(false)
    setAddItem(false);
  }

  const addSelectedItems = (e, itemsList) => {

    const selectedRowsIndex = e;
    let newSelectedItemsIds = [];
          selectedRowsIndex.forEach((rowIndex) => {
            newSelectedItemsIds.push(itemsList[rowIndex].id ? itemsList[rowIndex].id : itemsList[rowIndex]._id)
          })
          setSelectedItemsIds(newSelectedItemsIds)
  }

  const handleRowSelection = (e, item) => {
    switch (item) {
      case 'book':
          addSelectedItems(e, books)
          break;
      case 'vehicle':
          addSelectedItems(e, vehicles)
          break;
      case 'room':
          addSelectedItems(e, rooms)
          break;
      default:
        break;
    }
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Libros" value="1" />
            <Tab label="Vans" value="2" />
            <Tab label="Stocker Rooms" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
        {gridRows.length === 0 || displaySkeleton ? <AppSkeleton/> :
        <WeeklyReportGrid handleRowSelection={handleRowSelection} columns={gridColumns} rows={gridRows}></WeeklyReportGrid>
      }
        </TabPanel>
        <TabPanel value="2">
        {displaySkeleton ? <AppSkeleton/> :
        <WeeklyReportGrid handleRowSelection={handleRowSelection} columns={gridColumns} rows={gridRows}></WeeklyReportGrid>
      }
</TabPanel>
        <TabPanel value="3">
        {displaySkeleton ? <AppSkeleton/> :
        <WeeklyReportGrid handleRowSelection={handleRowSelection} columns={gridColumns} rows={gridRows}></WeeklyReportGrid>
      }       
        </TabPanel>
      </TabContext>
      <Box>
      {
        addItem ? 
        <AddItemComponent handleFieldChange={handleFieldChange} helpertext={helperText} handleCancel={handleCancel} selectedCategory={selectedCategory} setSelectedCategory={handleSelect} categories={categories} itemName={gridColumns[0].field === 'book' ? 'libro' : gridColumns[0].field === 'vehicle' ? 'van' : 'stocker room'} handleSubmit={handleSubmit} 
        loading={loading} 
        setLoading={setLoading}   
        success={success}
        setSuccess={setSuccess}
        />
        : 
        displayAlert ? <AppAlert text={'Items actualizados satisfactoriamente!'} open={displayAlert} setOpen={setDisplayAlert} ></AppAlert> 
        :
        <Stack direction="row" spacing={2}>
      <Button color="success" variant='contained' onClick={handleAddBtnClick} startIcon={<AddIcon />}>Agregar</Button>
      <Button color="warning" variant='contained' startIcon={<EditIcon />}>Editar</Button>
      <Button color="error" variant='contained' onClick={handleDelBtnClick} startIcon={<DeleteIcon />}>Eliminar</Button>

    </Stack>
      }
      </Box>
    </Box>
  );
}