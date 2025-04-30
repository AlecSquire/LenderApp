import { Link } from "@inertiajs/react";

const Pagination = ({ pagination, onPageChange }) => {
    return (
        <nav className="flex justify-center mt-4">
            {pagination.links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url} // Disable buttons without a URL
                    onClick={() => onPageChange(link.url)}
                    className={`px-3 py-2 mx-1 text-sm rounded ${
                        link.active ? "bg-gray-200 text-black" : "text-gray-600"
                    } ${!link.url ? "text-gray-300 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
};

export default Pagination;
