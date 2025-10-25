import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BorderBeam } from "../ui/border-beam";
import { Separator } from "../ui/separator";
import CreditCardComponent from "../ui/creditCard";

export default function CheckOutForm() {
  return (
    <Card className="relative w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Contact</CardTitle>
        <CardDescription>
          Enter your credentials to access for easy shipment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4  ">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="placeholder:text-[14px]"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="fullname"
                type="fullname"
                placeholder="fullName"
                className="placeholder:text-[14px]"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="address"
                type="address"
                placeholder="Address"
                className="placeholder:text-[14px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="city"
                  type="city"
                  placeholder="City"
                  className="placeholder:text-[14px]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="zipCode"
                  type="zipCode"
                  placeholder="Zip Code"
                  className="placeholder:text-[14px]"
                />
              </div>
            </div>
          </div>
        </form>
        <Separator className="mt-4" />

        <CreditCardComponent />
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button
          variant="default"
          type="submit"
          className="bg-[#063573] text-white px-6 py-2 rounded-md shadow cursor-pointer"
        >
          Proceed To Payments
        </Button>
      </CardFooter>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}
