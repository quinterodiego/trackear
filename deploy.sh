#!/bin/bash

# Script de deployment para Vercel
# Este script configura las variables de entorno necesarias

echo "🚀 Deployando Trackear a Vercel..."

echo "📋 Configurando variables de entorno..."

# Configurar variables de entorno en Vercel
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production  
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add GOOGLE_SERVICE_ACCOUNT_JSON production
vercel env add GOOGLE_SHEET_ID production
vercel env add JWT_SECRET production

echo "🏗️ Iniciando deployment..."
vercel --prod

echo "✅ Deployment completado!"
echo "🌐 Tu aplicación estará disponible en la URL que aparece arriba"
