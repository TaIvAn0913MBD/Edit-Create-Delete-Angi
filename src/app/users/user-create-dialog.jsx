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
import { useState } from "react";

export const UserCreateDialog = ({ open, onClose, data, setData }) => {
  let indexLocal = 0;
  const [nameValue, setNameValue] = useState("Taivan");
  const [lastNameValue, setLastNameValue] = useState("Sigma");
  const [mailValue, setMailValue] = useState("peduart@gmail.com");
  const [imageValue, setImageValue] = useState("");
  const HandleNameInputValue = (value) => {
    setNameValue(value);
  };
  const HandleImageInputValue = (value) => {
    if (
      value.includes("http") ||
      value.includes("png") ||
      value.includes(".com")
    ) {
      setImageValue(value);
    } else {
      setImageValue("http://dummyimage.com/214x146.png/5fa2dd/ffffff");
    }
  };
  const HandleLastNameInputValue = (value) => {
    setLastNameValue(value);
  };
  const HandleMailInputValue = (value) => {
    setMailValue(value);
  };
  const idRandomizer = () => {
    return Math.floor(Math.random() * 100000);
  };
  const SaveLocallData = () => {
    let ObjectValue = {
      id: idRandomizer(),
      email: mailValue,
      lastname: lastNameValue,
      firstname: nameValue,
      imageUrl: imageValue,
    };
    console.log(ObjectValue);
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ObjectValue),
    });
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Pedro"
              onChange={(event) => HandleNameInputValue(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Image</Label>
            <Input
              id="name"
              defaultValue="http://dummyimage.com/214x146.png/5fa2dd/ffffff"
              onChange={(event) => HandleImageInputValue(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Last - Name</Label>
            <Input
              id="username"
              defaultValue="Duarte"
              onChange={(event) => HandleLastNameInputValue(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Mail</Label>
            <Input
              id="username"
              defaultValue="peduart@gmail.com"
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
          <Button type="submit" onClick={() => SaveLocallData()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
