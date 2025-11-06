import { SignIn } from "@clerk/nextjs";

export default function age() {
  return (
    <main className="flex items-center justify-center p-20">
      <SignIn />
    </main>
  );
}
