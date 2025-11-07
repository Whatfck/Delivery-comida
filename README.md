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

## Cómo Usar

### Inicio de Sesión
Primero debes iniciar sesión en el sistema:

```bash
# Comando para login
login

# Credenciales de prueba disponibles:
# Usuario: admin, Contraseña: admin123
# Usuario: juan, Contraseña: juan123
# Usuario: maria, Contraseña: maria123
```

### Comandos Disponibles

#### Gestión de Sesión
- `login` - Iniciar sesión en el sistema
- `logout` - Cerrar sesión actual
- `usuario-actual` - Ver usuario actualmente logueado

#### Gestión de Pedidos
- `crear-pedido` - Crear un nuevo pedido (requiere login)
  - Seleccionar restaurante de la lista
  - Elegir productos del menú
  - Personalizar con extras (queso, carne, vegetales, salsa)
  - Confirmar pedido

#### Estadísticas
- `estadisticas` - Ver estadísticas del sistema
  - Total de pedidos completados
  - Ingresos totales
  - Promedio por pedido

#### Sistema
- `help` - Ver lista de comandos disponibles
- `salir` - Salir de la aplicación

### Flujo de Uso Típico

```bash
# 1. Iniciar la aplicación
mvn spring-boot:run

# 2. Hacer login (requerido)
login
# Usuario: admin
# Contraseña: admin123

# 3. Crear un pedido
crear-pedido
# - Seleccionar restaurante (1-3)
# - Elegir productos (1-3) o ver resumen (4)
# - Personalizar productos (1-5)
# - El sistema simulará automáticamente los cambios de estado

# 4. Ver estadísticas
estadisticas

# 5. Cerrar sesión
logout

# 6. Salir
salir
```

### Datos de Prueba
- **Restaurantes**: Pizza Palace, Burger King, Green Salad
- **Productos**: Hamburguesa ($8.00), Pizza ($12.00), Ensalada ($6.00)
- **Extras**: Queso (+$2.50), Carne (+$4.00), Vegetales (+$1.50), Salsa (+$1.00)

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