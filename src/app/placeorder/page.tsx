"use client";

import type React from "react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/shared";

import { OrderForm } from "@/components/layout";

export default function PagamentoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para a loja
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
