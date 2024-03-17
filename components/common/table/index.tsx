'use client';

import { useState } from 'react';
import {
	CaretSortIcon,
	ChevronDownIcon,
	DotsHorizontalIcon,
	EyeOpenIcon,
	Pencil2Icon,
	TrashIcon,
} from '@radix-ui/react-icons';
import {
	Column,
	ColumnDef,
	ColumnFiltersState,
	Row,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { capitalize } from '@/lib/utils';
import { TablePagination } from './pagination';
import Link from 'next/link';
import { tableDisplayHeader } from '@/lib/utils';

export type Props<T extends { id: string }> = {
	filterColumn: keyof T;
	headers: {
		title: string;
		accessorKey: keyof T;
	}[];

	data: T[];
	url?: string;
	customColumns?: ColumnDef<T>[];
	filterTitle: string;
	editHandler?: (row: T) => void;
	deleteHandler?: (row: T) => void;
	customOperations?: {
		title: string;
		handler: (row: T) => void;
	}[];
	words_separator: '-' | '_' | ' ';
};

export function DataTable<T extends { id: string }>({
	data,
	filterColumn,
	filterTitle,
	headers,
	customColumns = [],
	editHandler = undefined,
	deleteHandler = undefined,
	customOperations,
	url = '/dashboard',
	words_separator = '_',
}: Props<T>) {
	const columns: ColumnDef<T>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					//@ts-ignore
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		...headers.map((header) => ({
			accessorKey: header.accessorKey,
			header: ({ column }: { column: Column<T, unknown> }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						{header.title}
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }: { row: Row<T> }) => (
				<div className="capitalize text-center">
					{row.getValue(header.accessorKey as string)}
				</div>
			),
		})),
	];
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns: columns.concat(...customColumns, {
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const selectedRow = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<DotsHorizontalIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(selectedRow.id)}>
								Copy ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<Link href={`${url}/${selectedRow.id}`}>
								<DropdownMenuItem className="flex justify-between">
									<span>View details</span>
									<EyeOpenIcon />
								</DropdownMenuItem>
							</Link>
							{customOperations &&
								customOperations.map((operation) => (
									<DropdownMenuItem
										key={operation.title}
										className="flex gap-1"
										onClick={() => operation.handler(selectedRow)}>
										<span>{capitalize(operation.title, words_separator)}</span>
									</DropdownMenuItem>
								))}
							{editHandler && (
								<DropdownMenuItem
									className="flex justify-between"
									onClick={() => editHandler(selectedRow)}>
									<span>Edit</span>
									<Pencil2Icon />
								</DropdownMenuItem>
							)}

							<DropdownMenuSeparator />
							{deleteHandler && (
								<DropdownMenuItem
									className="flex justify-between text-red-700"
									onClick={() => deleteHandler(selectedRow)}>
									<span>Delete</span>
									<TrashIcon />
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		}),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="space-y-4 overflow-hidden bg-white p-4 rounded-md min-w-[580px]">
			<div className="flex items-center py-4">
				<Input
					placeholder={filterTitle}
					value={
						(table
							.getColumn(filterColumn as string)
							?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table
							.getColumn(filterColumn as string)
							?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}>
										{
											tableDisplayHeader<T>(
												headers,
												column.id as keyof T
											) as React.ReactNode
										}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<TablePagination<T> table={table} />
		</div>
	);
}

DataTable.displayName = 'DataTable';
