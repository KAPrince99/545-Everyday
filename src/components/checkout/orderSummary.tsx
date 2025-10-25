import { UniqueCartItemProps } from "@/app/actions/cartActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";

export default function OrderSummary({
  cart,
}: {
  cart: UniqueCartItemProps[] | undefined;
}) {
  function centsToDisplay(cents: number) {
    return (cents / 100).toFixed(2) + " €";
  }
  return (
    <Card className="relative w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Order Summary</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {cart?.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.front_image ?? "/images/placeholder.png"}
                alt={item.name}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">
                  Qty: {item.count} • {item.size}
                </div>
              </div>
              <div className="font-medium">
                {centsToDisplay(Number(item.price) * item.count)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
        <Button className="w-full">Sign In</Button>
      </CardFooter>
      <BorderBeam duration={8} size={100} />
    </Card>
    //  <div className="space-y-6">
    //    <h3 className="text-xl font-semibold">Total Order</h3>

    //    <div className="space-y-4">
    //      {cart?.map((item) => (
    //        <div key={item.id} className="flex items-center gap-3">
    //          <img
    //            src={item.front_image ?? "/images/placeholder.png"}
    //            alt={item.name}
    //            className="w-14 h-14 object-cover rounded"
    //          />
    //          <div className="flex-1">
    //            <div className="text-sm font-medium">{item.name}</div>
    //            <div className="text-xs text-gray-500">
    //              Qty: {item.count} • {item.size}
    //            </div>
    //          </div>
    //          <div className="font-medium">
    //            {centsToDisplay(Number(item.price) * item.count)}
    //          </div>
    //        </div>
    //      ))}
    //    </div>

    //    <div className="border-t pt-4 text-sm space-y-2">
    //      <div className="flex justify-between">
    //        <span>Subtotal</span>
    //        {/* <span>{centsToDisplay(subtotal)}</span> */}
    //      </div>
    //      <div className="flex justify-between">
    //        <span>Shipping</span>
    //        {/* <span>{centsToDisplay(shipping)}</span> */}
    //      </div>
    //      <div className="flex justify-between">
    //        <span>Taxes</span>
    //        {/* <span>{centsToDisplay(tax)}</span> */}
    //      </div>

    //      <div className="flex justify-between text-lg font-semibold pt-3">
    //        <span>Totale</span>
    //        {/* <span>{centsToDisplay(total)}</span> */}
    //      </div>
    //    </div>
    //  </div>
  );
}
