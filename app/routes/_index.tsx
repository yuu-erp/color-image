import type { MetaFunction } from "@remix-run/node";
import { toast } from "sonner";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const onClickToast = () => toast.success('Event has been created');
  return (
    <div
      className="flex h-screen items-center justify-center"
      onClick={onClickToast}
    >
      Index
    </div>
  );
}
