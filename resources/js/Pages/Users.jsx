import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function Users() {
    const [users, setUsers] = useState([]); // Stores the item data
    const [pagination, setPagination] = useState(null); // Stores pagination metadata
    // const [returned, setReturned] = useState(false); // Stores the returned state for toggling (initial false)

    // Toggle the 'returned' state for a specific user
    const toggler = (id) => {
        setReturned((prev) => !prev);
        // Implement back-end logic to update the 'returned' status if needed
    };

    const fetchUsers = async (pageUrl = "/api/users") => {
        try {
            const response = await fetch(pageUrl);
            const allUsers = await response.json();
            setUsers(allUsers); // Update the users
            setPagination(allUsers); // Store pagination metadata
        } catch (error) {
            console.error("Error occurred when fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch initial users
    }, []);

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="ml-1" />
                            <h1>All Users</h1>
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                        </div>
                    </header>

                    <div>
                        {users.map((person) => (
                            <div key={person.id}>
                                <Card>
                                    <div className="w-100 rounded-sm bg-muted/50">
                                        <CardHeader>
                                            <CardTitle>
                                                <p> Name: {person.name}</p>
                                            </CardTitle>
                                            <CardDescription>
                                                <p>email: {person.email}</p>
                                            </CardDescription>
                                        </CardHeader>

                                        <CardFooter>
                                            <Button
                                                className="mx-2"
                                                onClick={() =>
                                                    toggler(person.id)
                                                }
                                            >
                                                Send a notification?
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    toggler(person.id)
                                                }
                                            >
                                                Update details
                                            </Button>
                                        </CardFooter>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* {pagination && (
                        <Pagination
                            pagination={pagination}
                            onPageChange={(url) => fetchUsers(url)} // Fetch users for the selected page
                        />
                    )} */}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
