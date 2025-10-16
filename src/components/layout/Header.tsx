import { Button } from "../ui";

export default function Header() {
    return (
        <header className="w-full p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Header</h1>
            <Button variant="ghost">Click Me</Button>
        </header>
    )
}