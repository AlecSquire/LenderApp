// ~/code/LenderApp/resources/js/Pages/DashboardLendForm.jsx
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
    DialogHeader,
    DialogTitle,
    DialogDescription,
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
                style={{ position: 'relative' }}
            >
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'hsla(20, 14.3%, 4.1%, 0.5)', zIndex: 10, cursor: 'pointer' }} />
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
            <Card className="card" style={{ height: '100%', boxShadow: '0 1px 3px hsla(0, 0%, 0%, 0.1)' }}>
                <CardHeader style={{ paddingBottom: '0.75rem', borderBottom: '1px solid hsl(20 14.3% 20%)' }}>
                    <CardTitle style={{ fontSize: '1.25rem', fontWeight: 600, color: 'hsl(var(--foreground))' }}>
                        Add New Item
                    </CardTitle>
                    <CardDescription style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                        Record an item you're {transactionType === "lending" ? "lending to someone" : "borrowing from someone"}
                    </CardDescription>
                </CardHeader>
                <CardContent style={{ paddingTop: '1.5rem' }}>
                    <FormWrapper>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '1.5rem', backgroundColor: 'hsla(20, 14.3%, 10%, 0.3)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'hsl(var(--foreground))' }}>I am:</span>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Controller
                                        name="transaction_type"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <input
                                                        type="radio"
                                                        id="lending"
                                                        value="lending"
                                                        style={{ display: 'none' }}
                                                        checked={field.value === "lending"}
                                                        onChange={() => field.onChange("lending")}
                                                    />
                                                    <label
                                                        htmlFor="lending"
                                                        onClick={() => field.onChange("lending")}
                                                        style={{
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '9999px',
                                                            fontSize: '0.875rem',
                                                            cursor: 'pointer',
                                                            backgroundColor: field.value === "lending" ? 'hsl(var(--primary))' : 'transparent',
                                                            color: field.value === "lending" ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                                                            border: field.value === "lending" ? 'none' : '1px solid hsla(20, 14.3%, 20%, 0.2)',
                                                        }}
                                                    >
                                                        Lending
                                                    </label>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <input
                                                        type="radio"
                                                        id="borrowing"
                                                        value="borrowing"
                                                        style={{ display: 'none' }}
                                                        checked={field.value === "borrowing"}
                                                        onChange={() => field.onChange("borrowing")}
                                                    />
                                                    <label
                                                        htmlFor="borrowing"
                                                        onClick={() => field.onChange("borrowing")}
                                                        style={{
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '9999px',
                                                            fontSize: '0.875rem',
                                                            cursor: 'pointer',
                                                            backgroundColor: field.value === "borrowing" ? 'hsl(var(--primary))' : 'transparent',
                                                            color: field.value === "borrowing" ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                                                            border: field.value === "borrowing" ? 'none' : '1px solid hsla(20, 14.3%, 20%, 0.2)',
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Label htmlFor="item_name" className="label">
                                    Item Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="item_name"
                                    className="input"
                                    style={{ height: '2.5rem' }}
                                    {...register("item_name", { required: "Item name is required" })}
                                    placeholder={transactionType === "lending" ? "What are you lending?" : "What are you borrowing?"}
                                />
                                {errors.item_name && (
                                    <p className="text-destructive" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.item_name.message}
                                    </p>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Label htmlFor="contact_name" className="label">
                                    Contact Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="contact_name"
                                    className="input"
                                    style={{ height: '2.5rem' }}
                                    {...register("contact_name", { required: "Contact name is required" })}
                                    placeholder={transactionType === "lending" ? "Who are you lending to?" : "Who are you borrowing from?"}
                                />
                                {errors.contact_name && (
                                    <p className="text-destructive" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.contact_name.message}
                                    </p>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Label htmlFor="contact_email" className="label">
                                    Contact Email <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="contact_email"
                                    type="email"
                                    className="input"
                                    style={{ height: '2.5rem' }}
                                    {...register("contact_email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                                    })}
                                    placeholder="Email address"
                                />
                                {errors.contact_email && (
                                    <p className="text-destructive" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.contact_email.message}
                                    </p>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <Label htmlFor="rough_return_period" className="label">
                                            Rough Return Date
                                        </Label>
                                        <Select onValueChange={handleRoughReturnChange}>
                                            <SelectTrigger className="select" style={{ height: '2.5rem', width: '100%' }}>
                                                <SelectValue placeholder="Select period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1week">1 week</SelectItem>
                                                <SelectItem value="1month">1 month</SelectItem>
                                                <SelectItem value="3months">3 months</SelectItem>
                                                <SelectItem value="6months">6 months</SelectItem>
                                                <SelectItem value="1year">1 year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="return_date" className="label">
                                            Exact Return Date <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="return_date"
                                            type="date"
                                            className="input"
                                            style={{ height: '2.5rem' }}
                                            {...register("return_date", { required: "Return date is required" })}
                                        />
                                        {errors.return_date && (
                                            <p className="text-destructive" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                {errors.return_date.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                className="button"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '0.875rem',
                                    color: 'hsl(var(--muted-foreground))',
                                    width: '100%',
                                    justifyContent: 'start',
                                    padding: 0,
                                    background: 'none',
                                }}
                                onClick={() => setShowDescription(!showDescription)}
                            >
                                {showDescription ? (
                                    <>
                                        <ChevronUp style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                                        Hide description
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                                        <PenLine style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                                        Add description (optional)
                                    </>
                                )}
                            </Button>
                            {showDescription && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', animation: 'fadeIn 0.2s' }}>
                                    <Label htmlFor="item_description" className="label" style={{ display: 'flex', alignItems: 'center' }}>
                                        Description <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginLeft: '0.25rem' }}>(optional)</span>
                                    </Label>
                                    <Textarea
                                        id="item_description"
                                        className="textarea"
                                        style={{ height: '6rem', resize: 'none' }}
                                        {...register("item_description")}
                                        placeholder="Add details about the item..."
                                    />
                                </div>
                            )}
                            <div style={{ marginTop: '2rem' }}>
                                <Button
                                    type="submit"
                                    className="button"
                                    style={{ width: '100%', height: '2.5rem', fontWeight: 500 }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <svg
                                                style={{ animation: 'spin 1s linear infinite', marginLeft: '0.25rem', marginRight: '0.5rem', height: '1rem', width: '1rem', color: 'hsl(var(--primary-foreground))' }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    style={{ opacity: 0.25 }}
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    style={{ opacity: 0.75 }}
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : (
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <Send style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
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
                <DialogContent style={{ maxWidth: '28rem' }}>
                    <DialogHeader>
                        <DialogTitle style={{ color: 'hsl(var(--foreground))' }}>Authentication Required</DialogTitle>
                        <DialogDescription style={{ color: 'hsl(var(--muted-foreground))' }}>
                            You need to be logged in or registered to save an item.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
                        <Button
                            className="button"
                            style={{ width: '100%', '@media (min-width: 640px)': { width: 'auto' } }}
                            onClick={handleLogin}
                        >
                            <LogIn style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                            Login
                        </Button>
                        <Button
                            className="button"
                            style={{ width: '100%', background: 'none', border: '1px solid hsl(var(--primary))', '@media (min-width: 640px)': { width: 'auto' } }}
                            onClick={handleRegister}
                        >
                            <UserPlus style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                            Register
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}