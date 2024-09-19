import { ClientOnly } from "@/components/client-only";
import FileUploader, { FileUploaderPlaceholder } from "@/components/file-uploader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { GITHUB_URL, GITHUB_USERNAME } from "@/constants";
import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="my-16 w-full max-w-xl">
        <CardHeader>
          <CardTitle>Color by image</CardTitle>
          <CardDescription>
            You can upload a photo from the library or randomize a photo of any
            anime genre.
            <p>
              Made with ❤️ by{" "}
              <a
                target="_blank"
                href={GITHUB_URL}
                className="transition-colors duration-300 hover:text-primary"
                rel="noreferrer"
              >
                {GITHUB_USERNAME}
              </a>
            </p>
          </CardDescription>
          <CardContent className="px-6">
            <div className="w-full space-y-4">
              <div className="relative">
              <ClientOnly fallback={<FileUploaderPlaceholder />}>
                {() => <FileUploader files={files} onChange={setFiles} />}
              </ClientOnly>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}
