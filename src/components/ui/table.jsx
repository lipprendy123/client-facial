import React from "react";
import { cn } from "../../lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full border-collapse table-auto", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
));
TableHead.displayName = "TableHead";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b", className)} // Tambahkan border-b untuk garis antar baris
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-4 py-2 text-left text-sm font-medium text-muted-foreground [&:nth-child(1)]:text-left", // Gaya default untuk header
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-2 text-sm", className)} // Gaya default untuk cell
    {...props}
  />
));
TableCell.displayName = "TableCell";


export {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
};