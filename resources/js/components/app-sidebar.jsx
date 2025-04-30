import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Bell,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    User, // Added new icon
    CreditCard, // Added new icon for the cash lending feature
    MessageCircle, // Added new icon for contact features (e.g., mobile, WhatsApp)
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { ModeToggle } from "./mode-toggle";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
// const data = {
//     user: {
//         name: "Alec",
//         email: "als@lender.com",
//         avatar: "/avatars/shadcn.jpg", // This could link to the user's profile image
//     },
//     borrowedItems: [
//         {
//             item: "Lawnmower",
//             borrowedFrom: "John Doe",
//             contact: "john@example.com",
//             dueDate: "2025-01-15",
//             notificationsSent: 3,
//             status: "Overdue",
//             contactMethods: ["Email", "Mobile", "WhatsApp"], // Future feature could add more contact options
//         },
//         {
//             item: "Camera",
//             borrowedFrom: "Jane Smith",
//             contact: "jane@example.com",
//             dueDate: "2025-02-01",
//             notificationsSent: 1,
//             status: "On Time",
//             contactMethods: ["Email"],
//         },
//     ],
//     teams: [
//         {
//             name: "Acme Inc",
//             logo: GalleryVerticalEnd,
//             plan: "Enterprise",
//         },
//         {
//             name: "Acme Corp.",
//             logo: AudioWaveform,
//             plan: "Startup",
//         },
//     ],
//     navMain: [
//         {
//             title: "Items",
//             url: "#",
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: "All items",
//                     url: "/items",
//                 },
//                 {
//                     title: "Starred",
//                     url: "/items/starred",
//                 },
//             ],
//         },
//         {
//             title: "Lenders",
//             url: "#",
//             icon: Bell,
//             items: [
//                 {
//                     title: "lenders",
//                     url: "/lender",
//                 },
//                 {
//                     title: "create lender",
//                     url: "/lender/create",
//                 },
//             ],
//         },
//         {
//             title: "Borrowers",
//             url: "#",
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: "Borrowers",
//                     url: "/borrower",
//                 },
//                 {
//                     title: "Add",
//                     url: "/borrower/create",
//                 },
//             ],
//         },
//         {
//             title: "Users",
//             url: "#",
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: "Users",
//                     url: "/users",
//                 },
//                 {
//                     title: "Add",
//                     url: "/users/create",
//                 },
//             ],
//         },

//         {
//             title: "Settings",
//             url: "#",
//             icon: Settings2,
//             items: [
//                 {
//                     title: "General",
//                     url: "#",
//                 },
//                 {
//                     title: "Team",
//                     url: "#",
//                 },
//             ],
//         },
//     ],
//     stretchGoals: [
//         {
//             goal: "Public Shaming",
//             description: "Show overdue items publicly on the app.",
//             isActive: true,
//         },
//         {
//             goal: "Cash Lending",
//             description: "Allow lending with interest calculation.",
//             isActive: true,
//         },
//     ],
//     projects: [
//         {
//             name: "Lender Backend",
//             url: "#",
//             icon: Bell,
//         },
//         {
//             name: "App Design",
//             url: "#",
//             icon: Bell,
//         },
//     ],
// };

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <a href="/dashboard">Lender</a>
            </SidebarHeader>
            <ModeToggle />
            <SidebarContent>
                {/* <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
