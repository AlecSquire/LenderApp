import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { differenceInDays, parseISO, isBefore } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Items({ items, setItems }) {
    const [loadingItems, setLoadingItems] = useState({});

    const toggleReturned = useCallback(
        async (id) => {
            try {
                setLoadingItems((prev) => ({ ...prev, [id]: true }));

                const getCsrfToken = () => {
                    const tokenMatch = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
                    return tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
                };

                const token = getCsrfToken();
                if (!token) throw new Error("CSRF token not found");

                const currentItem = items.find((item) => item.id === id);
                const newStatus = !currentItem.isReturned;

                // Optimistic update
                const optimisticItems = items.map((item) =>
                    item.id === id ? { ...item, isReturned: newStatus } : item
                );
                setItems(optimisticItems);

                const response = await fetch(`/api/items/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-XSRF-TOKEN": token,
                    },
                    credentials: "include",
                    body: JSON.stringify({ isReturned: newStatus }),
                });

                if (!response.ok) {
                    setItems(items); // Revert on failure
                    throw new Error("Failed to update item status");
                }

                const updatedItem = await response.json();
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? {
                                  ...item,
                                  ...updatedItem.data,
                                  isReturned: updatedItem.data.is_returned === 1,
                              }
                            : item
                    )
                );
            } catch (error) {
                console.error("Error toggling returned status:", error);
            } finally {
                setLoadingItems((prev) => ({ ...prev, [id]: false }));
            }
        },
        [items, setItems]
    );

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {items.length > 0 ? (
                items.map((item) => {
                    const returnDate = item.return_date ? parseISO(item.return_date) : null;
                    const daysRemaining = returnDate ? differenceInDays(returnDate, new Date()) : null;
                    const isOverdue = returnDate && isBefore(returnDate, new Date()) && !item.isReturned;
                    const isLending = item.transaction_type !== "borrowing";
                    const isLoading = loadingItems[item.id] || false;

                    if (item.isReturned) {
                        return (
                            <Card
                                key={item.id}
                                className={cn(
                                    "flex items-center justify-between p-4 bg-[#0d2b3e] border-[#0e7490] hover:border-[#06b6d4] transition-colors"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Badge
                                        className="gap-1 bg-[#0f172a] text-gray-300 hover:bg-[#1e293b]"
                                    >
                                        {isLending ? (
                                            <>
                                                <ArrowUpRight className="h-3 w-3" />
                                                Lending
                                            </>
                                        ) : (
                                            <>
                                                <ArrowDownLeft className="h-3 w-3" />
                                                Borrowing
                                            </>
                                        )}
                                    </Badge>
                                    <div>
                                        <p className="text-sm font-medium text-[#22d3ee]">
                                            {item.item_name} (Returned)
                                        </p>
                                        <p className="text-xs text-gray-400">{item.contact_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-[#22d3ee]" />
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleReturned(item.id)}
                                            className="text-[#22d3ee] hover:text-[#06b6d4] hover:bg-[#0f172a]"
                                        >
                                            Mark Active
                                        </Button>
                                    )}
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        asChild
                                        className="border-[#334155] bg-[#1e293b] text-white hover:bg-[#0f172a]"
                                    >
                                        <a href={`/item/${item.id}`}>
                                            View
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </Card>
                        );
                    }

                    return (
                        <Card
                            key={item.id}
                            className={cn(
                                "flex flex-col transition-colors bg-[#1e293b]",
                                isLending
                                    ? "border-[#3b82f6] hover:border-[#60a5fa]"
                                    : "border-[#0ea5e9] hover:border-[#38bdf8]",
                                isOverdue && "border-[#0ea5e9] bg-[#0c4a6e]/30"
                            )}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <Badge
                                        className="gap-1 bg-[#0f172a] text-gray-300 hover:bg-[#1e293b]"
                                    >
                                        {isLending ? (
                                            <>
                                                <ArrowUpRight className="h-3 w-3" />
                                                Lending
                                            </>
                                        ) : (
                                            <>
                                                <ArrowDownLeft className="h-3 w-3" />
                                                Borrowing
                                            </>
                                        )}
                                    </Badge>
                                    <div className="flex items-center gap-2">
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                                        ) : (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleReturned(item.id)}
                                                    className="text-[#60a5fa] hover:text-[#3b82f6] hover:bg-[#0f172a]"
                                                >
                                                    Mark Returned
                                                </Button>
                                                <span
                                                    className={cn(
                                                        "text-sm font-medium",
                                                        isOverdue
                                                            ? "text-[#38bdf8]"
                                                            : daysRemaining > 0
                                                            ? "text-[#60a5fa]"
                                                            : daysRemaining === 0
                                                            ? "text-[#38bdf8]"
                                                            : "text-gray-400"
                                                    )}
                                                >
                                                    {isOverdue
                                                        ? `${Math.abs(daysRemaining)} days overdue`
                                                        : daysRemaining > 0
                                                        ? `${daysRemaining} days remaining`
                                                        : daysRemaining === 0
                                                        ? "Due today!"
                                                        : "No due date"}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <CardTitle className="text-white">{item.item_name}</CardTitle>
                                <CardTitle className="font-normal text-base text-gray-400">
                                    {item.contact_name}
                                </CardTitle>
                                <CardDescription className="text-gray-400">{item?.item_description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-end">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-[#334155] bg-[#1e293b] text-white hover:bg-[#0f172a]"
                                    asChild
                                >
                                    <a href={`/item/${item.id}`}>
                                        View Case
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })
            ) : (
                <Card className="flex flex-col items-center justify-center text-center p-6 border-dashed border-2 border-[#334155] col-span-2 lg:col-span-1 h-60 bg-[#1e293b]">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">
                            Borrowed, but never forgotten
                        </CardTitle>
                        <CardDescription className="text-base mt-2 text-gray-400">
                            Keep track of items you lend to friends and set return dates. We'll help you remember what's out there and chase them up when the time comes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div className="flex items-center gap-4">
                                <ArrowUpRight className="h-8 w-8 text-[#60a5fa]" />
                                <ArrowDownLeft className="h-8 w-8 text-[#38bdf8]" />
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                Start by adding an item using the form on the right →
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}