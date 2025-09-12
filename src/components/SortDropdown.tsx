import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
	sortBy: "id" | "name" | "quantity";
	sortDirection: "asc" | "desc";
	onSortChange: (
		sortBy: "id" | "name" | "quantity",
		direction: "asc" | "desc",
	) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
	sortBy,
	sortDirection,
	onSortChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSort = (newSortBy: "id" | "name" | "quantity") => {
		const newDirection =
			newSortBy === sortBy && sortDirection === "asc" ? "desc" : "asc";
		onSortChange(newSortBy, newDirection);
		setIsOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				type="button"
				onClick={toggleDropdown}
				className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200"
			>
				<span className="flex items-center">
					<ArrowUpDown size={16} className="mr-2 text-gray-500" />
					<span>
						{sortBy === "id" &&
							`Ordenar por Id: ${sortDirection === "asc" ? "Menor a Mayor" : "Mayor a Menor"}`}
						{sortBy === "name" &&
							`Ordenar por Nombre: ${sortDirection === "asc" ? "A-Z" : "Z-A"}`}
						{sortBy === "quantity" &&
							`Ordenar por Cantidad: ${sortDirection === "asc" ? "Menor a Mayor" : "Mayor a Menor"}`}
					</span>
				</span>
				<ChevronDown
					size={16}
					className={`ml-2 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1 divide-y divide-gray-100">
						<button
							type="button"
							onClick={() => handleSort("id")}
							className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === "id" ? "text-blue-600 font-medium" : "text-gray-700"}`}
						>
							Ordenar por Id
							{sortBy === "id" && (
								<span className="text-blue-600">
									{sortDirection === "asc" ? "↑" : "↓"}
								</span>
							)}
						</button>
						<button
							type="button"
							onClick={() => handleSort("name")}
							className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === "name" ? "text-blue-600 font-medium" : "text-gray-700"}`}
						>
							Ordenar por Nombre
							{sortBy === "name" && (
								<span className="text-blue-600">
									{sortDirection === "asc" ? "↑" : "↓"}
								</span>
							)}
						</button>
						<button
							type="button"
							onClick={() => handleSort("quantity")}
							className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === "quantity" ? "text-blue-600 font-medium" : "text-gray-700"}`}
						>
							Ordenar por Cantidad
							{sortBy === "quantity" && (
								<span className="text-blue-600">
									{sortDirection === "asc" ? "↑" : "↓"}
								</span>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SortDropdown;
