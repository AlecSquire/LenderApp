import { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight, ArrowDownLeft, Calendar, Mail, User, Package, CheckCircle2, XCircle, ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Item({ auth }) {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);
    const [notes, setNotes] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isConfirmReturnOpen, setIsConfirmReturnOpen] = useState(false);
    const { url } = usePage();
    const id = url.split("/").pop();

    // Format date safely
    const formatDate = (dateString) => {
        try {
            if (!dateString) return "No date returned";
            const timestamp = Date.parse(dateString);
            if (isNaN(timestamp)) return "No date returned";
            const date = new Date(dateString);
            if (
                date.getFullYear() === 1970 &&
                date.getMonth() === 0 &&
                date.getDate() === 1
            ) {
                return "No date returned";
            }
            return format(date, "PPP");
        } catch (error) {
            console.error("Error formatting date:", error);
            return "No date returned";
        }
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/items/${id}`, {
                    method: "GET",
                    headers: { Accept: "application/json" },
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch item");
                const data = await response.json();
                setItem(data.data || data);
                setNotes(data.data?.notes || data.notes || "");
                setError(null);
            } catch (error) {
                setError("Error fetching item data. Please try again.");
                console.error("Error fetching item:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const notify = async (item) => {
        try {
            setSending(true);
            const response = await fetch("/api/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error("Failed to send notification");
        } catch (error) {
            console.error("Error sending notification:", error);
        } finally {
            setSending(false);
        }
    };

    const handleNotesUpdate = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify({ notes }),
            });
            if (!response.ok) throw new Error("Failed to update notes");
            setItem((prev) => ({ ...prev, notes }));
        } catch (error) {
            console.error("Error updating notes:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
            });
            if (!response.ok) throw new Error("Failed to delete item");
            router.visit(route("dashboard"));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleStatusChange = async (isReturned) => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify({ isReturned }),
            });
            if (!response.ok) throw new Error("Failed to update item status");
            const updatedItem = await response.json();
            setItem((prev) => ({ ...prev, isReturned }));
            setIsConfirmReturnOpen(false);
        } catch (error) {
            console.error("Error updating item status:", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Item Details</h2>
                    <Link
                        href={route("dashboard")}
                        className="text-sm font-medium text-gray-300 hover:text-white"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            }
        >
            <Head title={item ? `Item - ${item.item_name}` : "Loading..."} />

            <SidebarProvider>
                <SidebarInset className="bg-[#0f172a] min-h-screen p-6">
                    {loading ? (
                        <div className="container mx-auto text-white">Loading...</div>
                    ) : error ? (
                        <div className="container mx-auto">
                            <Card className="bg-[#1e293b] border-[#334155]">
                                <CardContent className="pt-6">
                                    <div className="text-[#60a5fa]">{error}</div>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(route("dashboard"))}
                                        className="mt-4 border-[#334155] text-white hover:bg-[#0f172a]"
                                    >
                                        Take me home
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ) : !item ? (
                        <div className="container mx-auto text-white">Item not found</div>
                    ) : (
                        <div className="container mx-auto max-w-5xl">
                            <div className="flex items-center mb-6">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="mr-4 text-gray-300 hover:text-white hover:bg-[#1e293b]"
                                >
                                    <Link href={route("dashboard")}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Dashboard
                                    </Link>
                                </Button>
                                <Badge
                                    className="gap-1 bg-[#0f172a] text-gray-300 hover:bg-[#1e293b]"
                                >
                                    {item.transaction_type !== "borrowing" ? (
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
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <Card className="md:col-span-2 bg-[#1e293b] border-[#334155]">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-2xl text-white">
                                                    {item.item_name}
                                                </CardTitle>
                                                <CardDescription className="mt-2 text-gray-400">
                                                    {item.item_description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Tabs defaultValue="details" className="w-full">
                                            <TabsList className="bg-[#0f172a]">
                                                <TabsTrigger 
                                                    value="details"
                                                    className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-white text-gray-400"
                                                >
                                                    Details
                                                </TabsTrigger>
                                                <TabsTrigger 
                                                    value="notes"
                                                    className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-white text-gray-400"
                                                >
                                                    Notes
                                                </TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="details" className="space-y-4">
                                                <div className="grid gap-4 py-4">
                                                    {[
                                                        { icon: User, label: "Contact Name", value: item.contact_name },
                                                        { icon: Mail, label: "Contact Email", value: item.contact_email },
                                                        { icon: Package, label: "Item Name", value: item.item_name },
                                                        { icon: Calendar, label: "Return Date", value: formatDate(item.return_date) },
                                                    ].map(({ icon: Icon, label, value }) => (
                                                        <div key={label} className="grid grid-cols-4 items-center gap-4">
                                                            <Label className="text-right">
                                                                <Icon className="h-4 w-4 ml-auto text-gray-400" />
                                                            </Label>
                                                            <div className="col-span-3">
                                                                <p className="font-medium text-white">{value}</p>
                                                                <p className="text-sm text-gray-400">{label}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="notes">
                                                <div className="space-y-4">
                                                    <Textarea
                                                        placeholder="Add notes about this item..."
                                                        className="min-h-[200px] bg-[#0f172a] border-[#334155] text-white placeholder-gray-400 focus:border-[#3b82f6] focus:ring focus:ring-[#3b82f6] focus:ring-opacity-20"
                                                        value={notes}
                                                        onChange={(e) => setNotes(e.target.value)}
                                                    />
                                                    <Button
                                                        onClick={handleNotesUpdate}
                                                        disabled={isSaving}
                                                        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                                                    >
                                                        {isSaving ? (
                                                            "Saving..."
                                                        ) : (
                                                            <>
                                                                <Save className="mr-2 h-4 w-4" />
                                                                Save Notes
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>

                                <div className="space-y-6">
                                    <Card className="bg-[#1e293b] border-[#334155]">
                                        <CardHeader>
                                            <CardTitle className="text-white">Status</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-white">
                                                        Current Status
                                                    </span>
                                                    <Badge
                                                        variant={item.isReturned ? "outline" : "secondary"}
                                                        className={cn(
                                                            item.isReturned
                                                                ? "text-[#22d3ee] border-[#0e7490]" 
                                                                : "text-[#60a5fa] bg-[#0f172a]"
                                                        )}
                                                    >
                                                        {item.isReturned ? "Returned" : "Active"}
                                                    </Badge>
                                                </div>
                                                <Separator className="bg-[#334155]" />
                                                <div className="space-y-2">
                                                    <Label className="text-sm text-white">Mark as:</Label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Dialog
                                                            open={isConfirmReturnOpen}
                                                            onOpenChange={setIsConfirmReturnOpen}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="w-full border-[#334155] bg-[#1e293b] text-white hover:bg-[#0f172a]"
                                                                    disabled={item.isReturned}
                                                                >
                                                                    <CheckCircle2 className="mr-2 h-4 w-4 text-[#22d3ee]" />
                                                                    Returned
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="bg-[#1e293b] border-[#334155] text-white">
                                                                <DialogHeader>
                                                                    <DialogTitle className="text-white">
                                                                        Mark as Returned
                                                                    </DialogTitle>
                                                                    <DialogDescription className="text-gray-400">
                                                                        Are you sure you want to mark this item as returned? This will delete the item from your list.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <DialogFooter className="mt-4">
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() => setIsConfirmReturnOpen(false)}
                                                                        className="border-[#334155] text-white hover:bg-[#0f172a]"
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                    <Button
                                                                        variant="default"
                                                                        onClick={() => handleStatusChange(true)}
                                                                        className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                                                                    >
                                                                        Confirm
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-full border-[#334155] bg-[#1e293b] text-white hover:bg-[#0f172a]"
                                                            disabled={!item.isReturned}
                                                            onClick={() => handleStatusChange(false)}
                                                        >
                                                            <XCircle className="mr-2 h-4 w-4 text-[#60a5fa]" />
                                                            Active
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-[#1e293b] border-[#334155]">
                                        <CardHeader>
                                            <CardTitle className="text-white">Quick Actions</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <Button
                                                className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white"
                                                variant="secondary"
                                                onClick={() => notify(item)}
                                            >
                                                {sending ? "Sending..." : "Send reminder"}
                                            </Button>

                                            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                                                <DialogTrigger asChild>
                                                    <Button className="w-full bg-[#0c4a6e] hover:bg-[#0369a1] text-white" variant="destructive">
                                                        Delete Case
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-[#1e293b] border-[#334155] text-white">
                                                    <DialogHeader>
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 rounded-full bg-[#0c4a6e]/30">
                                                                <AlertTriangle className="h-6 w-6 text-[#38bdf8]" />
                                                            </div>
                                                            <div>
                                                                <DialogTitle className="text-white">
                                                                    Delete Item
                                                                </DialogTitle>
                                                                <DialogDescription className="text-gray-400">
                                                                    Are you sure you want to delete this item? This action cannot be undone.
                                                                </DialogDescription>
                                                            </div>
                                                        </div>
                                                    </DialogHeader>
                                                    <div className="rounded-lg border border-[#334155] p-4 mt-4">
                                                        <div className="space-y-3">
                                                            <div>
                                                                <span className="text-sm font-medium text-white">
                                                                    Item Name
                                                                </span>
                                                                <p className="text-sm text-gray-400">{item.item_name}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm font-medium text-white">
                                                                    Contact
                                                                </span>
                                                                <p className="text-sm text-gray-400">{item.contact_name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="mt-4">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setIsDeleteOpen(false)}
                                                            className="border-[#334155] text-white hover:bg-[#0f172a]"
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={handleDelete}
                                                            className="bg-[#0c4a6e] hover:bg-[#0369a1] text-white"
                                                        >
                                                            Delete Item
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )}
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}