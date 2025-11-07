package com.delivery.service;

import com.delivery.model.Restaurante;
import com.delivery.model.Usuario;
import com.delivery.repository.RestauranteRepository;
import com.delivery.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private RestauranteRepository restauranteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {
        // Inicializar restaurantes
        if (restauranteRepository.count() == 0) {
            restauranteRepository.save(new Restaurante("Pizza Palace", "Pizzas artesanales", "555-0101", "Calle Principal 123"));
            restauranteRepository.save(new Restaurante("Burger King", "Hamburguesas gourmet", "555-0102", "Avenida Central 456"));
            restauranteRepository.save(new Restaurante("Green Salad", "Ensaladas frescas", "555-0103", "Plaza Verde 789"));
            System.out.println("🍕 Restaurantes inicializados en la base de datos");
        }

        // Inicializar usuarios de prueba
        if (usuarioRepository.count() == 0) {
            usuarioRepository.save(new Usuario("admin", "admin123", "Administrador", "admin@delivery.com", "555-0000"));
            usuarioRepository.save(new Usuario("juan", "juan123", "Juan Pérez", "juan@email.com", "555-1111"));
            usuarioRepository.save(new Usuario("maria", "maria123", "María García", "maria@email.com", "555-2222"));
            System.out.println("👤 Usuarios de prueba inicializados en la base de datos");
        }
    }
}