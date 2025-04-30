import { Payment, columns } from "./columns";
import { DataTable } from "./DataTable";

interface Props {
    payments?: Payment[]; // Make payments optional
}

export default function MasterTable({ payments = [] }: Props) {
    // Provide default empty array
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={payments} />
        </div>
    );
}
