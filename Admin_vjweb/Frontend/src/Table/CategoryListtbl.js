import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "../Table/Table.css"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Checkbox, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { IMG_URL, tostmsg } from "../MIS/Global";
import { Deletecategory, DeleteCategoryimg, Getcategorydata } from "../API/CategoryModel";
import AlertMessageComp from "../Componants/AlertMessageCom/AlertMessageComp";

const columns = [
  {label:"Category Name",minWidth:"10%"},
  { label: "", minWidth: "10%" },
  { label: "Action", minWidth: "25%" },
];

function createData(catgid,catgname,imgdata,search) {
  return {
    catgid,
    catgname,
    imgdata,
    search
  };
}

export default function CategoryListtbl(props) {
  const [rows, setRows] = useState([]);
  const [srows, setSrows] = useState([]);
  const [searched, setSearched] = useState("");
  let tabledata = {};

  const requestSearch = (searchedVal, srows) => {
    const filteredRows = srows.filter((row) => {
      return row.search.toLowerCase().includes(searchedVal.toLowerCase());
    });
    return filteredRows;
  };

  const getData = async () => {
    setRows([]);
    setSrows([]);
    // let data = { fdate: monday, tdate: saturday };
    tabledata = await Getcategorydata();

    const arr = [];
    // alert(JSON.stringify(tabledata.data))
    tabledata.data.forEach((element) => {
      let search = `${element.catgname}`;
      arr.push(createData(element.catgid, element.catgname, element.imgdata, search));
      setRows([...arr]);
      setSrows([...arr]);
    });
  };

  useEffect(() => {
    getData();
  }, [props.searchdata]);

  const search = (searchedVal) => {
    let filteredRows = requestSearch(searchedVal, srows);
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let data = [{ id: "1", name: "abc" }];
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
  return (
    <div className="">
      <AlertMessageComp
        type={alertdata.type}
        msg={alertdata.msg}
        vertical={alertdata.vertical}
        horizontal={alertdata.horizontal}
        setOpen={setAlertopen}
        open={alertopen}
      />
      <Paper sx={{ width: "100%" }}>
          <TextField
            placeholder="search"
            fullWidth
            className="searchbar"
            onChange={(searchVal) => search(searchVal.target.value)}
          />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ fontSize: "100pt!important" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, width: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  let bal = false;
                  if (row.isstatus == "COMPLETE") {
                    bal = true;
                  }
                  let img = JSON.parse(row.imgdata);
                   
                  let imglink =img[0].imglink;
                  // if(img.length>0){
                  //    imglink = IMG_URL + img[0].imglink;
                  //   }
                  
                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={async (e) => {
                        props.setUpdData(row);
                      }}
                    >
                      <TableCell>{row.catgname}</TableCell>
                      <TableCell>
                        <img height="100" width="100" src={imglink}></img>
                      </TableCell>
                      <TableCell>
                        <Link
                          to="/category"
                          state={{
                            from:row
                          }}
                        >
                          <EditIcon sx={{ color: "black" }} />
                        </Link>
                        <Button
                          onClick={() => {
                            (async () => {
                              try {
                                if(window.confirm("Are you sure you want to delete?"))
                                {
                                let x=imglink.slice(imglink.lastIndexOf('/') + 1);
                                let delImg=DeleteCategoryimg({imglink:x});
                                const branddelete = await Deletecategory({
                                  catgid: row.catgid,
                                });
                                let rettostmsg = tostmsg(branddelete);
                                setAlertdata(rettostmsg);
                                setAlertopen(rettostmsg.open);
                                if (branddelete.code == 200) {
                                  // alert(branddelete.msg);
                                  window.location.reload();
                                } else {
                                  // alert(branddelete.msg);
                                }
                              }
                              } catch (e) {}
                            })();
                          }}
                        >
                          <DeleteIcon sx={{ color: "black" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 250, 500, 1000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
