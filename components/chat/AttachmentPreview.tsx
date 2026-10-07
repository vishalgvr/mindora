"use client";

import React from "react";
import { FileText, Image as ImageIcon, X, FileSpreadsheet, FileCode } from "lucide-react";
import { formatBytes } from "@/lib/utils/cn";

export interface AttachmentItem {
  fileName: string;
  fileType: string;
  fileSize: number;
  storageUrl?: string;
}

interface AttachmentPreviewProps {
  attachments: AttachmentItem[];
  onRemove?: (index: number) => void;
  isReadOnly?: boolean;
}

export function AttachmentPreview({
  attachments,
  onRemove,
  isReadOnly = false,
}: AttachmentPreviewProps) {
  if (!attachments || attachments.length === 0) return null;

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) return <ImageIcon className="w-4 h-4 text-purple-500" />;
    if (fileType.includes("csv") || fileType.includes("sheet") || fileType.includes("excel"))
      return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
    if (fileType.includes("json") || fileType.includes("code"))
      return <FileCode className="w-4 h-4 text-amber-500" />;
    return <FileText className="w-4 h-4 text-indigo-500" />;
  };

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {attachments.map((att, idx) => {
        const isImage = att.fileType.startsWith("image/") && att.storageUrl;

        return (
          <div
            key={idx}
            className="group relative flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-2 pr-3 text-xs shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={att.storageUrl}
                alt={att.fileName}
                className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {getFileIcon(att.fileType)}
              </div>
            )}

            <div className="flex flex-col min-w-0 max-w-[160px]">
              <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                {att.fileName}
              </span>
              <span className="text-[10px] text-slate-400">
                {formatBytes(att.fileSize)}
              </span>
            </div>

            {!isReadOnly && onRemove && (
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="ml-1 rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-500 transition-colors"
                title="Remove attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
