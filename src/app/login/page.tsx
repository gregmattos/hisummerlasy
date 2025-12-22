"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-yellow-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/26322e02-90e0-438b-8afd-848604df69f9.png"
            alt="Hisummer Logo"
            width={80}
            height={80}
            className="mx-auto animate-pulse"
          />
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hisummer</h1>
        <p className="text-gray-600 mb-8">Sua jornada saudável começa aqui.</p>

        {/* Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-orange-600 transition-colors">
            Criar Nova Conta
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">ou</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="w-full border-2 border-orange-500 text-orange-500 font-semibold py-3 px-6 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>

          <button className="w-full border-2 border-orange-500 text-orange-500 font-semibold py-3 px-6 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            Entrar com E-mail
          </button>
        </div>
      </div>
    </div>
  );
}