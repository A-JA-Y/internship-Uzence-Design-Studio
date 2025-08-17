import InputField from "./components/InputField";
import DataTable from "./components/DataTable";
import { useState } from "react";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [valid, setValid] = useState(true);

  return (
    <>
      <div>
        <div className=" flex flex-col my-2  items-center justify-center w-full">
          <h1 className="text-center sm:text-4xl text-2xl font-bold sm:font-extrabold ">InputField</h1>
          <InputField
            label="Name"
            placeholder="Enter your name"
            helperText="Please enter a valid string"
            errorMessage="This field is required"
            invalid={!valid}
            disabled={disabled}
            variant="outlined"
            size="md"
          />
          <div className="flex sm:flex-row flex-col max-w-full gap-5">
            <button
              onClick={() => {
                setDisabled((prev) => !prev);
              }}
              className="px-4 py-2 bg-slate-500 bg-opacity-[30%] rounded-xl hover:bg-opacity-15 transition-all drop-shadow-lg shadow-zinc-600 shadow-inner"
            >
              Toggle Disabled/Enabled
            </button>
            <button
              onClick={() => {
                setValid((prev) => !prev);
              }}
              className="px-4 py-2 bg-slate-500 bg-opacity-[30%] rounded-xl hover:bg-opacity-15 transition-all drop-shadow-lg shadow-zinc-600 shadow-inner"
            >
              Toggle Valid/Invalid
            </button>
          </div>
        </div>

        <div className=" flex flex-col  items-center justify-center w-full my-2">
          <h1 className="text-center sm:text-4xl text-2xl font-bold sm:font-extrabold ">DataTable</h1>
          <div>
            <DataTable
              data={[
                { id: 1, name: "John Doe", age: 28 },
                { id: 2, name: "Jane Smith", age: 34 },
                { id: 3, name: "Alice Johnson", age: 45 },
              ]}
              columns={[
                { key: "id", title: "ID", dataIndex: "id" },
                {
                  key: "name",
                  title: "Name",
                  dataIndex: "name",
                  sortable: true,
                },
                { key: "age", title: "Age", dataIndex: "age", sortable: true },
              ]}
              selectable={true}
              onRowSelect={(selectedRows) => {
                console.log("Selected Rows:", selectedRows);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
