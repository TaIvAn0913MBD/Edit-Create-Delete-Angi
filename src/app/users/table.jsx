"use client";

import * as React from "react";

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Settings } from "lucide-react";
import { useState } from "react";
import { UserEditDialog } from "./user-edit-dialog";
export function UsersTable(props) {
  const { data } = props;
  const { loadValue } = props;
  const [filterNameValue, setFilterNameValue] = useState("");
  const [createEditModalOpen, setCreateEditModalOpen] = useState(false);
  const HandleInputValue = (value) => {
    setFilterNameValue(value);
  };
  const FilterNames = data.filter((item) => {
    const LowerCaseNames = item.lastname.toLowerCase();
    const InputValueLowerCased = filterNameValue.toLowerCase();
    return LowerCaseNames.includes(InputValueLowerCased);
  });
  const [editData, setEditData] = useState("");
  const EditApiData = (item) => {
    setCreateEditModalOpen(true);
    setEditData(item);
  };

  const DeleteApiData = (item) => {
    console.log(item);
    fetch(`/api/users/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };
  let sliceValue = loadValue * 10;
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Нэрээр хайх..."
          className="max-w-sm"
          onChange={(event) => HandleInputValue(event.target.value)}
        />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">#</TableHead>
              <TableHead className="w-1">Зураг</TableHead>
              <TableHead className="w-1">Овог</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>И-Мэйл</TableHead>
              <TableHead className="w-1">
                <Settings />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FilterNames?.slice(0, sliceValue).map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableHead>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.imageUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableHead>
                <TableHead>{item.firstname}</TableHead>
                <TableHead>{item.lastname}</TableHead>
                <TableHead>{item.email}</TableHead>
                <TableHead className="w-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(`${item.email}`)
                        }
                      >
                        Copy Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={
                          () => EditApiData(item)
                          // EditApiData(item)
                        }
                      >
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => DeleteApiData(item)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <UserEditDialog
          open={createEditModalOpen}
          onClose={setCreateEditModalOpen}
          data={editData}
        />
      </div>
    </div>
  );
}
