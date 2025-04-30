import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Send,
    LogIn,
    UserPlus,
    ChevronDown,
    ChevronUp,
    PenLine,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function DashboardLendForm({ isAuthenticated, addItem }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            transaction_type: "lending",
            item_name: "",
            return_date: "",
            contact_name: "",
            contact_email: "",
            item_description: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const transactionType = watch("transaction_type");

    const FormWrapper = ({ children }) => {
        if (isAuthenticated) {
            return <>{children}</>;
        }
        return (
            <div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAuthModal(true);
                }}
                className="relative"
            >
                <div className="absolute inset-0 bg-background/50 z-10 cursor-pointer" />
                {children}
            </div>
        );
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await fetch("/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include",
            });

            const getCsrfToken = () => {
                const tokenMatch = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
                return tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
            };

            const token = getCsrfToken();
            if (!token) {
                throw new Error("CSRF token not found");
            }

            const response = await fetch("/api/items", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": token,
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to submit");
            }

            const newItem = await response.json();
            addItem(newItem.data || newItem);
            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        router.visit("/login");
    };

    const handleRegister = () => {
        router.visit("/register");
    };

    const handleRoughReturnChange = (value) => {
        const today = new Date();
        let returnDate = new Date(today);

        switch (value) {
            case "1week":
                returnDate.setDate(today.getDate() + 7);
                break;
            case "1month":
                returnDate.setMonth(today.getMonth() + 1);
                break;
            case "3months":
                returnDate.setMonth(today.getMonth() + 3);
                break;
            case "6months":
                returnDate.setMonth(today.getMonth() + 6);
                break;
            case "1year":
                returnDate.setFullYear(today.getFullYear() + 1);
                break;
        }

        const formattedDate = returnDate.toISOString().split("T")[0];
        setValue("return_date", formattedDate);
    };

    return (
        <>
            <Card className="h-full shadow-sm">
                <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-xl font-semibold">
                        Add New Item
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Record an item you're{" "}
                        {transactionType === "lending"
                            ? "lending to someone"
                            : "borrowing from someone"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <FormWrapper>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-5">
                                <div className="flex items-center justify-start gap-6 bg-muted/30 p-3 rounded-lg">
                                    <span className="text-sm font-medium">
                                        I am:
                                    </span>
                                    <div className="flex gap-4">
                                        <Controller
                                            name="transaction_type"
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            id="lending"
                                                            value="lending"
                                                            className="peer sr-only"
                                                            checked={
                                                                field.value ===
                                                                "lending"
                                                            }
                                                            onChange={() =>
                                                                field.onChange(
                                                                    "lending"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="lending"
                                                            onClick={() =>
                                                                field.onChange(
                                                                    "lending"
                                                                )
                                                            }
                                                            className="px-3 py-1 rounded-full text-sm cursor-pointer transition-colors border border-transparent hover:border-muted-foreground/20"
                                                            style={{
                                                                backgroundColor:
                                                                    field.value ===
                                                                    "lending"
                                                                        ? "var(--primary)"
                                                                        : "transparent",
                                                                color:
                                                                    field.value ===
                                                                    "lending"
                                                                        ? "var(--primary-foreground)"
                                                                        : "inherit",
                                                            }}
                                                        >
                                                            Lending
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            id="borrowing"
                                                            value="borrowing"
                                                            className="peer sr-only"
                                                            checked={
                                                                field.value ===
                                                                "borrowing"
                                                            }
                                                            onChange={() =>
                                                                field.onChange(
                                                                    "borrowing"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="borrowing"
                                                            onClick={() =>
                                                                field.onChange(
                                                                    "borrowing"
                                                                )
                                                            }
                                                            className="px-3 py-1 rounded-full text-sm cursor-pointer transition-colors border border-transparent hover:border-muted-foreground/20"
                                                            style={{
                                                                backgroundColor:
                                                                    field.value ===
                                                                    "borrowing"
                                                                        ? "var(--primary)"
                                                                        : "transparent",
                                                                color:
                                                                    field.value ===
                                                                    "borrowing"
                                                                        ? "var(--primary-foreground)"
                                                                        : "inherit",
                                                            }}
                                                        >
                                                            Borrowing
                                                        </label>
                                                    </div>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="item_name"
                                        className="text-sm font-medium"
                                    >
                                        Item Name{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="item_name"
                                        className="h-10"
                                        {...register("item_name", {
                                            required: "Item name is required",
                                        })}
                                        placeholder={
                                            transactionType === "lending"
                                                ? "What are you lending?"
                                                : "What are you borrowing?"
                                        }
                                    />
                                    {errors.item_name && (
                                        <p className="text-xs text-destructive mt-1">
                                            {errors.item_name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="contact_name"
                                        className="text-sm font-medium"
                                    >
                                        Contact Name{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="contact_name"
                                        className="h-10"
                                        {...register("contact_name", {
                                            required:
                                                "Contact name is required",
                                        })}
                                        placeholder={
                                            transactionType === "lending"
                                                ? "Who are you lending to?"
                                                : "Who are you borrowing from?"
                                        }
                                    />
                                    {errors.contact_name && (
                                        <p className="text-xs text-destructive mt-1">
                                            {errors.contact_name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="contact_email"
                                        className="text-sm font-medium"
                                    >
                                        Contact Email{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        className="h-10"
                                        {...register("contact_email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email format",
                                            },
                                        })}
                                        placeholder="Email address"
                                    />
                                    {errors.contact_email && (
                                        <p className="text-xs text-destructive mt-1">
                                            {errors.contact_email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label
                                                htmlFor="rough_return_period"
                                                className="text-sm font-medium"
                                            >
                                                Rough Return Date
                                            </Label>
                                            <Select
                                                onValueChange={(value) =>
                                                    handleRoughReturnChange(
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="h-10 w-full">
                                                    <SelectValue placeholder="Select period" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1week">
                                                        1 week
                                                    </SelectItem>
                                                    <SelectItem value="1month">
                                                        1 month
                                                    </SelectItem>
                                                    <SelectItem value="3months">
                                                        3 months
                                                    </SelectItem>
                                                    <SelectItem value="6months">
                                                        6 months
                                                    </SelectItem>
                                                    <SelectItem value="1year">
                                                        1 year
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="return_date"
                                                className="text-sm font-medium"
                                            >
                                                Exact Return Date{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="return_date"
                                                type="date"
                                                className="h-10"
                                                {...register("return_date", {
                                                    required:
                                                        "Return date is required",
                                                })}
                                            />
                                            {errors.return_date && (
                                                <p className="text-xs text-destructive mt-1">
                                                    {errors.return_date.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex items-center text-sm text-muted-foreground w-full justify-start px-0 hover:bg-transparent"
                                    onClick={() =>
                                        setShowDescription(!showDescription)
                                    }
                                >
                                    {showDescription ? (
                                        <>
                                            <ChevronUp className="h-4 w-4 mr-1" />
                                            Hide description
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="h-4 w-4 mr-1" />
                                            <PenLine className="h-4 w-4 mr-1" />
                                            Add description (optional)
                                        </>
                                    )}
                                </Button>
                                {showDescription && (
                                    <div className="space-y-2 animate-in fade-in-50 duration-200">
                                        <Label
                                            htmlFor="item_description"
                                            className="text-sm font-medium flex items-center"
                                        >
                                            Description{" "}
                                            <span className="text-xs text-muted-foreground ml-1">
                                                (optional)
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="item_description"
                                            className="h-24 resize-none"
                                            {...register("item_description")}
                                            placeholder="Add details about the item..."
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mt-8">
                                <Button
                                    type="submit"
                                    className="w-full h-10 font-medium"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="animate-spin ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            Save Item
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </FormWrapper>
                </CardContent>
            </Card>
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Authentication Required</DialogTitle>
                        <DialogDescription>
                            You need to be logged in or registered to save an
                            item.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                        <Button
                            className="w-full sm:w-auto"
                            onClick={handleLogin}
                            variant="default"
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                        <Button
                            className="w-full sm:w-auto"
                            onClick={handleRegister}
                            variant="outline"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Register
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
