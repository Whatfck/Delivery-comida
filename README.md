# Sistema de Delivery de Comida - MVP

## Descripción
Sistema de delivery de comida implementado como Minimum Viable Product (MVP) en Java, utilizando patrones de diseño como Decorator, Observer y Singleton. El sistema permite gestionar pedidos, personalizar productos, notificar cambios de estado y mantener estadísticas básicas.

## Características Principales
- ✅ Gestión completa de pedidos
- ✅ Personalización de productos con patrón Decorator
- ✅ Sistema de notificaciones con patrón Observer
- ✅ Control de estados del pedido
- ✅ Estadísticas básicas con patrón Singleton
- ✅ Interfaz de consola para demostración

## Stack Tecnológico

### Backend
- **Lenguaje**: Java 11+
- **Framework**: Spring Boot
- **Build Tool**: Maven
- **Patrones**: Decorator, Observer, Singleton

### Frontend
- **MVP**: React con TypeScript y Tailwind CSS

## Requerimientos Funcionales
1. **Gestión de Pedidos**: Crear, agregar items, ver resumen y confirmar pedidos
2. **Personalización de Productos**: Seleccionar base y agregar extras dinámicamente
3. **Sistema de Notificaciones**: Notificar cambios de estado a cliente, restaurante y repartidor
4. **Control de Estados**: Estados: Recibido → Preparando → Listo → En Camino → Entregado
5. **Estadísticas**: Total pedidos, ingresos totales y promedio por pedido

## Instalación y Ejecución

### Prerrequisitos
- Java 11 o superior
- Maven 3.6+
- IDE recomendado: IntelliJ IDEA o VS Code con extensiones Java

### Pasos de Instalación
1. Clonar el repositorio
2. Ejecutar `mvn clean install`
3. Ejecutar `mvn spring-boot:run`

## Uso
El sistema se ejecuta desde la consola con comandos interactivos para:
- Crear pedidos
- Personalizar productos
- Gestionar estados
- Ver estadísticas

## Arquitectura
- **Cliente**: Representa al usuario que hace pedidos
- **Producto**: Base para items del menú con posibilidad de decoración
- **Pedido**: Contenedor de items con estado y cliente asociado
- **Notificador**: Sistema Observer para notificaciones
- **Estadísticas**: Singleton para métricas globales

## Estado del Proyecto
🚧 **En desarrollo** - MVP básico funcional

## Contribución
Proyecto educativo para demostración de patrones de diseño en Java.

## Licencia
Este proyecto es para fines educativos.