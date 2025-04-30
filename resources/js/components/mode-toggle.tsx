import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/Components/ThemeProvider";

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Palette className="mr-2 h-4 w-4" />
                    Color Themes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("blue")}>
                    🌊 Blue
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("green")}>
                    🌿 Green
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("red")}>
                    🔥 Red
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
