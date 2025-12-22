"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Utensils, Dumbbell, Bell, Download } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-yellow-400">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Olá, Becca! ☀️</h1>
            <p className="text-gray-600">Sequência atual: 5 dias</p>
          </div>
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Droplets className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Água</h3>
                <p className="text-sm opacity-90">Registrar consumo</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-orange-500 text-white hover:bg-orange-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Utensils className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Refeição</h3>
                <p className="text-sm opacity-90">Registrar alimentos</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Dumbbell className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Exercício</h3>
                <p className="text-sm opacity-90">Registrar atividade</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold mb-4">Progresso Diário</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Água</span>
                <span>1200 / 2000 ml</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Calorias</span>
                <span>850 / 1800 kcal</span>
              </div>
              <Progress value={47} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Exercício</span>
                <span>30 / 60 min</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Motivational Card */}
        <Card className="p-6 bg-yellow-100 border-yellow-200">
          <p className="text-center text-gray-800 font-medium">
            "Cada passo conta! Continue assim! 🌟"
          </p>
        </Card>

        {/* Install App Button */}
        <Card className="p-4 bg-white">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
            <Download className="w-5 h-5" />
            Instalar App
          </Button>
        </Card>
      </div>
    </div>
  );
}