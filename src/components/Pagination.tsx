"use client";

import Link from "next/link";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ pageNumber, totalPages, basePath }: PaginationProps) {
  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      {pageNumber > 1 ? (
        <Link
          href={pageNumber === 2 ? basePath.replace("/page", "") : `${basePath}/${pageNumber - 1}`}
          rel="noindex, follow"
          className="hover:-translate-x-2 transition-transform"
        >
          ← Назад
        </Link>
      ) : (
        <span />
      )}

      <span className="text-center font-semibold">[ {pageNumber} / {totalPages} ]</span>

      {pageNumber < totalPages && (
        <Link
          href={`${basePath}/${pageNumber + 1}`}
          className="hover:translate-x-2 transition-transform"
        >
          Вперед →
        </Link>
      )}
    </div>
  );
}
