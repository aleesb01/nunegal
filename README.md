# ITX Mobile Store SPA

Este repositorio contiene la prueba técnica para el desarrollo de la aplicación SPA "ITX Mobile Store", junto con su servicio backend.

## 📂 Estructura del Proyecto

El repositorio se divide en dos partes principales:
- `frontend/`: Aplicación React construida de cero con Vite. Contiene la interfaz de usuario, lógica de llamadas HTTP, almacenamiento en caché y gestión del estado global.
- `backend/`: Servidor encargado de proporcionar la API con el catálogo de terminales móviles y de manejar las peticiones del cliente.

---

## 🚀 Instrucciones de Ejecución

Ambos proyectos requieren **Node.js** instalado en tu sistema. Se deben ejecutar en dos ventanas de terminal diferentes.

### 1. Ejecutar el Backend (API)
Abre un terminal y sitúate en la raíz del proyecto.
```bash
cd backend
npm install
node server.js
```
*El backend quedará levantado escuchando las llamadas entrantes.*
*(Nota: Pese a existir código Java en la carpeta para un servicio de SimilarProducts, el servidor principal para esta SPA de React se ejecuta mediante `server.js`).*

### 2. Ejecutar el Frontend (SPA React)
En una nueva pestaña de la terminal, sitúate en la carpeta del frontend:
```bash
cd frontend
npm install
npx vite
# o npm run dev
```
La aplicación cliente estará accesible de forma local (habitualmente en `http://localhost:5173`).

---

## 🧠 Notas Técnicas y Decisiones de Arquitectura

Para resolver los requerimientos técnicos de la mejor forma, se han aplicado los siguientes patrones:

1. **Client-Side Caching Inteligente (1 Hora TTL):** 
   Se implementó un cliente fetch personalizado (`apiService.js` y `cache.js`) que guarda las respuestas de la API en el `localStorage` con una caducidad de 1 hora. Esto evita descargas innecesarias al servidor, mitigando la latencia y logrando cargas de página instantáneas en navegaciones posteriores.

2. **Separación de Responsabilidades (Custom Hooks):** 
   Las peticiones a red no se realizan dentro de la vista. Se desarrollaron hooks como `useProducts` y `useProductDetail` encargados de todo el ciclo de vida de los datos (`loading`, `error`, `data`), manteniendo los componentes limpios y haciendo que cumplan el "Single Responsibility Principle". Además implementan patrones seguros de cancelación para evitar actualizaciones de estado sobre componentes ya desmontados (*Memory leaks*).

3. **Performance Visual (useMemo):** 
   La búsqueda en vivo por modelo/marca que se realiza en texto plano se encuentra envuelta en un hook `useMemo`. Esto asegura que el pesado recálculo del filtrado del array de objetos se realice de manera óptima solo cuando el texto o el catálogo realmente cambian.

4. **Prevención de Layout Shifts (UX Premium):** 
   Durante la carga asíncrona de datos desde el backend, el frontend renderiza estructuras *Skeleton*. Este enfoque evita transiciones bruscas de elementos al aparecer (previniendo molestos repintados visuales) dando una experiencia más fluida y natural en aplicaciones móviles.

5. **Estado Global Efectivo (Context API):**
   La pequeña necesidad de compartir estado entre páginas hermanas y el componente superior (como el contador del en el *Header* o los botones en el *Listado* y *Detalle*) permitió depender llanamente del `Context` nativo de React, eludiendo librerías masivas de dependencias externas.
