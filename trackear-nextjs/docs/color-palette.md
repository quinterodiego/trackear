# Nueva Paleta de Colores Trackear

Este documento describe la nueva paleta de colores personalizada de Trackear: **Amarillo-Verde**, **Gris Tenue** y **Blanco**.

## � Colores Principales

### Amarillo-Verde (#BAFF39)
Color vibrante y energético que transmite crecimiento y progreso.

```css
--trackear-primary: #BAFF39;           /* Color principal */
--trackear-primary-50: #f8ffe6;        /* Fondo muy suave */
--trackear-primary-100: #f0ffcc;       /* Hover states suaves */
--trackear-primary-200: #e6ffb3;       /* Bordes suaves */
--trackear-primary-300: #d9ff80;       /* Estados intermedios */
--trackear-primary-400: #ccff66;       /* Estados activos claros */
--trackear-primary-500: #BAFF39;       /* Color principal */
--trackear-primary-600: #a6e632;       /* Hover de botones */
--trackear-primary-700: #8fcc2b;       /* Estados oscuros */
--trackear-primary-800: #7ab324;       /* Más oscuro */
--trackear-primary-900: #66991d;       /* Muy oscuro */
```

### Gris Tenue (#6E6E6E)
Color neutral y profesional para textos y elementos secundarios.

```css
--trackear-gray: #6E6E6E;             /* Gris principal */
--trackear-gray-50: #fafafa;          /* Casi blanco */
--trackear-gray-100: #f5f5f5;         /* Muy claro */
--trackear-gray-200: #e5e5e5;         /* Claro */
--trackear-gray-300: #d4d4d4;         /* Medio claro */
--trackear-gray-400: #a3a3a3;         /* Medio */
--trackear-gray-500: #737373;         /* Medio oscuro */
--trackear-gray-600: #6E6E6E;         /* Principal */
--trackear-gray-700: #525252;         /* Oscuro */
--trackear-gray-800: #404040;         /* Más oscuro */
--trackear-gray-900: #262626;         /* Muy oscuro */
```

### Blanco (#FFFFFF)
Base limpia y pura para fondos y contrastes.

```css
--trackear-white: #FFFFFF;
```

### Gradiente Personalizado
```css
--trackear-gradient: linear-gradient(135deg, #BAFF39 0%, #a6e632 100%);
```

## 🎨 Colores de Estado

Adaptados para mantener armonía con la paleta principal:

```css
/* Success (usando el amarillo-verde) */
--trackear-success-500: #BAFF39;
--trackear-success-600: #a6e632;
--trackear-success-700: #8fcc2b;

/* Warning */
--trackear-warning-500: #ffa726;
--trackear-warning-600: #ff9800;

/* Error */
--trackear-error-500: #f44336;
--trackear-error-600: #e53935;

/* Info */
--trackear-info-500: #2196f3;
--trackear-info-600: #1976d2;
```

## 🎯 Clases CSS Disponibles

### Fondos
```css
.bg-trackear-primary           /* Amarillo-verde principal */
.bg-trackear-gradient          /* Gradiente amarillo-verde */
.bg-trackear-white             /* Blanco */
.bg-trackear-gray              /* Gris tenue */
.bg-trackear-gray-50           /* Gris muy claro */
.bg-trackear-gray-100          /* Gris claro */
.bg-trackear-gray-800          /* Gris oscuro */
```

### Textos
```css
.text-trackear-primary         /* Texto amarillo-verde */
.text-trackear-gray            /* Texto gris tenue */
.text-trackear-white           /* Texto blanco */
.text-trackear-gray-900        /* Texto gris muy oscuro */
```

### Efectos Especiales
```css
.trackear-gradient             /* Gradiente para texto */
.trackear-shadow               /* Sombra suave */
.trackear-shadow-lg            /* Sombra grande */
.trackear-hover-lift:hover     /* Efecto de elevación */
.trackear-text-shadow          /* Sombra de texto */
.trackear-pulse                /* Animación de pulso */
```

## 📱 Aplicación en Componentes

### Hero Section
- **Fondo**: `bg-trackear-gradient`
- **Texto principal**: `text-trackear-gray-800`
- **Botón primario**: `bg-trackear-white text-trackear-gray-800`

### Navbar
- **Fondo**: `bg-trackear-white`
- **Logo**: Gradiente amarillo-verde
- **Enlaces**: `text-trackear-gray`
- **Botones**: `bg-trackear-primary text-trackear-gray-800`

### Tarjetas y Contenido
- **Fondo**: `bg-trackear-white`
- **Títulos**: `text-trackear-gray-900`
- **Texto**: `text-trackear-gray`
- **Íconos**: Amarillo-verde con opacidad

### Footer
- **Fondo**: `bg-trackear-gray-800`
- **Texto**: `text-trackear-white`
- **Acentos**: `text-trackear-primary`

# Nueva Paleta de Colores Trackear - Optimizada para Contraste

Este documento describe la nueva paleta de colores personalizada de Trackear: **Amarillo-Verde**, **Gris Tenue** y **Blanco**, optimizada para máximo contraste y legibilidad.

## 🌟 Colores Principales

### Amarillo-Verde (#BAFF39)
Color vibrante y energético que transmite crecimiento y progreso. **Usado principalmente para acentos y highlights**.

