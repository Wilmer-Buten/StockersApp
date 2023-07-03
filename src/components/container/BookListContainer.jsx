import React, { useContext, useEffect } from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  TableCell,
  Table,
  TableBody,
  Button,
} from "@mui/material";
import BooksTable from "../pure/BooksTable";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/contexts/BookContext";
import UserContext from "../../context/contexts/UserContext";

function BookListContainer() {
  const navigate = useNavigate();
  const [checkedRadios, setCheckedRadios] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const {getUsers, loggedUserId, setLoggedUserId} = useContext(UserContext);
  const { books, getBooks } = useContext(BookContext);


  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(()=>{
    if(loggedUserId=== ''){
      const token = localStorage.getItem('credentials');
      setLoggedUserId(token)
    }
  },[])

  useEffect(() => {
    if (booksList.length > 0) {
      let radioStatus = [];
      booksList.forEach((book) => {
        radioStatus.push([
          { bookId: book.id, radioStatus: true },
          { bookId: book.id, radioStatus: false },
          { bookId: book.id, radioStatus: false },
          { bookId: book.id, radioStatus: false },
          { bookId: book.id, radioStatus: false },
          { bookId: book.id, radioStatus: false },
        ]);
      });
      setCheckedRadios(radioStatus);
      setLoading(false);
    }
  }, [booksList]);

  const handleRadios = (radioID) => {
    let radioRow = radioID[0];
    let column = radioID[1];

    if (!isNaN(radioID[1])) {
      radioRow = radioID[0] + radioID[1];
      column = radioID[2];
    }
    let prevCheckedRadios = [...checkedRadios];
    let rowArr = prevCheckedRadios[radioRow];

    switch (column) {
      case "A":
        prevCheckedRadios[radioRow] = [
          { bookId: rowArr[0].bookId, radioStatus: true },
          { bookId: rowArr[1].bookId, radioStatus: false },
          { bookId: rowArr[2].bookId, radioStatus: false },
          { bookId: rowArr[3].bookId, radioStatus: false },
          { bookId: rowArr[4].bookId, radioStatus: false },
          { bookId: rowArr[5].bookId, radioStatus: false },
        ];
        console.log(prevCheckedRadios);
        break;
      case "B":
        prevCheckedRadios[radioRow] = [
          { bookId: rowArr[0].bookId, radioStatus: false },
          { bookId: rowArr[1].bookId, radioStatus: true },
          { bookId: rowArr[2].bookId, radioStatus: false },
          { bookId: rowArr[3].bookId, radioStatus: false },
          { bookId: rowArr[4].bookId, radioStatus: false },
          { bookId: rowArr[5].bookId, radioStatus: false },
        ];
        console.log(prevCheckedRadios);
        break;
      case "C":
        prevCheckedRadios[radioRow] = [
          { bookId: rowArr[0].bookId, radioStatus: false },
          { bookId: rowArr[1].bookId, radioStatus: false },
          { bookId: rowArr[2].bookId, radioStatus: true },
          { bookId: rowArr[3].bookId, radioStatus: false },
          { bookId: rowArr[4].bookId, radioStatus: false },
          { bookId: rowArr[5].bookId, radioStatus: false },
        ];
        console.log(prevCheckedRadios);
        break;
      case "D":
        prevCheckedRadios[radioRow] = [
          { bookId: rowArr[0].bookId, radioStatus: false },
          { bookId: rowArr[1].bookId, radioStatus: false },
          { bookId: rowArr[2].bookId, radioStatus: false },
          { bookId: rowArr[3].bookId, radioStatus: true },
          { bookId: rowArr[4].bookId, radioStatus: false },
          { bookId: rowArr[5].bookId, radioStatus: false },
        ];
        console.log(prevCheckedRadios);
        break;
      case "E":
        prevCheckedRadios[radioRow] = [
          { bookId: rowArr[0].bookId, radioStatus: false },
          { bookId: rowArr[1].bookId, radioStatus: false },
          { bookId: rowArr[2].bookId, radioStatus: false },
          { bookId: rowArr[3].bookId, radioStatus: false },
          { bookId: rowArr[4].bookId, radioStatus: true },
          { bookId: rowArr[5].bookId, radioStatus: false },
        ];
        console.log(prevCheckedRadios);
        break;
      case "F":
        prevCheckedRadios[radioRow] = [
          { bookId: rowArr[0].bookId, radioStatus: false },
          { bookId: rowArr[1].bookId, radioStatus: false },
          { bookId: rowArr[2].bookId, radioStatus: false },
          { bookId: rowArr[3].bookId, radioStatus: false },
          { bookId: rowArr[4].bookId, radioStatus: false },
          { bookId: rowArr[5].bookId, radioStatus: true },
        ];
        console.log(prevCheckedRadios);
        break;

      default:
        break;
    }

    setCheckedRadios(prevCheckedRadios);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooksList(res);
    console.log(res);
  };

  const fromBooleanToNumber = () => {
    let arr = checkedRadios.map((radioR) => {
      let booksQuantity = {
        bookId: 0,
        quantity: 0,
      };
      radioR.map((obj, index) => {
        booksQuantity.bookId = obj.bookId;
        if (obj.radioStatus) {
          booksQuantity.quantity = index;
        }
      });
      return booksQuantity;
    });
    return arr;
  };

  const overwriteConfirm = () => {
    return window.confirm(
      "'Existe un reporte realizado del día de hoy, ¿Quieres sobrescribirlo?'"
    );
  };

  const submitBooks = async () => {
    const token = localStorage.getItem("credentials");
    const studentsBooksReport = fromBooleanToNumber();
    const users = await getUsers();
    console.log(users)
    const index = users.findIndex((user)=>{return user.userId === loggedUserId})

    let overwrite = false;
    let nowDate = new Date();
    let date = "2023-06-28";
    let foundDate = false;

    console.log(users[index])
    users[index].quantity_per_book.find((obj) => {
      return Date.parse(obj.date) === Date.parse(date);
    }) && (foundDate = true);
    if (foundDate) {
      overwriteConfirm() && (overwrite = true);
    }

    if (overwrite || !foundDate) {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/user/saveBooks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            overwrite: overwrite,
            userId: loggedUserId,
            date: date,
            quantity: studentsBooksReport,
          }),
        });

        const data = await res.json();
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

  };
  if (loading) {
    return <div>LOADINGGGGG</div>;
  }
  return (
    <TableContainer>
      <Button onClick={handleLogOut}>Log out</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Libro</TableCell>
            <TableCell>0</TableCell>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booksList.map((book, index) => {
            return (
              <BooksTable
                key={index}
                radioStatus={checkedRadios[index]}
                handleRadios={handleRadios}
                bookId={index}
                bookName={book.name}
              ></BooksTable>
            );
          })}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={submitBooks} endIcon={<SendIcon />}>
        Send
      </Button>
    </TableContainer>
  );
}

export default BookListContainer;
