import {Column, Table} from "@tanstack/react-table";
import { useMemo} from "react";
import {CollTableDropDown} from "@/components/common/table/coll-dropdown";
import {capitalize, tableDisplayHeader} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import type {Table as ITable} from "@tanstack/react-table";

export function Filter<T>({
                    table,
    header
                }: {
    table: Table<T>,
    header:keyof T
}) {
    const column = table.getColumn(header as string)

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return typeof firstValue === 'number' || !column.getCanFilter() ? (
        <>
        </>
    ) : (

            <ItemDropDown<T>  title={`All ${capitalize(header as string,"_",{
                plural:{
                    count:12
                }
            })}`} headers={sortedUniqueValues.slice(0, 500)} checked={(col) => {
                return columnFilterValue === col

            }} onChange={(v,h) => {
                if(v){
                    column.setFilterValue(h)
                }else{
                    column.setFilterValue(undefined)
                }
            }} />

    )
}


type CollProps<T> =  {
    title:string
    onChange : (v:boolean,h:string) => void
    headers:string[]
    checked:(col:string) => boolean
}

function ItemDropDown<T> ({title,onChange,headers,checked}:CollProps<T>) {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto px-4">
                {title} <ChevronDownIcon className="ml-2 h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {headers.map((h,i) => {
                return (
                    <DropdownMenuCheckboxItem
                        key={i}
                        className="capitalize"
                        checked={checked(h)}
                        onCheckedChange={(v) => onChange(v,h)}
                    >
                        {h as string}
                    </DropdownMenuCheckboxItem>
                );
            })}
        </DropdownMenuContent>
    </DropdownMenu>
}