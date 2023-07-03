import React, { useEffect, useState } from 'react';
import WeeklyReportGrid from '../pure/WeeklyReportGrid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WeeklyReportContainer() {
 
    const navigate = useNavigate();
    const [weeklyReportsList, setWeeklyReportsList] = useState([])
   
    const [rows, setRows] = useState([])
   
    useEffect(()=>{
        fetchReport()
    },[])

    const handleRowClick = (e) => {
        console.log(weeklyReportsList[e.id])
        navigate('/weeklyreport/report', {
            state: weeklyReportsList[e.id]
        })
    }

    const fetchReport = async (date) => {

        const res = await fetch('http://localhost:4000/weeklyReport/')
        const data = await res.json()
        if(date){
            const index = weeklyReportsList.findIndex((weeklyReport)=>{return weeklyReport.date === date})
            const dataIndex = data.findIndex((report) => {return report.date === date})
            let prevWeeklyReportsList = [...weeklyReportsList]
            prevWeeklyReportsList[index] = data[dataIndex]
            setRows([]);
            setWeeklyReportsList(prevWeeklyReportsList)
            return data
        }
        setRows([]);
        setWeeklyReportsList(data)
        return data

    }

    const handleButton = () => {
        calculateWeeklyReport();
    }

    const overwriteConfirm = () => {
        return window.confirm(
          "'Existe un reporte realizado del día de hoy, ¿Quieres sobrescribirlo?'"
        );
      };
    
    const calculateWeeklyReport = async () => {

        let overwrite = false;
        let nowDate = new Date();
        let date = "2023-07-01";
        let foundDate = false;        

        weeklyReportsList.find((weeklyReport)=>{
            return weeklyReport.date === date
        }) && (foundDate = true)

        if (foundDate) {
            overwriteConfirm() && (overwrite = true);
          }

        if (overwrite || !foundDate) {

        try{
            const res = await fetch('http://localhost:4000/weeklyreport/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    overwrite: overwrite,
                    date: date
                })
            })
          const data = await res.json();
          console.log(data)
          data.status = 200 && overwrite ? await fetchReport(date) : await fetchReport()
        }
          catch(err){
              console.error(err)
          } 
        }
    }

    const columns =  [
        { field: 'date', headerName: 'Date', width: 110 },
        {
          field: 'totalBooksPerBags',
          headerName: 'Libros en bags',
          type: 'number',
          width: 100,
          editable: true,
        },
        {
          field: 'totalBooksPerVehicles',
          headerName: 'Libros en vehículos',
          type: 'number',
          width: 100,
          editable: true,
        },
        {
          field: 'totalBooksInScribeRooms',
          headerName: 'Libros en ScribeRoom',
          type: 'number',
          width: 100,
          editable: true,
        },
        {
          field: 'totalBooks',
          headerName: 'TOTAL',
          type: 'number',
          sortable: false,
          width: 80
        },
      ];

      useEffect(()=>{
        if(weeklyReportsList.length !== 0 ){
            let prevRows = [...rows];
            weeklyReportsList.forEach((weeklyReport, index)=>{
                console.log(weeklyReport)
                let newRow = {
                    id: index ,
                    date: weeklyReport.date,
                    totalBooksPerBags: weeklyReport.books_in_bags_quantity.total, 
                    totalBooksPerVehicles: weeklyReport.books_in_vehicles_quantity.total,
                    totalBooksInScribeRooms: weeklyReport.books_in_rooms_quantity.total,
                    totalBooks: weeklyReport.total_books
                }
                prevRows.push(newRow)
                setRows(prevRows);
            })
        }
      },[weeklyReportsList])

    return (
       <>
        {
            weeklyReportsList.length === 0 ? <WeeklyReportGrid report={0}  columns={columns} rows={[]} handleRowClick={handleRowClick}/> :
            <WeeklyReportGrid columns={columns} rows={rows} handleRowClick={handleRowClick}/>
        }
        <Button onClick={handleButton}>Calculate</Button>
       </>
        );
      }


export default WeeklyReportContainer;
