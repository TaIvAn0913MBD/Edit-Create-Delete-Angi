import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export const UserEditDialog = ({ open, onClose, data }) => {
  let indexLocal = 0;
  const [nameValue, setNameValue] = useState(data.firstname);
  const [lastNameValue, setLastNameValue] = useState("Sigma");
  const [mailValue, setMailValue] = useState("peduart@gmail.com");

  const HandleNameInputValue = (value) => {
    setNameValue(value);
  };
  const HandleLastNameInputValue = (value) => {
    setLastNameValue(value);
  };
  const HandleMailInputValue = (value) => {
    setMailValue(value);
  };
  const SaveLocallData = (user) => {
    const NewValue = {
      id: 12,
      email: mailValue,
      lastname: lastNameValue,
      firstname: nameValue,
      imageUrl: "http://dummyimage.com/214x146.png/5fa2dd/ffffff",
    };
    fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewValue),
    });
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit user "{data.firstname} {data.lastname}""
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={data.firstname}
              onChange={(event) => HandleNameInputValue(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Last - Name</Label>
            <Input
              id="username"
              defaultValue={data.lastname}
              onChange={(event) => HandleLastNameInputValue(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Mail</Label>
            <Input
              id="username"
              defaultValue={data.email}
              onChange={(event) => HandleMailInputValue(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={() => SaveLocallData(data)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
