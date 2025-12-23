import AuthGuard from "@/components/AuthGuard";
import AppLayout from "@/components/AppLayout";

export default function DashboardPage() {
  return (
    <AuthGuard requireOnboarding>
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bom dia ☀️</h1>
          <p className="text-gray-600">Bora manter o foco hoje.</p>
        </div>

        {/* resto do dashboard continua igual */}
      </AppLayout>
    </AuthGuard>
  );
}
