import AutoAnimateContainer from "@/components/auto-animate-container";
import BigUploadArrow from "@/components/big-upload-arrow";
import { ClientOnly } from "@/components/client-only";
import FileUploader, {
  FileUploaderPlaceholder,
} from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GITHUB_URL, GITHUB_USERNAME } from "@/constants";
import { shouldUploadFilesTemporarilyAtom, uploadedFilesAtom } from "@/store";
import { humanFileSize } from "@/utils";
import type { MetaFunction } from "@remix-run/node";
import { useAtom } from "jotai";
import React from "react";
import { useState } from "react";
import { UploadCloudIcon, XIcon } from "lucide-react";
import UploadButtonArrow from "@/components/upload-button-arrow";
import { useImmerAtom } from "jotai-immer";
import UploadedFileEntry from "@/components/uploaded-file-entry";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(1);
  const [remainingTime, setRemainingTime] = useState("");
  const [uploadedFiles, setUploadedFiles] = useImmerAtom(uploadedFilesAtom);
  const [shouldUploadFilesTemporarily, setShouldUploadFilesTemporarily] =
    useAtom(shouldUploadFilesTemporarilyAtom);
  console.log("files: ", files);

  console.log("isUploading: ", isUploading)

  console.log("uploadedFiles: ", uploadedFiles)

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="my-16 w-full max-w-xl">
        <CardHeader>
          <CardTitle>Upload file</CardTitle>
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
                <AutoAnimateContainer className="absolute -left-48 top-1/2 -translate-y-1/2">
                  {!files.length ? <BigUploadArrow /> : null}
                </AutoAnimateContainer>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <Label
                  htmlFor="should-upload-files-temporarily"
                  className="font-semibold"
                >
                  Upload temporarily (delete after 72 hours)
                </Label>

                <Switch
                  id="should-upload-files-temporarily"
                  checked={shouldUploadFilesTemporarily}
                  onCheckedChange={setShouldUploadFilesTemporarily}
                />
              </div>
              {files.length > 0 ? (
                <React.Fragment>
                  <div className="relative mt-4 flex justify-end gap-4">
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <p className="text-sm tabular-nums">
                          {humanFileSize(loaded)} / {humanFileSize(total)}
                        </p>

                        <div className="size-1 rounded-md bg-primary" />

                        <p className="text-sm tabular-nums">{remainingTime}</p>
                      </div>
                    ) : null}

                    <Button>
                      {isUploading ? (
                        <XIcon size={16} />
                      ) : (
                        <UploadCloudIcon size={16} />
                      )}

                      <p className="ml-2">
                        {isUploading ? "Cancel" : "Upload"}
                      </p>
                    </Button>

                    <AutoAnimateContainer className="absolute -right-40 -top-2">
                      <UploadButtonArrow />
                    </AutoAnimateContainer>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
            <AutoAnimateContainer>
            {(uploadedFiles?.length || 0) > 0 ? (
              <div className="mt-8">
                <p className="mb-2 text-lg font-semibold">
                  Uploaded ({uploadedFiles.length})
                </p>

                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <UploadedFileEntry
                      key={file.hash}
                      file={file}
                      onRemove={() => {
                        setUploadedFiles((draft) => {
                          draft.splice(index, 1);
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </AutoAnimateContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}
