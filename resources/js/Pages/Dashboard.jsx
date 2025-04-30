import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import DashboardLendForm from './DashboardLendForm';
// import { differenceInDays, parseISO } from "date-fns";
import { ModeToggle } from '@/components/mode-toggle';
import Items from './Items';

export default function Dashboard({ payments }) {
    const { auth } = usePage().props;
    const isAuthenticated = !!auth.user;

    const [greeting, setGreeting] = useState('');
    const [items, setItems] = useState([]);

    const fetchItems = useCallback(async (pageUrl = '/api/items') => {
        try {
            const response = await fetch(pageUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }

            const allItems = await response.json();
            setItems(allItems.data);
        } catch (error) {
            console.error('Error occurred when fetching items:', error);
        }
    }, []);

    const addItem = useCallback((newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        if (isAuthenticated) {
            const hour = new Date().getHours();
            let greetingText = 'Good evening';
            if (hour < 12) greetingText = 'Good morning';
            else if (hour < 18) greetingText = 'Good afternoon';
            setGreeting(`${greetingText}, ${auth.user.name}`);
        }
    }, [isAuthenticated, auth.user]);

    return (
        <AuthenticatedLayout>
            <Head title="Lender Dashboard" />
            <SidebarProvider>
                <SidebarInset className="bg-background min-h-screen">
                    <header className="bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center border-b px-6">
                        <h1 className="text-xl font-semibold">Lender</h1>
                        <Separator orientation="vertical" className="mx-4 h-6" />
                        <a href="/dashboard" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                            {isAuthenticated && greeting}
                        </a>
                        <div className="ml-auto flex items-center gap-4">
                            {isAuthenticated ? (
                                <Link
                                    href="/logout"
                                    method="post"
                                    className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                                >
                                    Log out
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                            <ModeToggle />
                        </div>
                    </header>

                    <div className="container mx-auto space-y-6 p-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <Card className="flex flex-col lg:h-[800px]">
                                <CardContent className="flex-1 overflow-auto p-0">
                                    <Items items={items} setItems={setItems} />
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col lg:h-[800px]">
                                <DashboardLendForm isAuthenticated={isAuthenticated} addItem={addItem} />
                            </Card>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}