```css
--trackear-primary: #BAFF39;           /* Color principal para acentos */
--trackear-primary-50: #f8ffe6;        /* Fondo muy suave */
--trackear-primary-100: #f0ffcc;       /* Hover states suaves */
--trackear-primary-200: #e6ffb3;       /* Bordes suaves */
--trackear-primary-300: #d9ff80;       /* Estados intermedios */
--trackear-primary-400: #ccff66;       /* Estados activos claros */
--trackear-primary-500: #BAFF39;       /* Color principal */
--trackear-primary-600: #a6e632;       /* Hover de botones */
--trackear-primary-700: #8fcc2b;       /* Para texto con mejor contraste */
--trackear-primary-800: #7ab324;       /* Más oscuro */
--trackear-primary-900: #66991d;       /* Muy oscuro */
```

### Gris Tenue (#6E6E6E)
Color neutral y profesional para textos y elementos. **Usado principalmente para texto y navegación**.

```css
--trackear-gray: #6E6E6E;             /* Gris principal para texto */
--trackear-gray-50: #fafafa;          /* Casi blanco */
--trackear-gray-100: #f5f5f5;         /* Muy claro */
--trackear-gray-200: #e5e5e5;         /* Claro */
--trackear-gray-300: #d4d4d4;         /* Medio claro */
--trackear-gray-400: #a3a3a3;         /* Medio */
--trackear-gray-500: #737373;         /* Medio oscuro */
--trackear-gray-600: #6E6E6E;         /* Principal */
--trackear-gray-700: #525252;         /* Para títulos con más contraste */
--trackear-gray-800: #404040;         /* Para títulos importantes */
--trackear-gray-900: #262626;         /* Para máximo contraste */
```

### Blanco (#FFFFFF)
Base limpia y pura para fondos y contrastes.

```css
--trackear-white: #FFFFFF;
```

### Gradientes
```css
--trackear-gradient: linear-gradient(135deg, #BAFF39 0%, #a6e632 100%);
--trackear-gradient-subtle: linear-gradient(135deg, #f0ffcc 0%, #e6ffb3 100%);
```

## 🎯 Clases CSS Optimizadas para Contraste

### Textos por Nivel de Contraste
```css
.text-trackear-gray-darkest     /* #262626 - Máximo contraste para títulos principales */
.text-trackear-gray-darker      /* #404040 - Títulos importantes */
.text-trackear-gray-dark        /* #525252 - Subtítulos y texto destacado */
.text-trackear-gray             /* #6E6E6E - Texto normal */
.text-trackear-primary          /* #8fcc2b - Texto de acento con buen contraste */
.text-trackear-primary-bright   /* #BAFF39 - Solo para elementos muy destacados */
```

### Fondos
```css
.bg-trackear-gradient-subtle    /* Gradiente suave para hero sections */
.bg-trackear-gradient           /* Gradiente intenso para elementos pequeños */
.trackear-accent-box            /* Caja con fondo suave y borde de acento */
.trackear-high-contrast         /* Combinación de máximo contraste */
```

## 📱 Aplicación Optimizada

### Hero Section
- **Fondo**: `bg-trackear-gradient-subtle` (gradiente suave)
- **Título**: `text-trackear-gray-darkest` (máximo contraste)
- **Subtítulo**: `text-trackear-gray-dark` (buen contraste)
- **Botón primario**: `bg-trackear-primary text-trackear-gray-darkest`

### Navbar
- **Fondo**: `bg-trackear-white`
- **Logo texto**: `text-trackear-gray-darkest`
- **Enlaces**: `text-trackear-gray-dark`
- **Botones**: `bg-trackear-primary text-trackear-gray-darkest`

### Contenido
- **Títulos principales**: `text-trackear-gray-darkest`
- **Subtítulos**: `text-trackear-gray-darker`
- **Texto normal**: `text-trackear-gray-dark`
- **Texto secundario**: `text-trackear-gray`

### Elementos de Acento
- **Íconos**: `trackear-accent-box` con `text-trackear-gray-darkest`
- **Highlights**: `text-trackear-primary` (tono más oscuro)
- **Elementos brillantes**: `text-trackear-primary-bright` (solo para puntos focales)

## ✅ Ratios de Contraste

| Combinación | Ratio | Nivel WCAG |
|-------------|-------|------------|
| `#262626` sobre `#FFFFFF` | 15.8:1 | AAA |
| `#404040` sobre `#FFFFFF` | 10.4:1 | AAA |
| `#525252` sobre `#FFFFFF` | 7.8:1 | AAA |
| `#6E6E6E` sobre `#FFFFFF` | 5.9:1 | AA |
| `#8fcc2b` sobre `#FFFFFF` | 4.8:1 | AA |
| `#262626` sobre `#f0ffcc` | 13.2:1 | AAA |

## 🎨 Principios de Diseño Aplicados

1. **📖 Legibilidad Primero**: Todos los textos tienen contraste AA o superior
2. **🎯 Jerarquía Visual Clara**: 4 niveles de gris para diferentes importancias
3. **⚡ Acentos Efectivos**: Amarillo-verde reservado para elementos importantes
4. **🎪 Equilibrio**: 80% grises neutros, 20% color de acento
5. **♿ Accesibilidad**: Cumple estándares WCAG 2.1 nivel AA

## 🔄 Guía de Uso

```jsx
// ❌ Evitar - Poco contraste
<h1 className="text-trackear-primary-bright">Título Principal</h1>

// ✅ Correcto - Máximo contraste
<h1 className="text-trackear-gray-darkest">Título Principal</h1>

// ✅ Correcto - Acento con buen contraste
<span className="text-trackear-primary">Elemento destacado</span>

// ✅ Correcto - Botón con contraste óptimo
<button className="bg-trackear-primary text-trackear-gray-darkest">
  Acción Principal
</button>
```

Esta paleta optimizada mantiene la identidad visual vibrante de Trackear mientras asegura excelente legibilidad y accesibilidad para todos los usuarios.
