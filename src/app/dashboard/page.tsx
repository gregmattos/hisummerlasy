import AppLayout from "@/components/AppLayout";

export default function DashboardPage() {
  const aguaAtual = 1200;
  const aguaMeta = 2500;

  const progressoAgua = Math.min(
    Math.round((aguaAtual / aguaMeta) * 100),
    100
  );

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Bom dia ☀️</h1>
        <p className="text-gray-600">
          Bora manter o foco hoje.
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Água */}
        <div className="bg-blue-500 text-white rounded-2xl p-5">
          <h2 className="font-semibold mb-2">💧 Água</h2>
          <p className="text-sm mb-2">
            {aguaAtual}ml de {aguaMeta}ml
          </p>

          <div className="w-full bg-blue-400 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full"
              style={{ width: `${progressoAgua}%` }}
            />
          </div>

          <p className="text-xs mt-2">
            {progressoAgua}% da meta
          </p>
        </div>

        {/* Calorias */}
        <div className="bg-orange-500 text-white rounded-2xl p-5">
          <h2 className="font-semibold mb-2">🔥 Calorias</h2>
          <p className="text-3xl font-bold">1.340</p>
          <p className="text-sm opacity-90">
            kcal consumidas
          </p>
        </div>

        {/* Exercícios */}
        <div className="bg-green-500 text-white rounded-2xl p-5">
          <h2 className="font-semibold mb-2">🏃 Exercícios</h2>
          <p className="text-3xl font-bold">45</p>
          <p className="text-sm opacity-90">
            minutos hoje
          </p>
        </div>
      </div>

      {/* Streak */}
      <div className="bg-white rounded-2xl p-5 border">
        <h2 className="font-semibold mb-1">🔥 Sequência</h2>
        <p className="text-gray-600 mb-3">
          Você está mandando bem!
        </p>

        <div className="flex gap-2">
          {["S", "T", "Q", "Q", "S", "S", "D"].map((dia, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium
                ${index < 4 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}
              `}
            >
              {dia}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
