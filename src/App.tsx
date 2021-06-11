import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './App.css';

// Components
import UploadForm from './components/UploadForm';

type Table = string[][]
type Record = string[]

function App() {

  const [sum, setSum] = useState<number>(0);

  const addCsvValues = (data: Table): void => {

    // Get rid of the CSV titles.
    data.shift()

    // Get rid of the record timestamps.
    data.map((record: Record) => {
      record.shift()
      return record
    })

    // Merge records into one array.
    let stringValuesArray : string[] = data.reduce( (a, b) => a.concat(b), [] as string[] )

    // Convert values to numbers
    let numberValuesArray: number[] = stringValuesArray.map( value => +value )

    //Set the sum of all values
    setSum(numberValuesArray.reduce( (a, b) => a + b)) 

  }

  const parseCsv = (e: React.ChangeEvent<HTMLInputElement>): void => {
    try {
      e.currentTarget.files && Papa.parse(e.currentTarget.files[0], {
        header: false, 
        complete: res => addCsvValues(res.data as Array<Array<string>>) 
      })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      <h3 className="mt-5">CSV Sum Tool</h3>
      {
        sum > 0 && 
        <h1 className="mt-5">Sum of all values: {sum}</h1>
      }
      <UploadForm fileType=".csv" handleChange={(e) => parseCsv(e)} />
    </div>
  );
}

export default App;
