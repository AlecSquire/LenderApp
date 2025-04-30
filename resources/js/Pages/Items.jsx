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
import { ArrowUpRight, ArrowDownLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Items({ items, setItems }) {
    const [loadingItems, setLoadingItems] = useState({});

    const toggleReturned = useCallback(
        async (id) => {
            try {
                setLoadingItems((prev) => ({ ...prev, [id]: true }));

                const getCsrfToken = () => {
                    const tokenMatch =
                        document.cookie.match(/XSRF-TOKEN=([^;]+)/);
                    return tokenMatch
                        ? decodeURIComponent(tokenMatch[1])
                        : null;
                };

                const token = getCsrfToken();
                if (!token) {
                    throw new Error("CSRF token not found");
                }

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
                // Update state with full item data, mapping is_returned to isReturned
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? {
                                  ...item,
                                  ...updatedItem.data,
                                  isReturned:
                                      updatedItem.data.is_returned === 1,
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
                    const returnDate = item.return_date
                        ? parseISO(item.return_date)
                        : null;
                    const daysRemaining = returnDate
                        ? differenceInDays(returnDate, new Date())
                        : null;
                    const isOverdue =
                        returnDate &&
                        isBefore(returnDate, new Date()) &&
                        !item.isReturned;
                    const isLending = item.transaction_type !== "borrowing";
                    const isLoading = loadingItems[item.id] || false;

                    if (item.isReturned) {
                        return (
                            <Card
                                key={item.id}
                                className={cn(
                                    "flex items-center justify-between p-4 bg-green-50 border-green-200 hover:border-green-300 transition-colors"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant={
                                            isLending
                                                ? "destructive"
                                                : "default"
                                        }
                                        className="gap-1"
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
                                        <p className="text-sm font-medium text-green-800">
                                            {item.item_name} (Returned)
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.contact_name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                toggleReturned(item.id)
                                            }
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            Mark Active
                                        </Button>
                                    )}
                                    <Button variant="outline" size="sm" asChild>
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
                                "flex flex-col transition-colors",
                                isLending
                                    ? "border-orange-200 hover:border-orange-300"
                                    : "border-blue-200 hover:border-blue-300",
                                isOverdue && "border-red-300 bg-red-50"
                            )}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <Badge
                                        variant={
                                            isLending
                                                ? "destructive"
                                                : "default"
                                        }
                                        className="gap-1"
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
                                            <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                                        ) : (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        toggleReturned(item.id)
                                                    }
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                >
                                                    Mark Returned
                                                </Button>
                                                <span
                                                    className={cn(
                                                        "text-sm font-medium",
                                                        isOverdue
                                                            ? "text-red-600"
                                                            : daysRemaining > 0
                                                            ? "text-yellow-600"
                                                            : daysRemaining ===
                                                              0
                                                            ? "text-orange-600"
                                                            : "text-red-600"
                                                    )}
                                                >
                                                    {isOverdue
                                                        ? `${Math.abs(
                                                              daysRemaining
                                                          )} days overdue`
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
                                <CardTitle>{item.item_name}</CardTitle>
                                <CardTitle className="font-normal text-base text-muted-foreground">
                                    {item.contact_name}
                                </CardTitle>
                                <CardDescription>
                                    {item?.item_description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-end">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
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
                <Card className="flex flex-col items-center justify-center text-center p-6 border-dashed border-2 col-span-2 lg:col-span-1 h-60">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Borrowed, but never forgotten
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            Keep track of items you lend to friends and set
                            return dates. We'll help you remember what's out
                            there and chase them up when the time comes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div className="flex items-center gap-4">
                                <ArrowUpRight className="h-8 w-8 text-orange-500" />
                                <ArrowDownLeft className="h-8 w-8 text-blue-500" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                Start by adding an item using the form on the
                                right →
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
