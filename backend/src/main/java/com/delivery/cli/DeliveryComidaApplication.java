package com.delivery.cli;

import com.delivery.decorator.*;
import com.delivery.model.*;
import com.delivery.observer.*;
import com.delivery.repository.RestauranteRepository;
import com.delivery.repository.UsuarioRepository;
import com.delivery.singleton.Estadisticas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

import java.util.Optional;
import java.util.Scanner;

@SpringBootApplication
@ShellComponent
public class DeliveryComidaApplication implements CommandLineRunner {

    private Scanner scanner = new Scanner(System.in);
    private Estadisticas estadisticas = Estadisticas.getInstancia();
    private Usuario usuarioActual = null;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RestauranteRepository restauranteRepository;

    public static void main(String[] args) {
        SpringApplication.run(DeliveryComidaApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🍕 Sistema de Delivery de Comida - MVP");
        System.out.println("Escribe 'help' para ver los comandos disponibles");
        System.out.println("Primero debes hacer login con el comando 'login'");
    }

    @ShellMethod("Crear un nuevo pedido")
    public void crearPedido() {
        if (usuarioActual == null) {
            System.out.println("❌ Debes hacer login primero. Usa el comando 'login'");
            return;
        }

        System.out.println("\n📝 Creando nuevo pedido...");

        // Usar datos del usuario logueado
        Cliente cliente = new Cliente(usuarioActual.getNombre(), usuarioActual.getTelefono(), "Dirección por defecto");

        // Seleccionar restaurante
        Restaurante restauranteSeleccionado = seleccionarRestaurante();
        if (restauranteSeleccionado == null) {
            System.out.println("❌ No se seleccionó restaurante. Pedido cancelado.");
            return;
        }

        // Crear pedido con restaurante
        Pedido pedido = new Pedido(cliente, restauranteSeleccionado);

        // Agregar observadores
        pedido.agregarObservador(new ClienteObservador(cliente.getNombre()));
        pedido.agregarObservador(new RestauranteObservador());
        pedido.agregarObservador(new RepartidorObservador());

        System.out.println("✅ Pedido creado para " + cliente.getNombre());

        // Agregar productos
        agregarProductosAlPedido(pedido);

        // Confirmar pedido
        String confirmacion = pedido.confirmar();
        System.out.println("\n" + confirmacion);
        System.out.println("🏪 Restaurante: " + restauranteSeleccionado.getNombre());

        // Simular cambios de estado
        simularCambioEstados(pedido);
    }

    private void agregarProductosAlPedido(Pedido pedido) {
        boolean continuar = true;

        while (continuar) {
            System.out.println("\n🍔 Menú de productos:");
            System.out.println("1. Hamburguesa ($8.00)");
            System.out.println("2. Pizza ($12.00)");
            System.out.println("3. Ensalada ($6.00)");
            System.out.println("4. Ver resumen y continuar");
            System.out.print("Selecciona un producto (1-4): ");

            int opcion = Integer.parseInt(scanner.nextLine());

            if (opcion >= 1 && opcion <= 3) {
                Producto productoBase = crearProductoBase(opcion);
                Producto productoPersonalizado = personalizarProducto(productoBase);
                pedido.agregarItem(productoPersonalizado);

                System.out.println("✅ Producto agregado: " + productoPersonalizado.getDescripcion());
            } else if (opcion == 4) {
                continuar = false;
            } else {
                System.out.println("❌ Opción inválida");
            }
        }
    }

    private Producto crearProductoBase(int opcion) {
        switch (opcion) {
            case 1: return new ProductoBase("Hamburguesa", 8.00);
            case 2: return new ProductoBase("Pizza", 12.00);
            case 3: return new ProductoBase("Ensalada", 6.00);
            default: return new ProductoBase("Producto", 0.00);
        }
    }

    private Producto personalizarProducto(Producto producto) {
        System.out.println("\n🍅 Personalización:");
        System.out.println("1. Extra Queso (+$2.50)");
        System.out.println("2. Extra Carne (+$4.00)");
        System.out.println("3. Extra Vegetales (+$1.50)");
        System.out.println("4. Extra Salsa (+$1.00)");
        System.out.println("5. Sin personalización");
        System.out.print("Selecciona personalización (1-5): ");

        int opcion = Integer.parseInt(scanner.nextLine());
        Producto productoPersonalizado = producto;

        switch (opcion) {
            case 1: productoPersonalizado = new ExtraQueso(producto); break;
            case 2: productoPersonalizado = new ExtraCarne(producto); break;
            case 3: productoPersonalizado = new ExtraVegetales(producto); break;
            case 4: productoPersonalizado = new ExtraSalsa(producto); break;
            case 5: break;
            default: System.out.println("❌ Opción inválida, sin personalización");
        }

        return productoPersonalizado;
    }

    private Restaurante seleccionarRestaurante() {
        System.out.println("\n🏪 Selecciona un restaurante:");
        var restaurantes = restauranteRepository.findAll();

        if (restaurantes.isEmpty()) {
            System.out.println("❌ No hay restaurantes disponibles");
            return null;
        }

        for (int i = 0; i < restaurantes.size(); i++) {
            System.out.println((i + 1) + ". " + restaurantes.get(i).getNombre() + " - " + restaurantes.get(i).getDescripcion());
        }

        System.out.print("Selecciona restaurante (1-" + restaurantes.size() + "): ");
        try {
            int opcion = Integer.parseInt(scanner.nextLine());
            if (opcion >= 1 && opcion <= restaurantes.size()) {
                return restaurantes.get(opcion - 1);
            }
        } catch (NumberFormatException e) {
            // Ignorar y continuar
        }

        return null;
    }

    private void simularCambioEstados(Pedido pedido) {
        System.out.println("\n🔄 Simulando cambios de estado...");

        try {
            Thread.sleep(1000);
            pedido.cambiarEstado(Pedido.Estado.PREPARANDO);

            Thread.sleep(1000);
            pedido.cambiarEstado(Pedido.Estado.LISTO);

            Thread.sleep(1000);
            pedido.cambiarEstado(Pedido.Estado.EN_CAMINO);

            Thread.sleep(1000);
            pedido.cambiarEstado(Pedido.Estado.ENTREGADO);

            // Registrar en estadísticas
            estadisticas.registrarPedidoCompletado(pedido);
            System.out.println("\n✅ Pedido completado y registrado en estadísticas!");

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    @ShellMethod("Mostrar estadísticas del sistema")
    public void estadisticas() {
        estadisticas.mostrarEstadisticas();
    }

    @ShellMethod("Iniciar sesión en el sistema")
    public void login() {
        if (usuarioActual != null) {
            System.out.println("❌ Ya hay un usuario logueado: " + usuarioActual.getNombre());
            return;
        }

        System.out.println("\n🔐 Inicio de Sesión");
        System.out.print("Nombre de usuario: ");
        String nombreUsuario = scanner.nextLine();

        System.out.print("Contraseña: ");
        String contrasena = scanner.nextLine();

        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombreUsuario(nombreUsuario);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getContrasena().equals(contrasena)) {
                usuarioActual = usuario;
                System.out.println("✅ ¡Bienvenido " + usuario.getNombre() + "!");
            } else {
                System.out.println("❌ Contraseña incorrecta");
            }
        } else {
            System.out.println("❌ Usuario no encontrado");
        }
    }

    @ShellMethod("Cerrar sesión")
    public void logout() {
        if (usuarioActual != null) {
            System.out.println("👋 ¡Hasta luego " + usuarioActual.getNombre() + "!");
            usuarioActual = null;
        } else {
            System.out.println("❌ No hay usuario logueado");
        }
    }

    @ShellMethod("Ver usuario actual")
    public void usuarioActual() {
        if (usuarioActual != null) {
            System.out.println("👤 Usuario actual: " + usuarioActual.getNombre() + " (" + usuarioActual.getNombreUsuario() + ")");
        } else {
            System.out.println("❌ No hay usuario logueado");
        }
    }

    @ShellMethod("Salir de la aplicación")
    public void salir() {
        System.out.println("👋 ¡Hasta luego!");
        System.exit(0);
    }
}