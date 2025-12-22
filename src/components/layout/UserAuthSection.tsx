// // src/components/layout/UserAuthSection.tsx
// import { useTranslations } from "next-intl";
// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import { User, LogOut, Settings, Package } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function UserAuthSection() {
//   const t = useTranslations();
//   const { data: session, status } = useSession();

//   const handleSignOut = async () => {
//     await signOut({ callbackUrl: "/" });
//   };

//   if (status === "loading") {
//     return <Skeleton className="h-8 w-8 rounded-full hidden sm:flex" />;
//   }

//   if (session) {
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild className="hidden sm:flex">
//           <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//             <Avatar className="h-8 w-8">
//               <AvatarImage
//                 src={session.user?.image || ""}
//                 alt={session.user?.name || "User"}
//               />
//               <AvatarFallback>
//                 {session.user?.name?.charAt(0).toUpperCase() || "U"}
//               </AvatarFallback>
//             </Avatar>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56" align="end" forceMount>
//           <DropdownMenuLabel className="font-normal">
//             <div className="flex flex-col space-y-1">
//               <p className="text-sm font-medium leading-none">
//                 {session.user?.name}
//               </p>
//               <p className="text-xs leading-none text-muted-foreground">
//                 {session.user?.email}
//               </p>
//             </div>
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem asChild>
//             <Link href="/profile" className="cursor-pointer">
//               <User className="mr-2 h-4 w-4" />
//               <span>{t("nav.profile")}</span>
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem asChild>
//             <Link href="/orders" className="cursor-pointer">
//               <Package className="mr-2 h-4 w-4" />
//               <span>{t("nav.orders")}</span>
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem asChild>
//             <Link href="/profile?tab=security" className="cursor-pointer">
//               <Settings className="mr-2 h-4 w-4" />
//               <span>{t("nav.settings")}</span>
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={handleSignOut}
//             className="cursor-pointer text-destructive focus:text-destructive"
//           >
//             <LogOut className="mr-2 h-4 w-4" />
//             <span>{t("nav.logout")}</span>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );
//   }

//   return (
//     <Button variant="default" size="sm" asChild>
//       <Link href="/auth/login">{t("nav.login")}</Link>
//     </Button>
//   );
// }
"use client";

import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Settings, Package, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserAuthSection() {
  const t = useTranslations();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <Skeleton className="h-9 w-9 rounded-full hidden sm:flex border-2 border-slate-100" />;
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden sm:flex">
          <Button variant="ghost" className="group h-10 gap-2 px-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <div className="relative">
              <Avatar className="h-8 w-8 border-2 border-primary/20 group-hover:border-primary transition-colors">
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-slate-950"></span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-primary transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 p-2 rounded-2xl shadow-2xl border-2 border-slate-100 dark:border-slate-800" align="end">
          <DropdownMenuLabel className="font-normal p-3">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs font-medium text-slate-500 leading-none">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator className="mx-2 bg-slate-100 dark:bg-slate-800" />
          
          <div className="p-1 space-y-1">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors font-bold text-sm text-slate-600 dark:text-slate-300">
                <User className="h-4 w-4" />
                <span>{t("nav.profile")}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/orders" className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors font-bold text-sm text-slate-600 dark:text-slate-300">
                <Package className="h-4 w-4" />
                <span>{t("nav.orders")}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/profile?tab=security" className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors font-bold text-sm text-slate-600 dark:text-slate-300">
                <Settings className="h-4 w-4" />
                <span>{t("nav.settings")}</span>
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="mx-2 bg-slate-100 dark:bg-slate-800" />
          
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-3 p-2.5 m-1 rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-black text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>{t("nav.logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      variant="default" 
      size="sm" 
      asChild 
      className="bg-primary hover:bg-primary/90 rounded-bl-md px-6 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
    >
      <Link href="/auth/login">{t("nav.login")}</Link>
    </Button>
  );
}