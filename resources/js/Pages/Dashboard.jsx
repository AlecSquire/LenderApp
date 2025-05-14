import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import DashboardLendForm from './DashboardLendForm';
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
                    <header
                        className="sticky top-0 z-50 flex h-16 items-center border-b border-[hsl(20_14.3%_20%)] bg-background px-6"
                    >
                        <h1 className="text-xl font-semibold text-foreground">Lender</h1>
                        <Separator orientation="vertical" className="mx-4 h-6 bg-[hsl(20_14.3%_20%)]" />
                        <a
                            href="/dashboard"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            {isAuthenticated && greeting}
                        </a>
                        <div className="ml-auto flex items-center gap-4">
                            {isAuthenticated ? (
                                <Link
                                    href="/logout"
                                    method="post"
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                >
                                    Log out
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </header>

                    <div className="mx-auto max-w-7xl px-6 py-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Card className="card flex flex-col h-[800px]">
                                <CardContent className="flex-1 overflow-auto p-0">
                                    <Items items={items} setItems={setItems} />
                                </CardContent>
                            </Card>
                            <Card className="card flex flex-col h-[800px]">
                                <DashboardLendForm isAuthenticated={isAuthenticated} addItem={addItem} />
                            </Card>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}