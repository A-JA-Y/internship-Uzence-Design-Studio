import InputField from "./components/InputField";
import DataTable from "./components/DataTable";
import { useState } from "react";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [valid, setValid] = useState(true);

  return (
    <>
      <div>
        <div>
          <h1>InputField</h1>
          <InputField
            label="Name"
            placeholder="Enter your name"
            helperText="This is a helper text"
            errorMessage="This field is required"
            invalid={!valid}
            disabled={disabled}
            variant="outlined"
            size="md"
          />
          <div>
            <button
              onClick={() => {
                setDisabled((prev) => !prev);
              }}
            >
              Toggle Disabled/Enabled
            </button>
            <button
              onClick={() => {
                setValid((prev) => !prev);
              }}
            >
              Toggle Valid/Invalid
            </button>
          </div>
        </div>

        <div>
          <h1>DataTable</h1>
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
