import { Link } from "react-router-dom";

export default function ArticleLink({ children, to }: { children: React.ReactNode, to: string }) {
    return (
            <Link to={to} className="underline hover:text-primary-600">{children}</Link>
    )
}