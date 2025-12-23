import AuthGuard from "@/components/AuthGuard";
import QuizForm from "@/components/QuizForm";

export default function QuizPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center bg-[#FFF6EC] px-4">
        <QuizForm />
      </div>
    </AuthGuard>
  );
}
