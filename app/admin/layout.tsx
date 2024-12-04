import AdminNavBar from "@/components/header/AdminNavBar";
import ToastNotification from "@/components/ui/ToastNotification";


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <>
            <header className="bg-gradient-to-r from-sky-950 to-teal-700">
                <AdminNavBar />
            </header>
            <main>
                {children}
            </main>
            <ToastNotification />
        </>
    )
}
