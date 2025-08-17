import React, { useState } from "react";

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
}

const DataTable = <T extends Record<string, any>>({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
}: DataTableProps<T>) => {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

    const handleSort = (key: keyof T) => {
        if (!sortConfig || sortConfig.key !== key) {
            setSortConfig({ key, direction: "asc" });
        } else {
            setSortConfig({
                key,
                direction: sortConfig.direction === "asc" ? "desc" : "asc",
            });
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        const { key, direction } = sortConfig;
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const handleRowSelect = (row: T) => {
        if (!selectable) return;

        const isSelected = selectedRows.includes(row);
        const updatedSelection = isSelected
            ? selectedRows.filter((r) => r !== row)
            : [...selectedRows, row];

        setSelectedRows(updatedSelection);
        onRowSelect?.(updatedSelection);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {selectable && <th></th>}
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                onClick={() => column.sortable && handleSort(column.dataIndex)}
                            >
                                {column.title}
                                {sortConfig?.key === column.dataIndex && (
                                    <span>
                                        {sortConfig.direction === "asc" ? "▲" : "▼"}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => handleRowSelect(row)}
                        >
                            {selectable && (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row)}
                                        onChange={() => handleRowSelect(row)}
                                    />
                                </td>
                            )}
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {row[column.dataIndex]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
