# Sistema de Delivery de Comida - MVP

## Introducción
Este documento describe los requerimientos para un sistema de delivery de comida implementado como MVP (Minimum Viable Product) en Java, utilizando patrones de diseño específicos. El sistema permitirá gestionar pedidos, personalizar productos, notificar cambios de estado y mantener estadísticas básicas.

## Requerimientos Funcionales

### RF-001: Gestión de Pedidos
**Como** cliente, **quiero** crear un nuevo pedido con mis datos para iniciar el proceso de compra.

**Como** cliente, **quiero** agregar items al pedido para seleccionar lo que deseo ordenar.

**Como** cliente, **quiero** ver un resumen del pedido antes de confirmarlo para verificar los detalles.

**Como** cliente, **quiero** confirmar el pedido para finalizar la orden.

### RF-002: Personalización de Productos (Decorator)
**Como** cliente, **quiero** seleccionar un producto base del menú para comenzar la personalización.

**Como** cliente, **quiero** agregar extras (queso, carne, vegetales, salsa) para personalizar mi producto.

**Como** sistema, **quiero** calcular el precio dinámicamente según las personalizaciones para mostrar el costo actualizado.

### RF-003: Sistema de Notificaciones (Observer)
**Como** cliente, **quiero** recibir notificaciones cuando cambia el estado de mi pedido para estar informado.

**Como** restaurante, **quiero** recibir notificaciones de nuevos pedidos y cambios de estado para gestionar la preparación.

**Como** repartidor, **quiero** recibir notificaciones de pedidos listos para entrega para coordinar la distribución.

### RF-004: Control de Estados
**Como** sistema, **quiero** cambiar el estado del pedido a través de los siguientes estados: Recibido → Preparando → Listo → En Camino → Entregado.

**Como** usuario, **quiero** ver el estado actual del pedido para saber en qué fase se encuentra.

### RF-005: Estadísticas Básicas (Singleton)
**Como** administrador, **quiero** ver el total de pedidos realizados para medir el volumen de negocio.

**Como** administrador, **quiero** ver los ingresos totales para calcular las ganancias.

**Como** administrador, **quiero** ver el promedio por pedido para analizar el ticket promedio.

## Requerimientos No Funcionales
- **Lenguaje**: Java
- **Interfaz**: Consola de comandos (CLI)
- **Patrones de Diseño**: Decorator, Observer, Singleton
- **Persistencia**: No requerida (datos en memoria para MVP)
- **Rendimiento**: Suficiente para manejar pedidos simultáneos básicos
- **Usabilidad**: Interfaz simple e intuitiva para demostración

## Casos de Uso Principales
1. Crear pedido y agregar productos personalizados
2. Confirmar pedido y recibir notificaciones de estado
3. Cambiar estado del pedido y notificar a interesados
4. Consultar estadísticas del sistema

## Arquitectura
- **Cliente**: Representa al usuario que hace pedidos
- **Producto**: Base para items del menú con posibilidad de decoración
- **Pedido**: Contenedor de items con estado y cliente asociado
- **Notificador**: Sistema Observer para notificaciones
- **Estadísticas**: Singleton para métricas globales
