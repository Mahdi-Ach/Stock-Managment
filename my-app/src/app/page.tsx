"use client"
import { TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { DataGrid, GridColDef, GridFilterModel, GridLogicOperator } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import MenuList from './components/menu/MenuList';
import { FetchProducts } from './service/productservice/ProductService';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'title', width: 130 },
  { field: 'price', headerName: 'price', width: 130 },
  { field: 'Delete', headerName: 'Delete', width: 130,renderCell:MenuList },
]
type Product = {
  limit: string;
  products:[];
  skip:number;
  total:number;
  s:string
};


const filterModels: GridFilterModel = {
  items: [],
  logicOperator: GridLogicOperator.Or,
};
export default function Home() {
  const [data,setData] = useState<Product>()
  const [currentpage,setCurrentPage] = useState(0)
  const [pagesize,setPageSize] = useState(5)
  const [loadingdata,setLoadingData] = useState(false)
  const [totalpage,setTotalPage] = useState(0)
  const [search_input,setSearching] = useState<string>("")
  let selected_row:any[] = []
  const [filt, setFilt] = useState({
    items: [{
    }]
  })
  const fetchdata = async (pagesize:number,currentpage:number,input:string)=>{
    try{
      let products  = await FetchProducts(pagesize,currentpage,input)
      setData(products)
      setLoadingData(true)
      setTotalPage(Math.ceil(products.total/pagesize))
    }catch(err){
      console.log(err)
    }
  }
  function change_page(e:any,value:number){
    setCurrentPage(value-1)
  }
  function searchevent(e:any){
    setSearching(e.target.value)
  }
  function selectrow(newSelectionModel:any){
    console.log(newSelectionModel)
    selected_row = []
    newSelectionModel.forEach((rowIndex:any) => {
        const selectedRowData = data.products[rowIndex-1];
        selected_row.push(selectedRowData)
      });
    console.log(selected_row)
  }
    const handleFilterChange = (newFilters:any) => {
      setSearching(newFilters.items[0]?.value?newFilters.items[0]?.value:'')
    };
  useEffect(()=>{
    fetchdata(pagesize,currentpage,search_input)
  },[loadingdata,currentpage,search_input])
  return (
    <>
      <TextField required id="standard-required" onInput={searchevent} label="Required" />    
      {loadingdata && <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data.products}
        columns={columns}
        onRowSelectionModelChange={selectrow}
        checkboxSelection
        disableRowSelectionOnClick 
        hideFooterPagination={true}
        filterModel= {filterModels}
        keepNonExistentRowsSelected
        onFilterModelChange={handleFilterChange} // Update filters on change
      />
      <Pagination count={totalpage} showFirstButton showLastButton  onChange={change_page} />
    </div>}
    </>
  );
}
