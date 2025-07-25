"use client";

import type React from "react";
import { useState } from "react";

import { useAppStore } from "@/store/useAppStore";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { CreditCard, Lock, ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import MaskInput from "@/components/ui/maskInput";

export function OrderForm() {
  const router = useRouter();

  const cartItems = Object.values(useAppStore((state) => state.cart));
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmits = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    router.push("/");
    console.log("pagamento feito carambas ;)");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmits} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">
                    Nome Completo <strong className="text-red-800">*</strong>
                  </Label>
                  <Input id="nome" placeholder="Seu nome completo" required />
                </div>
                <div>
                  <Label htmlFor="email">
                    Email <strong className="text-red-800">*</strong>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">
                    Telefone <strong className="text-red-800">*</strong>
                  </Label>
                  <MaskInput
                    id="telefone"
                    mask="(00) 00000-0000"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">
                    CPF <strong className="text-red-800">*</strong>
                  </Label>
                  <MaskInput
                    id="cpf"
                    placeholder="000.000.000-00"
                    mask="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cep">
                    CEP <strong className="text-red-800">*</strong>
                  </Label>

                  <MaskInput
                    mask={"00000-000"}
                    placeholder="00000-000"
                    required
                    maxLength={9}
                    id="cep"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="endereco">
                    Endereço <strong className="text-red-800">*</strong>
                  </Label>
                  <Input
                    id="endereco"
                    placeholder="Rua, Avenida, etc."
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="numero">
                    Número <strong className="text-red-800">*</strong>
                  </Label>
                  <Input id="numero" placeholder="123" required />
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" placeholder="Apto, Bloco, etc." />
                </div>
                <div>
                  <Label htmlFor="bairro">
                    Bairro <strong className="text-red-800">*</strong>
                  </Label>
                  <Input id="bairro" placeholder="Nome do bairro" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cidade">
                    Cidade <strong className="text-red-800">*</strong>
                  </Label>
                  <Input id="cidade" placeholder="Nome da cidade" required />
                </div>
                <div>
                  <Label htmlFor="estado">
                    Estado <strong className="text-red-800">*</strong>
                  </Label>

                  <Input id="estado" placeholder="Nome do estado" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Dados do Cartão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="numeroCartao">
                  Número do Cartão <strong className="text-red-800">*</strong>
                </Label>

                <MaskInput
                  id="numeroCartao"
                  placeholder="0000 0000 0000 0000"
                  mask="0000 0000 0000 0000"
                  maxLength={19}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nomeCartao">
                  Nome no Cartão <strong className="text-red-800">*</strong>
                </Label>
                <Input
                  id="nomeCartao"
                  placeholder="NOME COMO ESTÁ NO CARTÃO"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validade">
                    Validade <strong className="text-red-800">*</strong>
                  </Label>

                  <MaskInput
                    id="validade"
                    mask="00/00"
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">
                    CVV <strong className="text-red-800">*</strong>
                  </Label>
                  <MaskInput
                    id="cvv"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="parcelas">Parcelas</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      1x de R$ 1.299,99 sem juros
                    </SelectItem>
                    <SelectItem value="2">2x de R$ 649,99 sem juros</SelectItem>
                    <SelectItem value="3">3x de R$ 433,33 sem juros</SelectItem>
                    <SelectItem value="6">6x de R$ 216,66 sem juros</SelectItem>
                    <SelectItem value="12">
                      12x de R$ 119,16 com juros
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full h-12 text-lg cursor-pointer"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 cursor-auto border-white mr-2"></div>
                Processando Pagamento...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Finalizar Compra
              </>
            )}
          </Button>
        </form>
      </div>

      <div>
        <Card className="sticky top-4 sm:w-40 md:w-96 ">
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">
            <div className="flex items-center w-[300px] md:w-[358px] flex-col h-48 overflow-auto overflow-x-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="w-full flex center items-center "
                >
                  {item.product.image ? (
                    <Image
                      src="/placeholder.svg?height=60&width=60&text=Produto"
                      height={0}
                      width={0}
                      alt="Produto"
                      className="w-15 h-15 object-cover rounded"
                    />
                  ) : (
                    <div className="flex justify-center items-center rounded-2xl p-1 object-fit hover:scale-105 transition-transform">
                      <ShoppingBagIcon className="h-16 w-16 text-gray-800" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{item.quantity}</p>
                  </div>
                  <span className="font-medium">R$ {item.product.price}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Frete:</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Desconto:</span>
                <span>-R$ 0,00</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">
                R${" "}
                {cartItems
                  .reduce((sum, item) => {
                    return sum + item.product.price * item.quantity;
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center text-green-700 text-sm">
                <Lock className="w-4 h-4 mr-2" />
                Compra 100% segura e protegida
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>• Entrega em 2-3 dias úteis</p>
              <p>• Garantia de 12 meses</p>
              <p>• Troca grátis em 30 dias</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
