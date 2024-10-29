"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loadValue, setLoadValue] = useState(1);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [fetch("/api/users")]);
  const LoadMore = () => {
    setLoadValue(loadValue + 1);
    console.log(loadValue);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Хэрэглэгчид</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable data={data} loadValue={loadValue} />
          <div className="flex justify-center p-8">
            <Button variant="outline" onClick={() => LoadMore()}>
              Load more...
            </Button>
          </div>
        </CardContent>
      </Card>

      <UserCreateDialog
        open={createModalOpen}
        onClose={setCreateModalOpen}
        data={data}
        setData={setData}
      />
    </div>
  );
};

export default Users;
